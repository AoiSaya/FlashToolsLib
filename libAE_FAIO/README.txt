libAE_FAIO
�H���@FlashAir DIP IO�{�[�h�̃��C�u���������܂����B

���g�p�O��FlashAir�{�̂̃A�b�v�f�[�g���K�v�ł��I
�i�ŋߍw�����ꂽ���̂ł���O�Ȃ��A�b�v�f�[�g�̊m�F�����Ă�������)

�{�[�h�ɓ��ڂ���Ă���SC18IS600IBS�̃��W�X�^����EI2C�ʐM�EIO�|�[�g����̎x���̂ق��A
�t����ʂ̑�����܂߂��A�v���g�^�C�s���O�ɕ֗��ȃ��C�u�����ł��B
FlashAir�̏��Ȃ����������l�����A�K�v�ȋ@�\�����ǂݍ��ނ��Ƃ��o���܂��B

�@�\
�E���W�X�^����
�EI2C�ʐM
�EArduino���C�N��IO�|�[�g����
�EI2C�t������
�EI2C EEPROM�̏������݁E�ǂݍ���




�֘A����
AirioRP�p���C�u�����@libAirioRP
FlashAir��ł̃f�o�b�O�ɕ֗� FlashTools Lua Editor
FlashAir���̃s����Arduino���Ɉ������C�u����:pioduino
FlashAir��RTC���g�����C�u����:libFlashTime
fa.pio��init�l�̌v�Z���C�u����:init�l�̌v�Z

����
�d�q�H��L�^: fa.spi�̋���(�H�� FlashAir DIP IO�{�[�h�L�b�g��fa.spi�������Ȃ����) 
http://gpsnmeajp.blogspot.com/2015/12/faspi.html


�T���v��


require("libAE_FAIO-core");
require("libAE_FAIO-gpio");
require("libAE_FAIO-i2c");
--require("libAE_FAIO-i2cRead");
require("libAE_FAIO-lcd");
--require("libAE_FAIO-eeprom");

libAE_FAIO_Setup(100);
lcdInit();
lcdPrintLine("Hello World\n");

pinMode(0,OUTPUT);

for i=1,3 do
    digitalWrite(0,HIGH);
	lcdPos(0,1)
	lcdPrintLine("SW:"..digitalRead(3));
	delay(500);
    digitalWrite(0,LOW);
	lcdPos(0,1)
	lcdPrintLine("SW:"..digitalRead(3));
	delay(500);
end



���t�@�����X
�E���C�u�����͈ȉ��̃t�@�C���ɕ�����Ă��܂��B
�S���ǂݍ��ނ�FlashAir�̃������������Ȃ�̂ŁA�K�v�ȃ��m��ǂݍ���ł��������B
require("/libAE_FAIO-core");
require("/libAE_FAIO-gpio");
require("/libAE_FAIO-i2c");
require("/libAE_FAIO-i2cRead");
require("/libAE_FAIO-lcd");
require("/libAE_FAIO-eeprom");

�ˑ��֌W
core
�� gpio
�� i2c
   �� lcd
�@ �� i2cRead
        ��eeprom


--- CORE ---

�E libAE_FAIO_Setup(speed)
���C�u�����̏��������s���B
speed��fa.spi�̑��x�B�ȗ�����20kHz(=1314)�ŒʐM(�򈫂Ȋ��ł����v�Ȃ悤��)�B
�H��FlashAir DIP IO�{�[�h�L�b�g�̏ꍇ�A1�œ����܂��̂ŁA�����Ă݂Ă��������B
���x�I�ɂ�100���炢�Ŗ��Ȃ��Ǝv���܂��B

�E spiComm(dat)
SPI�ŒʐM����Bfa.spi�̃��b�p�֐�
(�\�t�g�E�F�A�łƂ̌݊��̂���)

�E spiStart()
CS��Low�ɂ��A�ʐM���J�n����B

�E spiEnd()
CS��High�ɂ��A�ʐM���I������B
(fa.spi�̃o�O�΍�̂��߂̏�������)

�E regWrite(adr,data)
���W�X�^�ɏ������ށB

�E regRead(adr)
���W�X�^����ǂݍ��ށB


--- GPIO ---

�E digitalRead(pin)
�w�肵���s���̓��͏�Ԃ�ǂݎ��B
HIGH=1/LOW=0(�ǂ���ł��w��\)

�E digitalWrite(pin,stat)
�w�肵���s���̏o�͏�Ԃ�ݒ肷��B
HIGH=1/LOW=0(�ǂ���ł��w��\)

�E pinMode(pin,mode)
�w�肵���s���̓��o�̓X�e�[�g��ݒ肷��B
INPUT=1/OUTPUT=0

�E delay(t)
�w�肵�����ԑ҂B
(Sleep�̃��b�p�֐��B���łɖY�ꂪ���ȃ�����������s���B)

�E setTris(TRIS)
pio�`��(1bit)�̓��o�͐ݒ���A2bit�`���ɕϊ�����B
0��01
1��10


--- I2C ---
���ׂăA�h���X��8bit(���[1bit��R/W)�ł��B

�EI2C�̑��x��ݒ肷��B5=369kHz,255=7.2kHz
function i2cSpeed(speed)

�Ei2cWriteStart(adr,len)
I2C�ʐM���J�n����B(�f�[�^�{�̂͑���Ȃ�)
���̌�AspiComm��len���̃f�[�^�𑗐M���邱�Ƃ��ł���B
�ʐM�I�����ɂ�spiEnd()���K�v�B
(�ȃ������Œ����f�[�^�𑗂肽���ꍇ)

�E i2cWrite(adr,...)
I2C�Ńf�[�^�𑗐M����B�����͉ϒ��B
(�Œ�̃f�[�^����C�ɑ��肽���ꍇ)

�E i2cBusyWait()
I2C�o�X���r�W�[�Ȃ�J�������܂ő҂B
(i2cStart�����i2cSend�Ai2cRead�����i2cWriteRead�̑O�Ɏ����ŌĂяo�����֐�)


--- I2C Read ---

�E i2cRead(adr,len)
I2C�Ńf�[�^����M����B���ʂ͔z��ŋA��B

�E i2cWriteRead(adr,ReadLen,...)
I2C�Ńf�[�^�𑗐M��A��M����B
EEPROM�̓ǂݏo���ȂǁB

�E i2cReadBuf(len)
�ǂݍ��݃f�[�^�o�b�t�@��ǂށB
(i2cRead�����i2cWriteRead����Ăяo�����֐�)


--- EEPROM ---

�EeepromRead(i2cadr,adr,len)
I2C EEPROM����len�o�C�g���ǂݍ��ށB
1024kbit�܂őΉ��Bi2cadr�́A���[1bit���������A�h���X(Read�w��)���w�肷�邱�ƁB
len��1�o�C�gor�ȗ��̏ꍇ�́A�߂�l�͐����B
2�o�C�g�ȏ�̏ꍇ�́A�߂�l�͔z��B

�EeepromWrite(i2cadr,adr,dat))
I2C EERPOM��1�o�C�g�������ށB


--- LCD ---
�ElcdInit(i2cadr)
I2C�t��������������B
i2cadr�̓A�h���X�B�ȗ������0x7C(�H��I2C�t��)

�ElcdCont(cont,boost)
�R���g���X�g��ݒ肷��B
cont:�R���g���X�g(0x00�`0x3F)
boost:�{�d����H�̗L������

�ElcdPrint(s)
�w�肵���������(������)���M����B

�ElcdPrintLine(s)
�w�肵���������(�ᑬ��)���M����B
���̍ہA���s�����������ōs���B

�ElcdClear()
��ʂ���������B

�ElcdPos(x,y)
�w�肵���ʒu�ɃJ�[�\�����ړ�����B

�ElcdMax(x,y)
�ő啶������ݒ肷��BlcdPrintLine�Ŏg����B
�����l�ł�x=16,y=2�B

�ElcdData(data)
�f�[�^��1�o�C�g���M����B

�ElcdCommand(data)
�R�}���h��1�o�C�g���M����B

���p�͎��ȐӔC�ŁB

v0.0 Beta���J
v0.1 �����łɁBEEPROM���T�|�[�g�AI2C�ǂݍ��ݖ��߂��g����悤�ɁBI2C�����ŗ]�v�ȃf�[�^�𑗂��Ă����o�O�C���B
V0.2 �������΍�Ƀt�@�C�����ו������A�኱�œK���BlcdPrintLine��lcdMax��ǉ��B
v0.3 �Â�FlashAir���g���Ă���ꍇ����ɓ��삵�Ȃ��̂ŁA���C�u�����ǂݍ��ݎ��Ƀo�[�W�����`�F�b�N�ǉ�
