import React from 'react';
import Post from './Post.js';
import Comment from './Comment.js';
import DateComment from './DateComment.js';
import '../index.css'
import * as firebase from 'firebase'

class UserInfo extends React.Component
{
	constructor()
	{
		super();
		this.state={
			userURL : ''
		}
	}
	componentDidMount()
	{
		var username = this.props.userName;
		const user=firebase.database().ref().child("users").orderByChild("username").equalTo(username);
		let url = this;
		user.on('value',snap=>
		{
			var userurl =  Object.values(Object(snap.val()))[0].userURL;
			
			url.setState((state)=>(
		 	{
		 		userURL:userurl
		 	}));
		})

	}
	render(props)
	{
		return(
			<div className="postinformation">
				<div className="flexDiv">
					<a className="userLink" href="#" rel="noopener noreferer" target="_blank"><strong>{this.state.userURL} </strong></a>
					<DateComment date={this.props.date}/>
				</div>
			</div>
			);
	}
}

export default UserInfo;