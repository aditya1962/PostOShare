/* eslint-disable */
import React from 'react';
import ErrorBoundary from '../Data/ErrorBoundary.js';
import ProfileCookies from '../Data/ProfileCookies.js';
import * as firebase from 'firebase'

class UserDetails extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={
			dob:"", employer:"", employment:"", imageURL:"", married:"", name:"", qualification:"",
			university:"", userURL:"", username:""
			}
		this.profileCookies = new ProfileCookies();
	}
	componentDidMount()
	{
		var username = this.profileCookies.retrieveUserSession();
		firebase.database().ref().child("users").orderByChild("username").equalTo(username).on('value',snap=>
			{
				var user = Object.values(snap.val())[0];
				this.setState({ dob:user.dob, employer:user.employer, employment:user.employment,
					imageURL:user.imageURL,	married:user.married, name:user.name,
					qualification:user.qualification, university:user.university,
					userURL:user.userURL, username:user.username })
			});
	}
	render()
	{
		return(
			<ErrorBoundary>
			<div className="user">
				<div className="card postDiv">
	         		<div className = "card-body">
	         			<div className="flexDiv">
	         				<img className="icon" src="images/profile/profile.png" alt="profile"/>
		         			<a href={this.state.userURL}> {this.state.name} </a>
	         			</div>
	         			<div className="flexDiv">
	         				<img className="icon" src="images/icons/qualification.png" alt="qualification"/>
	         				<p> {this.state.qualification}</p>
	         			</div>
	         			<div className="flexDiv">
	         				<img className="icon" src="images/icons/university.png" alt="university"/>
	         				<p> {this.state.university}</p>
	         			</div>
	         			<div className="flexDiv">
	         				<img className="icon" src="images/icons/employement.png" alt="employed"/>
	         				<p> {this.state.employment} </p>
	         			</div>
	         			<div className="flexDiv">
	         				<img className="icon" src="images/icons/university.png" alt="employer"/>
	         				<p> {this.state.employer}</p>
	         			</div>
	         			<div className="flexDiv">
	         				<img className="icon" src="images/icons/married.png" alt="marital"/>
	         				<p> {this.state.married} </p>
	         			</div>
	         		</div>
	         	</div>
			</div>
			</ErrorBoundary>
			);
	}
}

export default UserDetails;
