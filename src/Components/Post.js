/* eslint-disable */
import React from 'react';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import '../index.css';
import App from '../App.js';
import * as firebase from 'firebase';
import Comment from './Comment';
import ProfileCookies from '../Data/ProfileCookies.js';
import PostValidation from '../Data/PostValidation.js';

class Post extends React.Component
{

	constructor()
  {
  	super();
  	this.state = {
  		posts : []
  	}
    this.id=React.createRef();
    this.submitPost = this.submitPost.bind(this);
  }

  
    
    componentDidMount()
    {
      const root = firebase.database().ref().child('posts');
      const postV = new PostValidation();
      let data = this;
      const posts = this.state.posts;
      root.once('value',function(snapshot){
        snapshot.forEach(function(child){
          const postSet = [...data.state.posts]
          const newPost = {
            postContent:child.val()
          }
          postSet.push(newPost)
          data.setState((state)=>({
            posts:postSet
          }));
        });
      });

      

    }

    submitPost(event)
    {
      event.preventDefault();
      var id = event.target.id[event.target.id.length-1];
      var text = document.getElementById(id).innerHTML;
      const logged = new ProfileCookies();
      if(logged.isLoggedIn()===true)
      {
        const postV = new PostValidation();
        postV.updatePost(text,id);
      }
      document.getElementById(id).contentEditable="false";
    }


    render()
    {
      return(
        
       <div>
       {
        this.state.posts.map((post,index) =>

         <div className="card postDiv" key={index}>
         <div className = "card-body">
         <div className="post">
         <div key = {post.postContent.id} className="comment">
         <div className="flexDiv">
         <Avatar user={post.postContent.username}/>
         <UserInfo postId={post.postContent.postid} type="post" userName = {post.postContent.username} date={post.postContent.datetime}/>
         </div>
         <div className = "description">
         <p id={post.postContent.postid} contentEditable="false" suppressContentEditableWarning="true"> {post.postContent.pstDescription.replace(/&nbsp;/g, " ")} </p>
         <button id={"submit"+post.postContent.postid} onClick={this.submitPost} className="btn btn-primary hidden"> Submit </button>
         </div>
         </div>
         <div className="commentSection" key={index}>
         <div className="comments">
         <Comment postid={post.postContent.postid} />
         </div>
         </div>
         </div>

         </div>
         </div>		
         )
      }
      </div>
      );
    }
  }

  export default Post;