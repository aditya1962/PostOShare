import React from 'react';
import Post from './Post'
import '../index.css'

class Comment extends React.Component
{
	render()
	{
		return(
			<div className="commentText">
				<p> {this.props.comment} </p>
			</div>
			);
	}
}

export default Comment;