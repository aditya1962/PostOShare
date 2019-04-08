import React from 'react';
import Post from './Post'
import '../index.css';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import * as firebase from 'firebase';

class Comment extends React.Component
{

	constructor()
	{
		super();
		this.state={
			comments : []
		}
	}
	componentDidMount()
	{
		var postid = this.props.postid;
		
		const db = firebase.database().ref();
		const comment = db.child("comment").orderByChild("postid").equalTo("1");
		let data = this;
		comment.once('value',snap=>
		{
			data.state.comments.push(snap.val())
			data.setState((state)=>(
			{
				comments:data.state.comments
			}));
		});

	}
	render()
	{
		var commentsArr = Array.from(new Set(Object.values(Object(this.state.comments[0]))));
		return(
       			commentsArr.map((comment,index)=>
       				<div className="flexDiv">
		       			<Avatar/>
		        		<UserInfo comment={comment.description} date={comment.datetime}/>
					</div>
       			)
			);
	}
}

export default Comment;