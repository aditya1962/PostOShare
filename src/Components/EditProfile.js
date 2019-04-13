import React from 'react';

import User from './User'

class EditProfile extends React.Component
{
	render()
	{
		return(
			<div className="App">
				<User />
				<div className="card editProfile">
					<div className="card-body">
						<form>
						<h4 className="heading"> Login Information </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Username :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" readonly value="" />
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Email :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter Email" value=""/>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter New Password" value=""/>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Confirm Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Confirm New Password" value=""/>
							</div>
						</div>
						<hr/>
						<h4 className="heading"> Personal Details </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Highest Educational Qualification :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter Qualification" value=""/>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> School/University :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter School/University" value=""/>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Current Employment :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter Current Employment" value=""/>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Employer:  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter Current Employer" value=""/>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Marital Status :  </label>
							</div>
							<div className="formelement">
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="martial" id="single" value="1" />
									<label className="form-check-label" for="single">Single </label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="martial" id="married" value="2" />
									<label className="form-check-label" for="married">Married </label>
								</div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Date of Birth :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" placeholder="Enter Date of Birth (E.g.:1993/02/19)" value=""/>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> User Image:  </label>
							</div>
							<div className="formelement">
								<input type="file" className="form-control-file" id="profileImage" />
							</div>
						</div>
						<div className="flexDiv">
							<button className="btn btn-primary update"> Update Profile </button> 
							<button className="btn btn-primary update"> Cancel Changes </button>
						</div>
						</form>
					</div>
				</div>
			</div>
			);
	}
}

export default EditProfile;