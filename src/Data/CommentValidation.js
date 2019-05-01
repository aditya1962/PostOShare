import React from 'react';
import * as firebase from 'firebase';
import ProfileCookies from './ProfileCookies';

class CommentValidation extends React.Component
{
	  constructor()
    {
      super();
      this.profileCookies = new ProfileCookies();
    }
    getComment=(id)=>
    {
      document.getElementById(id).contentEditable="true";
      document.getElementById(id).parentNode.childNodes[1].classList.remove("hidden");
    }

    comment=(text,id,post)=>
    {
      var commentDate = new Date();
      var dateString = commentDate.getFullYear()+"/"+(commentDate.getMonth()+1)+"/"+commentDate.getDate()+" "
                      +commentDate.getHours()+":"+commentDate.getMinutes()+":"+commentDate.getSeconds();
      var comment={
        datetime:dateString,
        edited:"true",
        commentid:id,
        description:text,
        postid:post,
        username:this.profileCookies.retrieveUserSession()
      }
      return comment;
    }

    updateComment=(text,id,post)=>
    {  
      document.getElementById(id).parentNode.childNodes[1].classList.add("hidden");    
    	firebase.database().ref().child('comment').orderByChild('commentid').equalTo(id)
      .on("value",(snapshot)=>
      {
        snapshot.forEach((child)=>
        {
          var update={};
          update['/comment/'+child.key] = this.comment(text,id,post);
          firebase.database().ref().update(update);
        })
      })
    }
}

export default CommentValidation;