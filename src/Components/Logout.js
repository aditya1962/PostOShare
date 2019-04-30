import React from 'react';
import {Redirect} from 'react-router-dom';
import ProfileCookies from '../Data/ProfileCookies.js';

class Logout extends React.Component
{
	render()
	{
		const profileCookies = new ProfileCookies();
		var cookie = "username="+profileCookies.retrieveUserSession()+";max-age=0"
		document.cookie = cookie;
		return(
			<Redirect to ={{pathname:'/login', state:{loggedout:"true"}}} />
			)
	}
}

export default Logout;