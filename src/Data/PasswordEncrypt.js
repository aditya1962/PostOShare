import React from 'react';

var pbkdf2 = require('pbkdf2');
var aesjs = require('aes-js');

class PasswordEncrypt extends React.Component
{
	encrypt=(password,username)=>
	{
		var salt = username;
		var derivedKey = pbkdf2.pbkdf2Sync('password', salt, 1, 128/8, 'sha512');
		var passwordByte = aesjs.utils.utf8.toBytes(password);
		var aesCbc = new aesjs.ModeOfOperation.ctr(derivedKey);
		var encryptedBytes = aesCbc.encrypt(passwordByte);
		var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
		return encryptedHex;
	}
	decrypt=(password,username)=>
	{
		var salt = username;
		var derivedKey = pbkdf2.pbkdf2Sync('password', salt, 1, 128/8, 'sha512');
		var encryptedBytes = aesjs.utils.hex.toBytes(password);
		var aesCtr = new aesjs.ModeOfOperation.ctr(derivedKey,new aesjs.Counter(1));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);
		var passwordDecrypted = aesjs.utils.utf8.fromBytes(decryptedBytes);
		return passwordDecrypted;
	}

}
export default PasswordEncrypt;