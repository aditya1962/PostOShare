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