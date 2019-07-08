/* eslint-disable */
import React from 'react';

import * as firebase from 'firebase';


class Avatar extends React.Component
{
	render()
	{
		return(
				<img className="avatar" src="images/profile/profile.png" alt="userImage"/>
			);
	}
}

export default Avatar;