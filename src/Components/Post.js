import React from 'react';
import Avatar from './Avatar.js';
import UserInfo from './UserInfo.js';
import '../index.css';
import User from '../Data/user.json';

class Post extends React.Component
{
	render()
	{
		return(
			<div className="card postDiv">
			<div className = "card-body">
			<div className="post">
			<Avatar imageUrl={User.postImageUrl}/>
			</div>
			<div className="comments">
			{User.map((userDetail,index) => 
						{
							return <div className="comment">
										<div className="flexDiv">
										<Avatar imageUrl={userDetail.imageURL}/>
										<UserInfo userUrl = {userDetail.userURL} userName = {userDetail.username}
										comment={userDetail.comment} date={userDetail.datetime}/>
										</div>
									</div>
						}
					)
				}
			</div>
			</div>
			</div>
			);
	}
}

export default Post;