import React from 'react';

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div className="login">
			<img className="logoText" src="images/icons/logo.png" alt="logo" />
			<div className="card">
				<div className="card-body">
					<form>
						<h4 className="headingLogin"> Login </h4>
						<div className="flexDiv">
							<div className="labelLogin">
								<label> Username : </label>
							</div>
							<div className="form-element-login">
								<input className="form-control" type="text" name="username" placeholder = "Enter      username"/>
							</div>				
						</div>
						<div className="flexDiv">
							<div className="labelLogin">
								<label> Password : </label>
							</div>
							<div className="form-element-login">
								<input className="form-control" type="password" name="password" placeholder = "Enter password"/>
							</div>							
						</div>
						<div className="submitLogin">
							<button className="btn btn-primary" type="submit"> Login </button>
						</div>
						<div className="flexDiv bottomDiv">
							<a href="#">Forgot Password?</a>  
							<p> Don't have an account yet? </p> <a href="#">Register
              				<button className="btn btn-primary registerButton" type="submit"> Register </button></a> 
						</div>
					</form>
				</div>
			</div>
			</div>

			);
	}

}
export default Login;
