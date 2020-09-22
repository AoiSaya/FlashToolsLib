libAirioRP  
AirioRP用のライブラリを作りました。  
  
※使用前にFlashAir本体のアップデートが必要です！  
  
ボードに搭載されているCP2120のレジスタ操作・I2C通信・IOポート操作の支援のほか、  
液晶画面の操作も含めた、プロトタイピングに便利なライブラリです。  
FlashAirの少ないメモリを考慮し、必要な機能だけ読み込むことが出来ます。  
  
機能  
・レジスタ操作  
・I2C通信  
・ArduinoライクなIOポート操作  
・I2C液晶操作  
・I2C EEPROMの書き込み・読み込み  
  
  
  
関連項目  
秋月FlashAir DIP IOボード用ライブラリ　libAE_FAIO  
FlashAir上でのデバッグに便利 FlashTools Lua Editor  
FlashAir生のピンをArduino風に扱うライブラリ:pioduino  
FlashAirのRTCを使うライブラリ:libFlashTime  
fa.pioのinit値の計算ライブラリ:init値の計算  
  
メモ  
電子工作記録: fa.spiの挙動(秋月 FlashAir DIP IOボードキットでfa.spiが動かない問題)   
http://gpsnmeajp.blogspot.com/2015/12/faspi.html  
  
  
サンプル  
require("/libAirioRP-core");  
require("/libAirioRP-gpio");  
require("/libAirioRP-i2c");  
--require("/libAirioRP-i2cRead");  
require("/libAirioRP-lcd");  
--require("/libAirioRP-eeprom");  
  
libAirioRP_Setup(100);  
lcdInit();  
lcdCont(0x1F,1);  
lcdPrint("Hello World");  
  
pinMode(0,OUTPUT);  
  
for i=1,3 do  
    digitalWrite(0,HIGH);  
    delay(500);  
    digitalWrite(0,LOW);  
    delay(500);  
end  
  
  
リファレンス  
・ライブラリは以下のファイルに分かれています。  
全部読み込むとFlashAirのメモリがきつくなるので、必要なモノを読み込んでください。  
require("/libAirioRP-core");  
require("/libAirioRP-gpio");  
require("/libAirioRP-i2c");  
require("/libAirioRP-i2cRead");  
require("/libAirioRP-lcd");  
require("/libAirioRP-eeprom");  
  
依存関係  
core  
├ gpio  
└ i2c  
   ├ lcd  
　 └ i2cRead  
        └eeprom  
  
  
※※※libAE_FAIOとの違い※※※  
なんかページの構成から何からlibAE_FAIOと同じじゃない？と  
思われた方もいると思いますが、丸コピです。  
というのも、搭載しているチップの仕様がほぼおなじため、変更点が少ないためです。  
そのため、最低限のこと以外はテストしていません。  
  
変更点  
・ libArioRP_Setup(speed)  
mode=2になっています。  
  
・ regWrite(adr,data)  
CP2120用にダミー1バイトが増えています。  
これがないと、読み取りに失敗します。  
ちなみに、spiEndのバグ対策処理がないと、波及的に以後全ておかしくなります。  
  
・ pinMode(pin,mode)  
入力に設定したピンをHighにする処理が増えています。  
これがないと、入力に設定したはずのピンが30mAほど吸い込むので危険です。  
ちなみに電源投入時デフォでこの吸い込み状態です。(データシートに記載)  
ただ、一度入力に切り替えた後出力に切り替えた時もHighのままですのでご注意ください。  
オープンドレインな操作をしたい場合は、INPUTなままdigitalWriteをすると多分できます。  
  
・ pinMode(pin,mode)  
・ digitalRead(pin)  
・ digitalWrite(pin,stat)  
8bitのIOポートに対応しています。  
  
よって  
libAirioRP-core  
libAirioRP-gpio  
以外の  
libAirioRP-i2c  
libAirioRP-i2cRead  
libAirioRP-lcd  
libAirioRP-eeprom  
はAE_FAIOと完全に互換です。(多分)中身全く一緒です。入れ替えても使えます。  
  
--- CORE ---  
  
・ libArioRP_Setup(speed)  
ライブラリの初期化を行う。  
speedはfa.spiの速度。省略時は20kHz(=1314)で通信(劣悪な環境でも大丈夫なように)。  
AirioRPの場合、1で動きますので、試してみてください。  
速度的には100くらいで問題ないと思います。  
  
・ spiComm(dat)  
SPIで通信する。fa.spiのラッパ関数  
(ソフトウェア版との互換のため)  
  
・ spiStart()  
CSをLowにし、通信を開始する。  
  
・ spiEnd()  
CSをHighにし、通信を終了する。  
(fa.spiのバグ対策のための処理入り)  
  
・ regWrite(adr,data)  
レジスタに書き込む。  
CP2120用にダミーバイトが増えています。  
  
・ regRead(adr)  
レジスタから読み込む。  
  
  
--- GPIO ---  
  
・ digitalRead(pin)  
指定したピンの入力状態を読み取る。  
HIGH=1/LOW=0(どちらでも指定可能)  
  
・ digitalWrite(pin,stat)  
指定したピンの出力状態を設定する。  
HIGH=1/LOW=0(どちらでも指定可能)  
  
・ pinMode(pin,mode)  
指定したピンの入出力ステートを設定する。  
INPUT=1/OUTPUT=0  
このとき、INPUTに指定したピンは強制的にHighになります。(Lowだと電流を吸い込むため)  
  
・ delay(t)  
指定した時間待つ。  
(Sleepのラッパ関数。ついでに忘れがちなメモリ解放も行う。)  
  
・ setTris(TRIS)  
pio形式(1bit)の入出力設定を、2bit形式に変換する。  
0→01  
1→10  
  
  
--- I2C ---  
すべてアドレスは8bit(末端1bitはR/W)です。  
  
・I2Cの速度を設定する。5=369kHz,255=7.2kHz  
function i2cSpeed(speed)  
  
・i2cWriteStart(adr,len)  
I2C通信を開始する。(データ本体は送らない)  
その後、spiCommでlen分のデータを送信することができる。  
通信終了時にはspiEnd()が必要。  
(省メモリで長いデータを送りたい場合)  
  
・ i2cWrite(adr,...)  
I2Cでデータを送信する。引数は可変長。  
(固定のデータを一気に送りたい場合)  
  
・ i2cBusyWait()  
I2Cバスがビジーなら開放されるまで待つ。  
(i2cStartおよびi2cSend、i2cReadおよびi2cWriteReadの前に自動で呼び出される関数)  
  
  
--- I2C Read ---  
  
・ i2cRead(adr,len)  
I2Cでデータを受信する。結果は配列で帰る。  
  
・ i2cWriteRead(adr,ReadLen,...)  
I2Cでデータを送信後、受信する。  
EEPROMの読み出しなど。  
  
・ i2cReadBuf(len)  
読み込みデータバッファを読む。  
(i2cReadおよびi2cWriteReadから呼び出される関数)  
  
  
--- EEPROM ---  
  
・eepromRead(i2cadr,adr,len)  
I2C EEPROMからlenバイト分読み込む。  
1024kbitまで対応。i2cadrは、末端1bitが立ったアドレス(Read指定)を指定すること。  
lenが1バイトor省略の場合は、戻り値は整数。  
2バイト以上の場合は、戻り値は配列。  
  
・eepromWrite(i2cadr,adr,dat))  
I2C EERPOMに1バイト書き込む。  
  
  
--- LCD ---  
・lcdInit(i2cadr)  
I2C液晶を初期化する。  
i2cadrはアドレス。省略すると0x7C(秋月I2C液晶)  
  
・lcdCont(cont,boost)  
コントラストを設定する。  
cont:コントラスト(0x00～0x3F)  
boost:倍電圧回路の有効無効  
  
・lcdPrint(s)  
指定した文字列を(高速に)送信する。  
  
・lcdPrintLine(s)  
指定した文字列を(低速に)送信する。  
その際、改行処理を自動で行う。  
  
・lcdClear()  
画面を消去する。  
  
・lcdPos(x,y)  
指定した位置にカーソルを移動する。  
  
・lcdMax(x,y)  
最大文字数を設定する。lcdPrintLineで使われる。  
初期値ではx=16,y=2。  
  
・lcdData(data)  
データを1バイト送信する。  
  
・lcdCommand(data)  
コマンドを1バイト送信する。  
  
利用は自己責任で。  
  
v0.1 公開  
v0.2 バージョンチェック追加。古いファームウェアでは(もともと)動きません