/* eslint-disable */
import React from 'react';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import '../index.css';
import App from '../App.js';
import * as firebase from 'firebase';
import Comment from './Comment';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import ProfileCookies from '../Data/ProfileCookies.js';
import PostValidation from '../Data/PostValidation.js';

class Post extends React.Component
{

	constructor()
  {
  	super();
  	this.state = {
  		posts : [], postText:"", postKey:""
  	}
    this.key="";
    this.postV = new PostValidation();
    this.logged = new ProfileCookies();
    this.handlePost  = this.handlePost.bind(this);
    this.postWrite = this.postWrite.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  
    
    componentDidMount()
    {     
      const posts = this.state.posts;
      let data = this;
      firebase.database().ref().child('posts').once('value',function(snapshot){
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

    handlePost(event)
    {
      this.setState({postText:event.target.value})
    }

    postWrite(event)
    {
      event.preventDefault();
      if(this.state.postText!=="" && this.logged.isLoggedIn()===true)
      {
        this.post();
      }
      else
      {
        alert("Session expired. Login again")
      }
    }

    getNewPostKey()
    {
      return new Promise(function(resolve,reject){
      firebase.database().ref().child("posts").orderByChild("postid").on("value",snapshot=>
      {
        var keys = Object.keys(snapshot.val());
        var value = keys[keys.length-1];     
        resolve("post"+(parseInt(value[value.length-1])+1));
      }) 
    })
      
    }

    post()
    {
      this.getNewPostKey().then((key)=>{
          var date= new Date();
          var dateString = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "
                          +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();  
          var post={
                datetime:dateString,
                edited:"false",
                postid:parseInt(key[key.length-1]),
                pstDescription:this.state.postText,
                username:this.logged.retrieveUserSession()
              }
          var updatedpost={"postContent":post};
          var currentPosts = this.state.posts;
          currentPosts.push(updatedpost);
          this.setState({posts:currentPosts})
          firebase.database().ref('posts/'+ key).set(post);
      }
        ).catch((value)=>console.log(value));
     
    }

    submitPost(event)
    {
      event.preventDefault();
      var id = event.target.id;
      var postid = "post"+id[id.length-1];
      var text = document.getElementById(postid).innerHTML;
      
      if(this.logged.isLoggedIn()===true)
      {
        this.postV.updatePost(text,id[id.length-1]);
      }
      document.getElementById(id).contentEditable="false";
    }


    render()
    {
      return(
        
       <div>
      <ErrorBoundary>
        <form onSubmit={this.postWrite}>
          <div className="writePost formgroup postDiv">
            <textarea name="post" value={this.state.postText} onChange = {this.handlePost} placeholder="Write your post"
            className="form-control" rows="7"/>
            <button type="submit" className="btn btn-primary submit"> Submit </button>
          </div>
        </form>
      </ErrorBoundary>
       {
        this.state.posts.map((post,index) =>

         <div className="card postDiv" key={index}>
         <div className = "card-body">
         <div className="post">
         <div key = {post.postContent.id} className="comment">
         <div className="flexDiv">
         <ErrorBoundary>
         <Avatar user={post.postContent.username}/>
         </ErrorBoundary>
         <ErrorBoundary>
         <UserInfo postId={post.postContent.postid} type="post" edited={post.postContent.edited} userName = {post.postContent.username} date={post.postContent.datetime}/>
         </ErrorBoundary>
         </div>
         <div className = "description">
         <ErrorBoundary>
         <p id={"post"+post.postContent.postid} contentEditable="false" suppressContentEditableWarning="true"> {post.postContent.pstDescription.replace(/&nbsp;/g, " ")} </p>
         <button id={"submit"+post.postContent.postid} onClick={this.submitPost} className="btn btn-primary hidden"> Submit </button>
         </ErrorBoundary>
         </div>
         </div>
         <div className="commentSection" key={index}>
         <div className="comments">
         <ErrorBoundary>
         <Comment postid={post.postContent.postid} />
         </ErrorBoundary>
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