 <Avatar imageUrl={comment.postContent.imageURL}/>
        <UserInfo userUrl = {comment.postContent.userURL} userName = {comment.postContent.username}
          comment={comment.postContent.comment} date={comment.postContent.datetime}/>

          <Comment postid = {post.postContent.postid} />

          		       			//<Avatar/>
          		       			.equalTo(this.props.imageUrl)

          		       			console.log(username);
			console.log(snap.ref.parent);

		 	image.setState=((state)=>(
		 	{
		 		imageURL:snap.val().user.imageURL
		 	}));

      const user=firebase.database().ref().child("users").orderByChild("username").equalTo(username);
    let url = this;
    user.on('value',snap=>
    {
      var userURL =  Object.values(Object(snap.val()))[0].userURL;
      
      url.setState((state)=>(
      {
        userURL:url.state.userURL
      }));
    })