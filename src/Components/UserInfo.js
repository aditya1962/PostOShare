/* eslint-disable */
import React from 'react';
import DateComment from './DateComment.js';
import '../index.css';
import ProfileCookies from '../Data/ProfileCookies.js';
import * as firebase from 'firebase'
import PostValidation from '../Data/PostValidation.js';
import CommentValidation from '../Data/CommentValidation.js';

class UserInfo extends React.Component
{
	constructor()
	{
		super();
		this.state={
			userURL : '',
			name:''
		}
		this.id = React.createRef();
		this.editPost = this.editPost.bind(this);
	}
	editPost(e)
	{
		const post = new PostValidation();
		var id = event.target.id[event.target.id.length-1];
		post.getPost(id);
	}
	editComment(e)
	{
		const post = new CommentValidation();
		var id = event.target.id.slice(7);
		post.getComment(id);
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
      	var button;
      	if(this.props.userName===username)
      	{
      		edit = true;
      	}
      	if(this.props.type==="post")
      	{
      		button=<button id={"post"+this.props.postId} onClick={this.editPost} className={edit?'':'hidden'}> Edit </button>
      	}
      	if(this.props.type==="comment")
      	{
      		button=<button id={"comment"+this.props.commentId} onClick={this.editComment} className={edit?'':'hidden'}> Edit </button>
      	}
		return(
			<div className="postinformation">
				<div className="flexDiv">
					<a className="userLink" href={this.state.userURL} rel="noopener noreferer" target="_blank"><strong>{this.state.name} </strong></a>
					<div>
					<DateComment date={this.props.date}/>
					{button}
					</div>
				</div>
			</div>
			);
	}
}

export default UserInfo;