import React from 'react'

class User extends React.Component
{
	render(){

		return(
			<div className = "userNavigation flexDiv">
				<div className="logoPic">
					<img className = "logo" src="images/favicon.ico" alt="logo" /> 
				</div>
				<div className="profile">
					<button className="btn btn-default"><img src="https://placekitten.com/g/64/64" alt="profilePic"/> </button>
				</div>
			</div>
			);
	}
}

export default User;