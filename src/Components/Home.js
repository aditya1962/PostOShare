/* eslint-disable */
import React from 'react';
import Post from './Post';
import User from './User'
import UserDetails from './UserDetails'


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