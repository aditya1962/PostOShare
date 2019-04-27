/* eslint-disable */
import React from 'react';
class FormValidate extends React.Component
{
	email=(value)=>
	{
		var error ="";
		if(!value)
		{
			error="Email cannot be empty";
		}
		else
		{
	  		var emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(value).toLowerCase());
	  		if(emailValid===false)
	  		{
	  			error= "Invalid Email";
	  		}
  		}
  		return error;
	}
	password = (value)=>
	{
		var error = "";
		if(!value)
		{
			error="Password cannot be empty";
		}
		if(value.length<4 || value.length > 8)
		{
			error="Password should be between 4 characters and 8 characters";
		}
		if(!(/[@#$*]/.test(value)))
		{
			error="Password should contain a special symbol(@,#,$,*)";
		}
		if(/\d/.test(value[0]))
		{
			error = "First character cannot be a number";
		}
		if((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value[0])))
		{
			error="First character cannot be a special character";
		}
		return error;
	}
	textError = (eventName,value)=>
	{
		var error = "";
		if(!value)
		{
			error = eventName + " cannot be empty";
		}
		if(/\d/.test(value[0]))
		{
			error = "First character cannot be a number";
		}
		return error;
	}
	dob = (value)=>
	{
		var error = "";
		if(!value)
		{
			error = "Date of Birth cannot be empty";
		}
		if(!(/^\d{4}\/\d{2}\/\d{2}$/.test(value)))
		{
			error="Invalid date. Date should be yyyy/mm/dd";
		}
		return error;
	}
}

export default FormValidate;