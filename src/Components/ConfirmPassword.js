import React from 'react';
import {NavLink} from 'react-router-dom';
import PasswordEncrypt from '../Data/PasswordEncrypt.js';
import * as firebase from 'firebase';

class ConfirmPassword extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			username:"",
			password:"",
			confirmPassword:"",
			formErrors:
			{
				usernameValid:"",
				passwordValid:"",
				confirmPasswordValid:""
			}
		}
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsername(event)
	{
		this.setState(
		{
			username:event.target.value
		})
	}

	handlePassword(event)
	{
		this.setState(
		{
			password:event.target.value
		})
	}

	handleConfirm(event)
	{
		this.setState(
		{
			confirmPassword:event.target.value
		})
	}

	checkFields()
	{
		var error="";

		if(this.state.username==="")
		{
			this.setState(
			{
				usernameValid:"Username cannot be empty"
			})
			error="true";
		}
		if(this.state.password==="")
		{
			this.setState(
			{
				passwordValid:"Password cannot be empty"
			})
			error="true";
		}
		if(this.state.confirmPassword==="")
		{
			this.setState(
			{
				confirmPasswordValid:"Confirm Password cannot be empty"
			})
			error="true";
		}
		if(this.state.password!==this.state.confirmPassword)
		{
			this.setState(
			{	
				confirmPasswordValid:"Password and Confirm Password need to be same"
			})
			error="true";
		}
		return error;
	}

	validateUsername()
	{
		firebase.database().ref().child('login').orderByChild("username").equalTo(this.state.username).on("value",(snapshot)=>
		{
			if(snapshot.val()===null)
			{
				this.setState(
				{
					usernameValid:"Username does not exist"
				})
				
			}
		})
	}


	resetPassword()
	{
		this.validateUsername();
		if(this.state.usernameValid==="Username does not exist")
		{
			const passwordEncrypt = new PasswordEncrypt();
			var encryptedPassword = passwordEncrypt.encrypt(this.state.password,this.state.username);
			var user={
				username:this.state.username,
				password:encryptedPassword
			}
			firebase.database().ref('users/'+"user"+5).set(user);
			firebase.database().ref('login/'+"user"+5).set(user);
		}
	}

	handleSubmit(event)
	{
		event.preventDefault();
		var error = this.checkFields();
		if(error==="")
		{
			this.resetPassword();
		}
	}

	render()
	{
		return(
			<div className="register card">
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<h4 className="headingRegister"> Forgot Password </h4>
						<div className="flexDiv">
							<div className="labelRegister">
								<label> Username : </label>
							</div>
							<div className="form-element-register">
								<input className="form-control" type="text" name="username" value={this.state.username} placeholder = "Enter username" onChange={this.handleUsername} />
							</div>				
						</div>
						<div className="errorRegister"> {this.state.usernameValid} </div>
						<div className="flexDiv">
							<div className="labelRegister">
								<label> New Password : </label>
							</div>
							<div className="form-element-register">
								<input className="form-control" type="password" name="password" value={this.state.password} placeholder = "Enter password" onChange={this.handlePassword} />
							</div>							
						</div>
						<div className="errorRegister">{this.state.passwordValid} </div>
						<div className="flexDiv">
							<div className="labelRegister">
								<label> Confirm New Password : </label>
							</div>
							<div className="form-element-register">
								<input className="form-control" type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder = "Confirm password" onChange={this.handleConfirm} />
							</div>							
						</div>
						<div className="errorRegister">{this.state.confirmPasswordValid} </div>
						<div className="flexDiv submitRegister">
							<button className="btn btn-primary" type="submit"> Reset Password </button>
							<NavLink to="/Login"><button className="btn btn-primary"
							type="submit"> Login </button></NavLink>
						</div>
					</form>
				</div>
			</div>

			)
	}
}

export default ConfirmPassword;