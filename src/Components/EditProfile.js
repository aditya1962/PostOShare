import React from 'react';

import User from './User';
import FormValidate from './FormValidate.js'

class EditProfile extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			email:"",
			password1:"",
			password2:"",
			qualification:"",
			university:"",
			employment:"",
			employer:"",
			married:"",
			dob:"",
			formErrors:
			{
				emailValid:"",
				password1Valid:"",
				password2Valid:"",
				qualificationValid:"",
				universityValid:"",
				employmentValid:"",
				employerValid:"",
				marriedValid:"",
				dobValid:"",
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	formValidate(eventName, eventValue)
	{
		const formValidate = new FormValidate();
		var email="",password1 = "",password1val = "",password2="", qualification="",university="",employment="",employer="",
		married="", dob="";
		switch(eventName){
			case "email":
				email = formValidate.email(eventValue);
				break;
			case "password1":
				password1 = formValidate.password(eventValue);
				break;
			case "password2":
				password2 = formValidate.password(eventValue);
				break;
			case "qualification":
				qualification  = formValidate.text(eventName,eventValue);
				break;
			case "university":
				university  = formValidate.text(eventName,eventValue);
				break;
			case "employment":
				employment  = formValidate.text(eventName,eventValue);
				break;
			case "employer":
				employer  = formValidate.text(eventName,eventValue);
				break;
			case "married":
				married = formValidate.text(eventName,eventValue);
			case "dob":
				dob = formValidate.dob(eventValue);
				break;

		}	
						
		this.setState(
		{
			emailValid:email,
			password1Valid:password1,
			password2Valid:password2,
			qualificationValid:qualification,
			universityValid:university,
			employmentValid:employment,
			employerValid:employer,
			marriedValid:married,
			dobValid:dob
		}
			);
	}
	handleChange(event)
	{
		let edit = this;
		let name = event.target.name;
		let value = event.target.value;
		edit.setState(
		{
			[name]:value,
			married:event.target.value
		}
			);
		edit.formValidate(name,value);
	}
	handleSubmit(event)
	{
		event.preventDefault();
	}
	render()
	{
		return(
			<div className="App">
				<User />
				<div className="card editProfile">
					<div className="card-body">
						<form onSubmit={this.handleSubmit}>
						<h4 className="heading"> Login Information </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Username :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" readOnly value="" />
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Email :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="email" type="text" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange}/>
								<div className="error"><p>{this.state.emailValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="password1" type="text" placeholder="Enter New Password" onChange={this.handleChange} value={this.state.password1}/>
								<div className="error"><p>{this.state.password1Valid}</p></div>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Confirm Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="password2" type="text" placeholder="Confirm New Password" onChange={this.handleChange} value={this.state.password2}/>
								<div className="error"><p>{this.state.password2Valid}</p></div>
							</div>
						</div>
						<hr/>
						<h4 className="heading"> Personal Details </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Highest Educational Qualification :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="qualification" type="text" placeholder="Enter Qualification" onChange={this.handleChange} value={this.state.qualification}/>
								<div className="error"><p>{this.state.qualificationValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> School/University :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="university" type="text" placeholder="Enter School/University" onChange={this.handleChange} value={this.state.university}/>
								<div className="error"><p>{this.state.universityValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Current Employment :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="employment" type="text" placeholder="Enter Current Employment" onChange={this.handleChange} value={this.state.employment}/>
								<div className="error"><p>{this.state.employmentValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Employer:  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="employer" type="text" placeholder="Enter Current Employer" onChange={this.handleChange} value={this.state.employer}/>
								<div className="error"><p>{this.state.employerValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Marital Status :  </label>
							</div>
							<div className="formelement">
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" checked={this.state.married==="single"} onChange={this.handleChange} value="single" />
									<label className="form-check-label">Single </label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" checked = {this.state.married==="married"} onChange={this.handleChange} value="married" />
									<label className="form-check-label">Married </label>
								</div>
								<div className="error"><p>{this.state.marriedValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Date of Birth :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="dob" type="text" placeholder="Enter Date of Birth (E.g.:1993/02/19)" onChange={this.handleChange} value={this.state.dob}/>
								<div className="error"><p>{this.state.dobValid}</p></div>
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
							<button className="btn btn-primary update" type="submit"> Update Profile </button> 
							<button className="btn btn-primary update cancelEdit"> <a href="/">Cancel Changes </a></button>
						</div>
						</form>
					</div>
				</div>
			</div>
			);
	}
}

export default EditProfile;