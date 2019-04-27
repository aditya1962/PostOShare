/* eslint-disable */
import React from 'react';
import Post from './Post';
import User from './User';
import UserDetails from './UserDetails';
import {Redirect} from 'react-router-dom';
import ProfileCookies from '../Data/ProfileCookies.js';


class Home extends React.Component
{
	render()
	{
		return(
			<div className="App">
			    <User />
			    <div className="flexDiv">
			      	<UserDetails />
			      	<Post />
			    </div>
			</div>
			);
	}
}

export default Home;