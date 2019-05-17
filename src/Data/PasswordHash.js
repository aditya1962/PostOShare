import React from 'react';

var shajs = require('sha.js');


class PasswordHash extends React.Component
{
	hash256=(password)=> 
	{
		var encryptedHex = shajs('sha256').update(password.toString()).digest('hex');
		return encryptedHex;
	}

}
export default PasswordHash;