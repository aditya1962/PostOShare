import React from 'react';
import * as firebase from 'firebase';
import ProfileCookies from './ProfileCookies';

class PostValidation extends React.Component
{
	update=(newElement)=>
  	{
    var postSet = this.state.posts;
      //Get the postid of the last element
      var currpostid = newElement.postContent.postid;
      for(var i = 0; i < postSet.length;i++)
      {
        //check if current post id is equal to last post id
        if(postSet[i].postContent.postid===currpostid)
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

    sortPosts=(postSet)=>
    {
      var minPost = postSet[0];
      for(var i = 0; i < postSet.length; i++)
      {
        if(postSet[i].postContent.postid < minPost.postContent.postid)
        {
          postSet.splice(0,0,postSet[i]);
        }
      }
    }

    getPost=(id)=>
    {
      var post = document.getElementById(id);
      document.getElementById(id).contentEditable="true";
      post.parentNode.childNodes[1].classList.remove("hidden");
    }

    updatePost=(text,id)=>
    {
    	const profileCookies = new ProfileCookies();
    	const user = profileCookies.retrieveUserSession();
    	var post={
    		datetime:new Date(),
    		edited:"true",
    		postid:id,
    		pstDescription:text,
    		username:user
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
    	const profileCookies = new ProfileCookies();
    	const user = profileCookies.retrieveUserSession();
    	var post={
    		datetime:new Date(),
    		edited:"true",
    		postid:id,
    		pstDescription:text,
    		username:user
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