import React from 'react';
import Post from './Post.js'


class Avatar extends React.Component
{
	render()
	{
		return(
				<img className="avatar" src={this.props.imageUrl} alt="user image"/>
			);
	}
}

export default Avatar;