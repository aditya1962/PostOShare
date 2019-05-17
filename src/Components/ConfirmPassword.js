import React from 'react';
import {Helmet} from 'react-helmet';
import {NavLink} from 'react-router-dom';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import PasswordHash from '../Data/PasswordHash.js';
import FormValidate from '../Data/FormValidate.js';
import * as firebase from 'firebase';

class ConfirmPassword extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			username:"", password:"", confirmPassword:"", usernameValid:"", passwordValid:"", confirmPasswordValid:"",updated:""
			}
		this.PasswordHash = new PasswordHash();
		this.formValidate = new FormValidate();
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsername(event)
	{
		this.setState({username:event.target.value})
	}

	handlePassword(event)
	{
		this.setState({password:event.target.value})
	}

	handleConfirm(event)
	{
		this.setState({confirmPassword:event.target.value})
	}

	checkFields()
	{
		this.formValidate.initializeError();
		this.setState({
			usernameValid:this.formValidate.textError("username",this.state.username),
			passwordValid:this.formValidate.password(this.state.password),
			confirmPasswordValid:this.formValidate.password(this.state.password)
							})
		if(this.state.password!==this.state.confirmPassword)
		{
			this.setState({	confirmPasswordValid:"Password and Confirm Password need to be same"})
		}
	}

	validateUsername()
	{

		let data = this;
		var username = this.state.username;
		return new Promise(function(resolve,reject){
			var valid=true;
			firebase.database().ref().child('login').orderByChild("username").equalTo(username).on("value",(snapshot)=>
			{
					if(snapshot.val()===null)
					{
						data.setState({usernameValid:"Username does not exist"});
						valid=false;			
					}
					resolve(valid);
			})
		})
	}

	getUser()
	{
		var username = this.state.username;
		return new Promise(function(resolve,reject){
		      firebase.database().ref().child("users").orderByChild("username").equalTo(username).on("value",snapshot=>
		      {
		        resolve(snapshot.val());
		        
		      }) 
		    })
	}

	updatePassword()
	{
		
		this.getUser().then((resolve)=>{
			var user={
					username:this.state.username,
					email:Object.values(resolve)[0].email,
					password:this.PasswordHash.hash256(this.state.password)
				}
			firebase.database().ref('login/'+Object.keys(resolve)).set(user);
			this.setState({updated:"Password Updated"})
		});
				
	}

	resetPassword()
	{
		this.validateUsername().then((resolve)=>{
			if(resolve===true)
			{
				this.updatePassword();
			}
		});
	}

	handleSubmit(event)
	{
		event.preventDefault();
		this.checkFields();
		var error = this.formValidate.getError();
		if(error.length===0)
		{
			this.resetPassword();
		}
	}

	render()
	{
		var updated;
		if(this.state.updated==="Password Updated")
		{
			updated=this.state.updated;
			document.getElementById("confirmpassword").classList.remove("hidden");		
		}
		return(
			<div className="register">
			<Helmet>
				<title> Confirm Password </title>
			</Helmet>
			<img className="logoText" src="images/icons/logo.png" alt="logo" />
			<div className="card">
				<div className="card-body">
				<ErrorBoundary>
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
						<div className="flexDiv">
							<button className="btn btn-primary submitRegister" type="submit"> Reset Password </button>
							<NavLink to="/Login"><button className="btn btn-primary"
							type="submit"> Login </button></NavLink>
						</div>
					</form>
					<div id="confirmpassword" className="hidden passwordUpdate"> {updated} </div>
					</ErrorBoundary>
				</div>
			</div>
			</div>

			)
	}
}

export default ConfirmPassword;