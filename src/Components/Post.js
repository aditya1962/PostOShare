import React from 'react';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import '../index.css';
import App from '../App.js';

class Post extends React.Component
{
	render()
	{
		return(
		
			<div>
			{
				this.props.data.map((post,index) =>
					<div className="card postDiv">
						<div className = "card-body">
							<div className="post">
								 <div key = {post.postContent.id} className="comment">
				                    <div className="flexDiv">
					                    <Avatar imageUrl={post.postContent.imageURL}/>
					                    <UserInfo userUrl = {post.postContent.userURL} userName = {post.postContent.username}
					                    comment={post.postContent.comment} date={post.postContent.datetime}/>
				                    </div>
				                  </div>
				                  <div className="comments">
									 <div className="flexDiv">
						                    <Avatar imageUrl={post.postContent.imageURL}/>
						                    <UserInfo userUrl = {post.postContent.userURL} userName = {post.postContent.username}
						                    comment={post.postContent.comment} date={post.postContent.datetime}/>
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