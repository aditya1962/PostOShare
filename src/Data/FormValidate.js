/* eslint-disable */
import React from 'react';
class FormValidate extends React.Component
{
	constructor()
	{
		super();
		this.error=[];
	}
	initializeError=()=>
	{
		this.error=[];
	}
	getError=()=>
	{
		return this.error;
	}
	email=(value)=>
	{
		var emailError = "";
		if(!value)
		{
			emailError="Email cannot be empty";
		}
		else
		{
	  		var emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(value).toLowerCase());
	  		if(emailValid===false)
	  		{
	  			emailError = "Invalid Email";
	  		}
  		}
  		if(emailError!=="")
  		{
  			this.error.push(emailError);
  		}
  		return emailError;
	}
	password = (value)=>
	{
		var passwordError = "";
		if(!value)
		{
			passwordError = "Password cannot be empty";
		}
		if(value.length<4 || value.length > 8)
		{
			passwordError = "Password should be between 4 characters and 8 characters";
		}
		if(!(/[@#$*]/.test(value)))
		{
			passwordError = "Password should contain a special symbol(@,#,$,*)";
		}
		if(/\d/.test(value[0]))
		{
			passwordError = "First character cannot be a number";
		}
		if((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value[0])))
		{
			passwordError = "First character cannot be a special character";
		}
		if(passwordError!=="")
		{
			this.error.push(passwordError);
		}
		return passwordError;
	}
	textError = (eventName,value)=>
	{
		var textError = "";
		if(!value)
		{
			textError = eventName + " cannot be empty";
		}
		if(/\d/.test(value[0]))
		{
			textError = "First character cannot be a number";
		}
		if(textError!=="")
		{
			this.error.push(textError);
		}
		return textError;
	}
	dob = (value)=>
	{
		var dobError = "";
		if(!value)
		{
			dobError = "Date of Birth cannot be empty";
		}
		if(!(/^\d{4}\/\d{2}\/\d{2}$/.test(value)))
		{
			dobError = "Invalid date. Date should be yyyy/mm/dd";
		}
		if(dobError!=="")
		{
			this.error.push(dobError);
		}
		return dobError;
	}
}

export default FormValidate;