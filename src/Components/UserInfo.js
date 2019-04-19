/* eslint-disable */
import React from 'react';
import DateComment from './DateComment.js';
import '../index.css'
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
	render(props)
	{
		return(
			<div className="postinformation">
				<div className="flexDiv">
					<a className="userLink" href={this.state.userURL} rel="noopener noreferer" target="_blank"><strong>{this.state.name} </strong></a>
					<DateComment date={this.props.date}/>
				</div>
			</div>
			);
	}
}

export default UserInfo;