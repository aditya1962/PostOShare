/* eslint-disable */
import React from 'react';
import Post from './Post';
import User from './User';
import UserDetails from './UserDetails';
import {Redirect} from 'react-router-dom';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import ProfileCookies from '../Data/ProfileCookies.js';


class Home extends React.Component
{
	render()
	{
		return(
			<div className="App">
				<ErrorBoundary>
			    <User />
			    </ErrorBoundary>
			    <div className="flexDiv">
			    	<ErrorBoundary>
			      	<UserDetails />
			      	</ErrorBoundary>
			      	<ErrorBoundary>
			      	<Post />
			      	</ErrorBoundary>
			    </div>
			</div>
			);
	}
}

export default Home;