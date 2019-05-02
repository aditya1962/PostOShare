import React from 'react';
import {Helmet} from 'react-helmet';
import {NavLink} from 'react-router-dom';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import PasswordEncrypt from '../Data/PasswordEncrypt.js';
import FormValidate from '../Data/FormValidate.js';
import * as firebase from 'firebase';

class Register extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			username:"", password:"", confirmPassword:"", usernameValid:"", passwordValid:"", confirmPasswordValid:"",
			checked:false,submitted:false,registered:""
				}
		this.formValidate = new FormValidate();
		this.passwordEncrypt = new PasswordEncrypt();
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
		this.setState(
			{
				usernameValid:this.formValidate.textError("username",this.state.username),
				passwordValid:this.formValidate.password(this.state.password),
				confirmPasswordValid:this.formValidate.password(this.state.password)
			})
		if(this.state.password!==this.state.confirmPassword)
		{
			this.setState({	confirmPasswordValid:"Password and Confirm Password need to be same"})
		}
	}

	checkUser()
	{
		var username = this.state.username;
		let user = this;
			return new Promise(function(resolve,reject){
				firebase.database().ref().child('login').orderByChild("username").equalTo(username).on("value",snapshot=>
				{			
					var valid						
					if(snapshot.val()!==null && user.state.checked===false)
					{
						user.setState({usernameValid:"Username not available"})
						valid=false;
					}
					user.setState({checked:true});
					resolve(valid);
					})
				
			})
	}

	getNewUserKey()
	{
		return new Promise(function(resolve,reject){
		      firebase.database().ref().child("users").orderByChild("username").on("value",snapshot=>
		      {
		        var keys = Object.keys(snapshot.val());
		        var value = keys[keys.length-1];    
		        resolve("user"+(parseInt(value[value.length-1])+1));
		      }) 
		    })
	}

	register()
	{
		this.getNewUserKey().then((key)=>{
			var login={
				username:this.state.username,
				password:this.passwordEncrypt.encrypt(this.state.password,this.state.username)
			}
			var user={
				username:this.state.username
			}
			firebase.database().ref('users/'+key).set(user);
			firebase.database().ref('login/'+key).set(login);
			this.setState({registered:"User Registered"})
		})
	}

	handleSubmit(event)
	{
		event.preventDefault();
		this.checkFields();
		var error = this.formValidate.getError();
		if(error.length===0)
		{
			this.checkUser().then((resolve)=>{
				if(resolve===undefined)
					{
						this.register()
					}
				})			
		}
	}

	render()
	{
		var registered;
		if(this.state.registered==="User Registered")
		{
			registered=this.state.registered;
			document.getElementById("register").classList.remove("hidden");		
		}
		return(
			<div className="register">
			<Helmet>
				<title> Register </title>
			</Helmet>
			<img className="logoText" src="images/icons/logo.png" alt="logo" />
			<div className="card">
				<div className="card-body">
					<ErrorBoundary>
					<form onSubmit={this.handleSubmit}>
						<h4 className="headingRegister"> Register </h4>
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
								<label> Password : </label>
							</div>
							<div className="form-element-register">
								<input className="form-control" type="password" name="password" value={this.state.password} placeholder = "Enter password" onChange={this.handlePassword} />
							</div>							
						</div>
						<div className="errorRegister">{this.state.passwordValid} </div>
						<div className="flexDiv">
							<div className="labelRegister">
								<label> Confirm Password : </label>
							</div>
							<div className="form-element-register">
								<input className="form-control" type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder = "Confirm password" onChange={this.handleConfirm} />
							</div>							
						</div>
						<div className="errorRegister">{this.state.confirmPasswordValid} </div>
						<div className="flexDiv">
							<button className="btn btn-primary submitRegister" type="submit"> Register </button>
							<NavLink to="/Login"><button className="btn btn-primary"
							type="submit"> Login </button></NavLink>
						</div>
					</form>
					<div id="register" className="hidden userCreated"> {registered} </div>
					</ErrorBoundary>
				</div>
			</div>
			</div>
			)
	}
}

export default Register;