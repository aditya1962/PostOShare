/* eslint-disable */
import React from 'react';
import {BrowserRouter,Router} from 'react-router-dom';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import EditProfile from './EditProfile.js';
import Navigation from './Navigation.js';

class User extends React.Component
{
	render(){

		return(
			<ErrorBoundary>
			<div className = "userNavigation flexDiv">
				<div className="logoPic">
					<a href="/"><img className = "logo" src="images/icons/logo-small.png" alt="logo" /></a>
				</div>
				<div className="profile">
					<button className="btn btn-default"><img src="images/profile/profile.png" alt="profilePic"/> </button>
					<Navigation />
				</div>
			</div>
			</ErrorBoundary>
			);
	}
}

export default User;