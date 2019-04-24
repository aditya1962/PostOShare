/* eslint-disable */
import React from 'react';
import {Redirect,Route} from 'react-router-dom';
import '../index.css';
import Avatar from './Avatar';
import UserInfo from './UserInfo';
import * as firebase from 'firebase';

class Comment extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state={
			comments : [],
			value:""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	handleChange(event)
	{
		let value = this;
		value.setState(
		{
			value:event.target.value
		}
			)
	}
	newComment(value)
	{
		var commentDate= new Date();
		var date = commentDate.getFullYear().toString()+(commentDate.getMonth()+1).toString()+commentDate.getDate().toString()+
		commentDate.getHours().toString()+commentDate.getMinutes().toString()+commentDate.getSeconds().toString();
		var dateString = commentDate.getFullYear()+"/"+(commentDate.getMonth()+1)+"/"+commentDate.getDate()+" "
		+commentDate.getHours()+":"+commentDate.getMinutes()+":"+commentDate.getSeconds();
		var commentKey = "comment"+date.toString();
		const comment = {[commentKey]:{
			"datetime":dateString,
			"description":value,
			"postid":this.props.postid,
			"username":"name1"
		}}
		return comment;

	}
	writeData(comment)
	{
		var key = Object.keys(comment)[0];
		var values = Object.values(comment)[0];
		var datetime = values["datetime"];
		var description = values["description"];
		var postid = values["postid"];
		var username = values["username"];
		firebase.database().ref('comment/'+ key).set({
			"datetime":datetime,
			"description":description,
			"postid":postid,
			"username":username
		});
	}
	handleSubmit(event)
	{
		event.preventDefault();
		let comment = this;
		if(comment.state.comments[0]==null)
		{
			comment.state.comments[0] = {};
		}
		var commentNew = comment.newComment(comment.state.value);
		comment.state.value="";
		Object.assign(comment.state.comments[0], commentNew);
		comment.setState((state)=>(
		{
			comments: comment.state.comments
		}));
		comment.writeData(commentNew);
	}

	render()
	{
		var commentsArr = Array.from(new Set(Object.values(Object(this.state.comments[0]))));
		return(
			<div>
				<div className="flexDiv"> 
					<p className="commentNumber"> {commentsArr.length} comment(s) </p>
				</div>
				<form onSubmit = {this.handleSubmit}>
					<div className="writecomment formgroup">
	                    <textarea value={this.state.value} className="form-control" rows="7" 
	                    onChange={this.handleChange} placeholder="Write Something"/>
	                    <button className="submit btn btn-primary" type="submit">Submit </button>
	                </div>
                </form>
				<div>
				{
       				commentsArr.map((comment,index)=>
       				<div className="comment" key={index}>
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