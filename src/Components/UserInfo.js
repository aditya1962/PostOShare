import React from 'react';
import Post from './Post.js';
import Comment from './Comment.js';
import DateComment from './DateComment.js';
import '../index.css'

class UserInfo extends React.Component
{
	render(props)
	{
		return(
			<div className="postinformation">
				<div className="flexDiv">
					<a className="userLink" href="#" rel="noopener noreferer" target="_blank"><strong>{this.props.userUrl} </strong></a>
					<DateComment date={this.props.date}/>
				</div>
			</div>
			);
	}
}

export default UserInfo;