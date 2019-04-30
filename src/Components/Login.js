import React from 'react';
import {NavLink,Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import PasswordEncrypt from '../Data/PasswordEncrypt.js';
import ProfileCookies from '../Data/ProfileCookies.js';

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		this.passwordEncrypt = new PasswordEncrypt();
		this.sessionNew = new ProfileCookies();
		this.state={
			username:"", password:"", authenticate:false, usernameValid:"", passwordValid:""
			}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
	}
	handleChangeUsername(event)
	{
		this.setState({username:event.target.value })
	}
	handleChangePassword(event)
	{
		this.setState({password:event.target.value})
	}
	checkFields()
	{
		var error="";
		if(this.state.username==="")
		{
			this.setState({usernameValid:"Username cannot be empty"}) 
			error="error";
		}
		if(this.state.password==="")
		{
			this.setState({passwordValid:"Password cannot be empty"})
			error="error";
		}
		return error;
	}
	validateLogin()
	{		
		firebase.database().ref().child('login').orderByChild("username").equalTo(this.state.username).on("value",(snapshot)=>
			{
				if(snapshot.val()!==null)
				{
					var password = this.passwordEncrypt.decrypt(Object.values(snapshot.val())[0].password,this.state.username);
					if(password===this.state.password)
					{
						this.setState({authenticate:true})
					}
					else
					{
						this.setState({usernameValid:"",passwordValid:"Username/Password invalid"})
					}
				}
				else
				{
					this.setState({usernameValid:"User does not exist",passwordValid:""})
				}

			})
	}
	handleSubmit(event)
	{
		event.preventDefault();
		var error = this.checkFields();
		if(error!=="error")
		{
			this.validateLogin();
		}
	}
	render()
	{
		if(this.state.authenticate===true)
		{		
			this.sessionNew.createUserSession(this.state.username);
			return <Redirect to="/" />
		}
		return(
			<div className="login">
			<img className="logoText" src="images/icons/logo.png" alt="logo" />
			<div className="card">
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<h4 className="headingLogin"> Login </h4>
						<div className="flexDiv">
							<div className="labelLogin">
								<label> Username : </label>
							</div>
							<div className="form-element-login">
								<input className="form-control" type="text" name="username" value={this.state.username} placeholder = "Enter username" onChange={this.handleChangeUsername} />
							</div>				
						</div>
						<div className="errorLogin"> {this.state.usernameValid} </div>
						<div className="flexDiv">
							<div className="labelLogin">
								<label> Password : </label>
							</div>
							<div className="form-element-login">
								<input className="form-control" type="password" name="password" value={this.state.password} placeholder = "Enter password" onChange={this.handleChangePassword} />
							</div>							
						</div>
						<div className="errorLogin">{this.state.passwordValid} </div>
						<div className="submitLogin">
							<button className="btn btn-primary" type="submit"> Login </button>
						</div>
						<div className="flexDiv bottomDiv">
							<NavLink className="forgotPasswordFlex" to="/ConfirmPassword"> Forgot Password? </NavLink>
							<p> Don't have an account yet? </p> <NavLink to="/Register"><button className="btn btn-primary registerButton"
							type="submit"> Register </button></NavLink>
						</div>
					</form>
				</div>
			</div>
			</div>

			);
	}

}
export default Login;