	//�X�}�[�g�t�H����ȂǁA�R���\�[���O�ł��G���[���L���b�`�ł���B
	window.onerror = function (message, url, line, column, errorObj) {
		alert("--- javascript error ---\nmessage : " + message
			+ "\nurl : " + url
			+ "\nline : " + line 
			+ "\ncolumn : " + column 
 			+ "\nerror : " + (errorObj ? errorObj.stack : ""));
		return true; 
	};