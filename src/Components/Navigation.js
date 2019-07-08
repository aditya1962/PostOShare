import React from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends React.Component
{
	render()
	{
		return(
			<div className = "dropdownCont card">
				<div className="card-body">
					<NavLink className="dropdownLink" to="/editprofile"> Edit Profile </NavLink>
					<hr/> <NavLink className="dropdownLink" to="/logout"> Logout </NavLink>
				</div>
			</div>
			);
	}
}

export default Navigation;