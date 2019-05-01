import React from 'react';
import {Helmet} from 'react-helmet';
import User from './User';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import FormValidate from '../Data/FormValidate.js';
import PasswordEncrypt from '../Data/PasswordEncrypt.js';
import ProfileCookies from '../Data/ProfileCookies.js';
import * as firebase from 'firebase';

class EditProfile extends React.Component
{
	constructor(props)
	{
		super(props);
		this.profileCookies = new ProfileCookies();
		this.passwordEncrypt = new PasswordEncrypt ();
		this.formValidate = new FormValidate();
		this.formValidate.initializeError();
		this.userName = this.profileCookies.retrieveUserSession();
		this.state={
			email:"", password1:"", password2:"", name:"", qualification:"", university:"",
			employment:"", employer:"", married:"", dob:"",
			emailValid:"", password1Valid:"", password2Valid:"", nameValid:"",
			qualificationValid:"", universityValid:"", employmentValid:"",
			employerValid:"", marriedValid:"", dobValid:"", error:""
			
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
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeEmail(event)
	{	
		this.setState({ email:event.target.value, emailValid:this.formValidate.email(event.target.value)})
	}
	handleChangePassword1(event)
	{
		this.setState({password1:event.target.value, password1Valid:this.formValidate.password(event.target.value)})
	}
	handleChangePassword2(event)
	{
		this.setState({password2:event.target.value, password2Valid:this.formValidate.password(event.target.value)})
	}
	handleChangeName(event)
	{
		this.setState({name:event.target.value, nameValid:this.formValidate.textError(event.target.name,event.target.value)})
	}
	handleChangeQualification(event)
	{
		this.setState({qualification:event.target.value, 
					   qualificationValid:this.formValidate.textError(event.target.name,event.target.value)})
	}
	handleChangeUniversity(event)
	{
		this.setState({university:event.target.value, 
			           universityValid:this.formValidate.textError(event.target.name,event.target.value)})
	}
	handleChangeEmployment(event)
	{
		this.setState({employment:event.target.value,
					   employmentValid:this.formValidate.textError(event.target.name,event.target.value)})
	}
	handleChangeEmployer(event)
	{
		this.setState({employer:event.target.value,
					   employerValid:this.formValidate.textError(event.target.name,event.target.value)})
	}
	handleChangeMarried(event)
	{
		this.setState({married:event.target.value})
	}
	handleChangeDOB(event)
	{
		this.setState({dob:event.target.value, dobValid:this.formValidate.dob(event.target.value)})
	}
	checkFields()
	{
		if(this.state.password1!==this.state.password2) 
		{
			this.setState({ password2Valid:"Password and Confirm Password do not match" })
		}
		
		this.setState(
		{
			emailValid:this.formValidate.email(this.state.email),
			password1Valid:this.formValidate.password(this.state.password1),
			password2Valid:this.formValidate.password(this.state.password2),
			nameValid:this.formValidate.textError("name",this.state.name),
			qualificationValid:this.formValidate.textError("qualification",this.state.qualification),
			universityValid:this.formValidate.textError("university",this.state.university),
			employmentValid:this.formValidate.textError("employment",this.state.employment),
			employerValid:this.formValidate.textError("employer",this.state.employer),
			marriedValid:this.formValidate.textError("married",this.state.married),
			dobValid:this.formValidate.dob(this.state.dob)
		}
		)
	}
	updateInitialize()
	{
		var values =[];
		values[0] ={
			email:this.state.email,
			name:this.state.name,
			qualification:this.state.qualification,
			university:this.state.university,
			employment:this.state.employment,
			employer:this.state.employer,
			married:this.state.married,
			dob:this.state.dob,
			imageURL:"",
			username:this.userName,
			userURL:this.userName
		}
		values[1] = 
		{
			password:this.passwordEncrypt.encrypt(this.state.password1,this.userName),
			email:this.state.email,
			username:this.userName
		}
		return values;
	}
	update()
	{		
		var values = this.updateInitialize();
		firebase.database().ref().child('users').orderByChild('username').equalTo(this.userName)
			.on("value",(snapshot)=>
				{
					snapshot.forEach((child)=>
						{
							var update = {};
							update['/users/' + child.key] = values[0];
							firebase.database().ref().update(update);
							update={};
							update['/login/'+child.key] = values[1];
							firebase.database().ref().update(update);
						})
		});
	}
	handleSubmit(event)
	{
		event.preventDefault();
		this.formValidate.initializeError();
		this.checkFields();
		var errors = this.formValidate.getError();
		if(errors.length===0)
		{
			this.update()
		}
		
	}
	render()
	{
		return(
			<div className="App">
				<Helmet>
					<title> Edit Profile </title>
				</Helmet>
				<ErrorBoundary>
				<User />
				</ErrorBoundary>
				<div className="card editProfile">
					<div className="card-body">
						<ErrorBoundary>
						<form onSubmit={this.handleSubmit}>
						<h4 className="heading"> Login Information </h4>
						<div className="flexDiv">	
							<div className="label">
								<label> Username :  </label>
							</div>
							<div className="formelement">
								<input className="form-control" type="text" readOnly value={this.userName} />
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
							<button className="btn btn-primary update" type="submit"> Update Profile </button> 
							<button className="btn btn-primary update cancelEdit"> <a href="/">Cancel Changes </a></button>
						</div>
						</form>
						</ErrorBoundary>
					</div>
				</div>
			</div>
			);
	}
}

export default EditProfile;