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
		const comment = db.child("comment").orderByChild("postid").equalTo(postid);
		let data = this;
		comment.on('value',snap=>
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
			<div>
				<div> <p> {commentsArr.length} comment(s) </p> </div>
				<div>
				{
       				commentsArr.map((comment,index)=>
       				<div className="comment">
	       				<div className="flexDiv">

	       					<Avatar user={comment.username}/>
			        		<UserInfo userUrl = {comment.userURL} userName = {comment.username}
                                date={comment.datetime}/>
						</div>
						<div className = "description">
	                              <p> {comment.description} </p>
	                    </div>
	                </div>  
       			)
       		}
       			</div>
       		</div>
			);
	}
}

export default Comment;