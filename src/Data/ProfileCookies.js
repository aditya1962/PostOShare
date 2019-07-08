/* eslint-disable */

import React from 'react';

class ProfileCookies extends React.Component
{
	createUserSession=(username,cb)=>
	{
		var cookie = "username="+username+";max-age=100";
		try{
			document.cookie = cookie;
		}
		catch(e)
		{
			alert("An error occured while initializing session");
		}
	}
	isLoggedIn = ()=>
	{
		var loggedIn =false;
		if(this.retrieveUserSession()!=="")
		{
			loggedIn=true;
		}
		return loggedIn;
	}
	retrieveUserSession=()=>
	{
		var cookieArray = document.cookie.split(";");
		var cookieValue = "";
		cookieArray.map((cookie,index)=>
		{
			var cookie = cookie.split("=");	
			if("username"===cookie[0].trim())
			{
				cookieValue = cookie[1];
			}
		})
		return cookieValue;
	}
	
}

export default ProfileCookies;