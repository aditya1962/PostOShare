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
      var element = "post"+id;
      document.getElementById(element).contentEditable="true";
      document.getElementById(element).parentNode.childNodes[1].classList.remove("hidden");
    }

    post=(text,id)=>
    {
      var postDate = new Date();
      var dateString = postDate.getFullYear()+"/"+(postDate.getMonth()+1)+"/"+postDate.getDate()+" "
                      +postDate.getHours()+":"+postDate.getMinutes()+":"+postDate.getSeconds();
      var post={
        datetime:dateString,
        edited:"true",
        postid:id,
        pstDescription:text,
        username:this.profileCookies.retrieveUserSession()
      }
      return post;
    }


    updatePost=(text,id)=>
    {

      var element = "post"+id;
      document.getElementById(element).contentEditable="false";
      document.getElementById(element).parentNode.childNodes[1].classList.add("hidden"); 

    	
    	firebase.database().ref().child('posts').orderByChild('postid').equalTo(id)
    	.on("value",(snapshot)=>
    	{
    		snapshot.forEach((child)=>
    		{
    			var update={};
    			update['/posts/'+child.key] = this.post(text,id);
    			firebase.database().ref().update(update);
    		})
    	})
    }
}

export default PostValidation;