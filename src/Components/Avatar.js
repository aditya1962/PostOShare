/* eslint-disable */
import React from 'react';

import * as firebase from 'firebase';


class Avatar extends React.Component
{
	constructor()
	{
		super()
		this.state={
			imageURL:''
		}
	}
	componentDidMount()
	{
		var username = this.props.user;
		const user=firebase.database().ref().child("users").orderByChild("username").equalTo(username);
		let image = this;
		user.on('value',snap=>
		{
			var userImg =  Object.values(Object(snap.val()))[0].imageURL;
			
			image.setState((state)=>(
		 	{
		 		imageURL:userImg
		 	}));
		})
	}
	render()
	{
		return(
				<img className="avatar" src={this.state.imageURL} alt="userImage"/>
			);
	}
}

export default Avatar;