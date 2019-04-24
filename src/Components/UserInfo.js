/* eslint-disable */
import React from 'react';
import DateComment from './DateComment.js';
import '../index.css';
import ProfileCookies from '../Data/ProfileCookies.js';
import * as firebase from 'firebase'

class UserInfo extends React.Component
{
	constructor()
	{
		super();
		this.state={
			userURL : '',
			name:''
		}
	}
	componentDidMount()
	{
		var username = this.props.userName;
		const user=firebase.database().ref().child("users").orderByChild("username").equalTo(username);
		let url = this;
		user.on('value',snap=>
		{
			var user=  Object.values(Object(snap.val()))[0];
			
			url.setState((state)=>(
		 	{
		 		userURL:user.userURL,
		 		name:user.name
		 	}));
		})

	}
	render()
	{
		const value = new ProfileCookies();
      	var username = value.retrieveUserSession();
      	var edit = false;
      	if(this.props.userName===username)
      	{
      		edit = true;
      	}
		return(
			<div className="postinformation">
				<div className="flexDiv">
					<a className="userLink" href={this.state.userURL} rel="noopener noreferer" target="_blank"><strong>{this.state.name} </strong></a>
					<div>
					<DateComment date={this.props.date}/>
					<button className={edit?'':'hidden'}> Edit </button>
					</div>
				</div>
			</div>
			);
	}
}

export default UserInfo;