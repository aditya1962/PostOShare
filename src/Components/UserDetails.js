/* eslint-disable */
import React from 'react';
import ProfileCookies from '../Data/ProfileCookies.js';
import * as firebase from 'firebase'

class UserDetails extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			dob:"",
			employer:"",
			employment:"",
			imageURL:"",
			married:"",
			name:"",
			qualification:"",
			university:"",
			userURL:"",
			username:""
		}
	}
	componentDidMount()
	{
		const value = new ProfileCookies();
		var username = value.retrieveUserSession();
		const ref = firebase.database().ref().child("users").orderByChild("username").equalTo(username);
		let user=this;
		ref.on('value',snap=>
		{
			var user = Object.values(snap.val())[0];
			this.setState(
			{
				dob:user.dob,
				employer:user.employer,
				employment:user.employment,
				imageURL:user.imageURL,
				married:user.married,
				name:user.name,
				qualification:user.qualification,
				university:user.university,
				userURL:user.userURL,
				username:user.username
			})
		});
	}
	render()
	{
		if(this.state.employer!="")
		{
			this.state.employer = " at " + this.state.employer;
		} 
		if(this.state.university!="")
		{
			this.state.university = " at " + this.state.university;
		}
		return(
			<div className="user">
				<div className="card postDiv">
	         		<div className = "card-body">
	         			<div className="flexDiv">
	         				<img src={this.state.imageURL} alt="profile"/>
	         				<div>
		         				<p> {this.state.name} </p>
		         				<p> {this.state.userURL} </p>
	         				</div>
	         			</div>
	         			<div className="flexDiv">
	         				<img src="#" alt="qualification"/>
	         				<p> {this.state.qualification} {this.state.university}</p>
	         			</div>
	         			<div className="flexDiv">
	         				<img src="#" alt="employed"/>
	         				<p> {this.state.employment} {this.state.employer}</p>
	         			</div>
	         			<div className="flexDiv">
	         				<img src="#" alt="marital"/>
	         				<p> {this.state.married} </p>
	         			</div>
	         		</div>
	         	</div>
			</div>
			);
	}
}

export default UserDetails;
