import React from 'react';

import User from './User';
import FormValidate from './FormValidate.js'
import * as firebase from 'firebase'

class EditProfile extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			email:"",
			password1:"",
			password2:"",
			name:"",
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
				nameValid:"",
				qualificationValid:"",
				universityValid:"",
				employmentValid:"",
				employerValid:"",
				marriedValid:"",
				dobValid:"",
				fileValid:"",
				error:""
			}
		};

		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword1 = this.handleChangePassword1.bind(this);
		this.handleChangePassword2 = this.handleChangePassword2.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeQualification = this.handleChangeQualification.bind(this);
		this.handleChangeUniversity = this.handleChangeUniversity.bind(this);
		this.handleChangeEmployment = this.handleChangeEmployment.bind(this);
		this.handleChangeEmployer = this.handleChangeEmployer.bind(this);
		this.handleChangeMarried = this.handleChangeMarried.bind(this);
		this.handleChangeDOB = this.handleChangeDOB.bind(this);
		this.fileInput = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeEmail(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var emailValidate = formValidate.email(eventValue);
		this.setState(
		{
			email:eventValue, 
			emailValid:emailValidate
		}
			)
	}
	handleChangePassword1(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var passwordValidate = formValidate.password(eventValue);
		this.setState(
		{
			password1:eventValue,
			password1Valid:passwordValidate
		}
			)
	}
	handleChangePassword2(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var passwordValidate = formValidate.password(eventValue);
		this.setState(
		{
			password2:eventValue,
			password2Valid:passwordValidate
		}
			)
	}
	handleChangeName(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var nameValidated = formValidate.textError(event.target.name,eventValue);
		this.setState(
		{
			name:eventValue,
			nameValid:nameValidated
		}
			)
	}
	handleChangeQualification(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var qualificationValidated = formValidate.textError(event.target.name,eventValue);
		this.setState(
		{
			qualification:eventValue,
			qualificationValid:qualificationValidated
		}
			)
	}
	handleChangeUniversity(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var universityValidated = formValidate.textError(event.target.name,eventValue);
		this.setState(
		{
			university:eventValue,
			universityValid:universityValidated
		}
			)
	}
	handleChangeEmployment(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var employmentValidated = formValidate.textError(event.target.name,eventValue);
		this.setState(
		{
			employment:eventValue,
			employmentValid:employmentValidated
		}
			)
	}
	handleChangeEmployer(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var employerValidated = formValidate.textError(event.target.name,eventValue);
		this.setState(
		{
			employer:eventValue,
			employerValid:employerValidated
		}
			)
	}
	handleChangeMarried(event)
	{
		var eventValue = event.target.value;
		this.setState(
		{
			married:eventValue
		}
			)
	}
	handleChangeDOB(event)
	{
		const formValidate = new FormValidate();
		var eventValue = event.target.value;
		var dobValidated = formValidate.dob(eventValue);
		this.setState(
		{
			dob:eventValue,
			dobValid:dobValidated
		}
			)
	}
	checkFields()
	{
		const formValidate = new FormValidate();

		var email = formValidate.email(this.state.email);
		var password1 = formValidate.password(this.state.password1);
		var password2 = formValidate.password(this.state.password2);
		var passwordMatchError = "Password and Confirm Password do not match";
		var name = formValidate.textError("name",this.state.name);
		var qualification = formValidate.textError("qualification",this.state.qualification);
		var university = formValidate.textError("university",this.state.university);
		var employment = formValidate.textError("employment",this.state.employment);
		var employer = formValidate.textError("employer",this.state.employer);
		var married = formValidate.textError("married",this.state.married);
		var dob = formValidate.dob(this.state.dob);
		var file = this.fileInput.current.files[0];
		if(this.state.password1!==this.state.password2)
		{
			this.setState(
			{
				password2Valid:passwordMatchError
			}
			)
		}
		this.setState(
		{
			emailValid:email,
			password1Valid:password1,
			password2Valid:password2,
			nameValid:name,
			qualificationValid:qualification,
			universityValid:university,
			employmentValid:employment,
			employerValid:employer,
			marriedValid:married,
			dobValid:dob
		}
		)		
		if(file===undefined)
		{
			this.setState(
			{
				fileValid:"File not chosen"
			}
				)
		}
		else
		{
			this.setState(
			{
				fileValid:""
			}
				)
		}
		if(email !=="" || password1!=="" || password2 !=="" || name !=="" || qualification !=="" || 
			university !=="" || employment !=="" || employer!=="" || dob !=="" || file===undefined)
		{
			return "error";
		}
		else
		{
			return "";
		}
	}
	update()
	{
		var username="anash142"
		var user ={
			email:this.state.email,
			name:this.state.name,
			qualification:this.state.qualification,
			university:this.state.university,
			employment:this.state.employment,
			employer:this.state.employer,
			married:this.state.married,
			dob:this.state.dob,
			imageURL:"",
			username:username,
			userURL:username
		}
		firebase.database().ref().child('users').orderByChild('username').equalTo(username)
		.on("value",(snapshot)=>
			{
				snapshot.forEach((child)=>
					{
						var update = {};
						update['/users/' + child.key] = user;
						firebase.database().ref().update(update);
					})
			});
	}
	handleSubmit(event)
	{
		event.preventDefault();
		var errors = this.checkFields();
		if(errors!=="error")
		{
			this.update();
		}
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
								<input className="form-control" name="email" type="text" placeholder="Enter Email" value={this.state.email} onChange={this.handleChangeEmail}/>
								<div className="error"><p>{this.state.emailValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="password1" type="text" placeholder="Enter New Password" onChange={this.handleChangePassword1} value={this.state.password1}/>
								<div className="error"><p>{this.state.password1Valid}</p></div>
							</div>
						</div>
						<div className="flexDiv">
							<div className="label">
								<label> Confirm Password :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="password2" type="text" placeholder="Confirm New Password" onChange={this.handleChangePassword2} value={this.state.password2}/>
								<div className="error"><p>{this.state.password2Valid}</p></div>
							</div>
						</div>
						<hr/>
						<h4 className="heading"> Personal Details </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Full Name :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="name" type="text" placeholder="Enter Full Name" onChange={this.handleChangeName} value={this.state.name}/>
								<div className="error"><p>{this.state.nameValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Highest Educational Qualification :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="qualification" type="text" placeholder="Enter Qualification" onChange={this.handleChangeQualification} value={this.state.qualification}/>
								<div className="error"><p>{this.state.qualificationValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> School/University :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="university" type="text" placeholder="Enter School/University" onChange={this.handleChangeUniversity} value={this.state.university}/>
								<div className="error"><p>{this.state.universityValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Current Employment :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="employment" type="text" placeholder="Enter Current Employment" onChange={this.handleChangeEmployment} value={this.state.employment}/>
								<div className="error"><p>{this.state.employmentValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Employer:  </label>
							</div>
							<div className="formelement">
								<input className="form-control" name="employer" type="text" placeholder="Enter Current Employer" onChange={this.handleChangeEmployer} value={this.state.employer}/>
								<div className="error"><p>{this.state.employerValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> Marital Status :  </label>
							</div>
							<div className="formelement">
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="married" value="single" checked={this.state.married==="single"} onChange={this.handleChangeMarried}  />
									<label className="form-check-label">Single </label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="married" value="married" checked = {this.state.married==="married"} onChange={this.handleChangeMarried}  />
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
								<input className="form-control" name="dob" type="text" placeholder="Enter Date of Birth (E.g.:1993/02/19)" onChange={this.handleChangeDOB} value={this.state.dob}/>
								<div className="error"><p>{this.state.dobValid}</p></div>
							</div>
						</div>
						<div className="flexDiv">	
							<div className="label">
								<label> User Image:  </label>
							</div>
							<div className="formelement">
								<input type="file" className="form-control-file" ref = {this.fileInput} id="profileImage" />
								<div className="error"><p>{this.state.fileValid}</p></div>
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