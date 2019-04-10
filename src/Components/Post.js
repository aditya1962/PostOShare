import React from 'react';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import '../index.css';
import App from '../App.js';
import * as firebase from 'firebase';
import Comment from './Comment'

class Post extends React.Component
{

	constructor()
  {
  	super();
  	this.state = {
  		posts : []
  	}
  }

  update(newElement)
  {
    var postSet = this.state.posts;
      //Get the postid of the last element
      var currpostid = newElement.postContent.postid;
      for(var i = 0; i < postSet.length;i++)
      {
        //check if current post id is equal to last post id
        if(postSet[i].postContent.postid==currpostid)
        {
          //remove current element
          postSet.splice(i,1);
        }
      }
      //push the new element to the post set
      postSet.push(newElement);
      //this.sortPosts(postSet);
      return postSet;
    }

    sortPosts(postSet)
    {
      var minPost = postSet[0];
      for(var i = 0; i < postSet.length; i++)
      {
        if(postSet[i].postContent.postid < minPost.postContent.postid)
        {
          postSet.splice(0,0,postSet[i]);
        }
      }
      
      console.log(postSet);
    }
    
    componentDidMount()
    {
      const root = firebase.database().ref().child('posts');
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

      root.on("child_changed",function(child){
        const newPost = {
          postContent:child.val()
        }
        var postSet = data.update(newPost);
        data.setState((state)=>({
          posts:postSet
        }));
      })
    }


    render()
    {
      return(
        
       <div>
       {
        this.state.posts.map((post,index) =>
         <div className="card postDiv">
         <div className = "card-body">
         <div className="post">
         <div key = {post.postContent.id} className="comment">
         <div className="flexDiv">
         <Avatar user={post.postContent.username}/>
         <UserInfo userUrl = {post.postContent.userURL} userName = {post.postContent.username}
         date={post.postContent.datetime}/>
         </div>
         <div className = "description">
         <p> {post.postContent.pstDescription} </p>
         </div>
         </div>
         <div className="commentSection">
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