/* eslint-disable */
import React from 'react';
import {BrowserRouter,Router} from 'react-router-dom';

import EditProfile from './EditProfile.js';
import Navigation from './Navigation.js';

class User extends React.Component
{
	render(){

		return(
			<div className = "userNavigation flexDiv">
				<div className="logoPic">
					<a href="/"><img className = "logo" src="images/favicon.ico" alt="logo" /></a>
				</div>
				<div className="profile">
					<button className="btn btn-default"><img src="https://placekitten.com/g/64/64" alt="profilePic"/> </button>
					<Navigation />
				</div>
			</div>
			);
	}
}

export default User;