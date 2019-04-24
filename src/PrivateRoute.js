import React from 'react';
import ProfileCookies from './Data/ProfileCookies';
import {Redirect,Route} from 'react-router-dom';

const PrivateRoute = ({component:Component,...rest})=>{
	const cookie = new ProfileCookies();
	const isLoggedIn = cookie.isLoggedIn();

	return(
		<Route {...rest}
		render={props=>
			isLoggedIn?(
			<Component {...props} />
			):(
				<Redirect to ={{pathname:'/login', state:{from:props.location,loggedout:"true"}}} />
			)
		}
		/>
		)
}

export default PrivateRoute