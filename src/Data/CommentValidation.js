import React from 'react';
import * as firebase from 'firebase';
import ProfileCookies from './ProfileCookies';

class CommentValidation extends React.Component
{
	
    getComment=(id)=>
    {
      var comment = document.getElementById(id);
      document.getElementById(id).contentEditable="true";
      comment.parentNode.childNodes[1].classList.remove("hidden");
    }

    
    updateComment=(text,id,post)=>
    {
    	const profileCookies = new ProfileCookies();
    	const user = profileCookies.retrieveUserSession();
      var commentDate = new Date();
      var dateString = commentDate.getFullYear()+"/"+(commentDate.getMonth()+1)+"/"+commentDate.getDate()+" "
                      +commentDate.getHours()+":"+commentDate.getMinutes()+":"+commentDate.getSeconds();
    	var comment={
    		datetime:dateString,
    		edited:"true",
    		commentid:id,
    		description:text,
        postid:post,
    		username:user
    	}
    	firebase.database().ref().child('comment').orderByChild('commentid').equalTo(id)
      .on("value",(snapshot)=>
      {
        console.log(snapshot.val())
        snapshot.forEach((child)=>
        {
          var update={};
          update['/comment/'+child.key] = comment;
          firebase.database().ref().update(update);
        })
      })
    }
}

export default CommentValidation;