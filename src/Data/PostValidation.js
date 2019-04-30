import React from 'react';
import * as firebase from 'firebase';
import ProfileCookies from './ProfileCookies';

class PostValidation extends React.Component
{
  constructor()
  {
    super();
    this.profileCookies = new ProfileCookies();
  }
	update=(newElement)=>
  	{
    var postSet = this.state.posts;
      for(var i = 0; i < postSet.length;i++)
      {
        if(postSet[i].postContent.postid===newElement.postContent.postid)
        {
          postSet.splice(i,1);
        }
      }
      postSet.push(newElement);
      return postSet;
    }

    getPost=(id)=>
    {
      var post = document.getElementById(id);
      document.getElementById(id).contentEditable="true";
      post.parentNode.childNodes[1].classList.remove("hidden");
    }

    updatePost=(text,id)=>
    {
    	var post={
        datetime:new Date(),
        edited:"true",
        postid:id,
        pstDescription:text,
        username:this.profileCookies.retrieveUserSession()
      }
    	firebase.database().ref().child('posts').orderByChild('postid').equalTo(id)
    	.on("value",(snapshot)=>
    	{
    		snapshot.forEach((child)=>
    		{
    			var update={};
    			update['/posts/'+child.key] = post;
    			firebase.database().ref().update(update);
    		})
    	})
    }
    updateComment=(text,id)=>
    {
    	var post={
    		datetime:new Date(),
    		edited:"true",
    		postid:id,
    		pstDescription:text,
    		username:this.profileCookies.retrieveUserSession()
    	}
    	firebase.database().ref().child('posts').orderByChild('postid').equalTo(id)
    	.on("value",(snapshot)=>
    	{
    		snapshot.forEach((child)=>
    		{
    			var update={};
    			update['/posts/'+child.key] = post;
    			firebase.database().ref().update(update);
    		})
    	})
    }
}

export default PostValidation;