<p align="center"><img src="https://raw.githubusercontent.com/aditya1962/PostOShare/master/public/images/icons/logo.png" alt="logo">
</p>

![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
[![React](https://img.shields.io/badge/react-16.8%2B-blue.svg)](https://img.shields.io/badge/react-16.8%2B-blue.svg)
[![GitHub Issues](https://img.shields.io/github/issues/aditya1962/PostOShare.svg)](https://github.com/aditya1962/PostOShare/issues)
[![GitHub license](https://img.shields.io/github/license/aditya1962/PostOShare)](https://github.com/aditya1962/PostOShare/blob/master/LICENSE)


## Basic Overview

<a href="https://github.com/aditya1962/PostOShare/">PostOShare </a>is a social media sharing app where registered users can post posts and comments. The app uses <a href="https://reactjs.org/">React </a>as the UI render and <a href="https://firebase.google.com">Firebase </a> as the database model.

## Table of Contents
* [Installation](#installation)
* <a href="#installation">Installation</a>
* <a href="#db"> Database </a>
* <a href="#basic-usage">Basic Usage</a>
* <a href="#session-control">Session Control</a>
* <a href="#hashing">Hashing</a>
* <a href="#contributions"> Contributing to PostOShare </a>
* <a href="#license"> License </a>

<h3 id="installation">Installation </h3>

The lastest version of PostOShare can be installed by npm.

```sh
    git clone https://github.com/aditya1962/PostOShare.git
    
    cd PostOShare
    
    npm install 
    
    npm start

```

<h3 id="db"> Database </h3>

PostOShare uses Firebase realtime database. Database is hosted at <a href="https://social-media-post.firebaseio.com">https://social-media-post.firebaseio.com</a>. Configuration details are implemented in <a href="https://github.com/aditya1962/PostOShare/blob/master/src/firebase.js">https://github.com/aditya1962/PostOShare/blob/master/src/firebase.js</a>.

```javascript
...
var config = {
    apiKey: "AIzaSyC0x7BDINL1BvNA_sKWK7Zr4YojFdePEik",
    authDomain: "social-media-post.firebaseapp.com",
    databaseURL: "https://social-media-post.firebaseio.com",
    projectId: "social-media-post",
    storageBucket: "social-media-post.appspot.com",
    messagingSenderId: "136183787820"
  };
...

```

The initial database is exported and hosted as database-export.json <a href="https://github.com/aditya1962/PostOShare/blob/master/database-export.json">in the root directory</a>.

<b>CAUTION: Do not use the passwords in the following snippet to log in as they are hashed. Instead register if you are using first time and login</b>

```javascript

"login" : {
    //password values in these JavaScript objects are hashed
    "user2" : {
      "email" : "anash142@yahoo.com",
      "password" : "67bf55df5c66508e9bf7849958d34f072b3aa9f90b8c2b12477bd855a8ad5fd7",
      "username" : "anash142"
    },
    "user3" : {
      "email" : "ruwinsa34@hotmail.com",
      "password" : "8bf70e0a2f48b13626d54bc5d8c3c906c0996a1c8f56a779b060d70d995ab900",
      "username" : "erandi@14"
    },
    "user4" : {
      "email" : "manashich45@gmail.com",
      "password" : "575cf4c024b54b3a9bd7f8ea1b3b50b8e6c3b2da1da591fba559c58a55a126d2",
      "username" : "manashi82"
    }
  }
  
``` 

<b>CAUTION: Do not modify existing javascript objects in "login" object and "user" object in the initial database (as in <a href="https://github.com/aditya1962/PostOShare/blob/master/database-export.json">https://github.com/aditya1962/PostOShare/blob/master/database-export.json</a> ) as this may cause the app to crash</b>

<h3 id="basic-usage">Basic Usage</h3>

PostOShare requires users to be logged in to continue. Therefore, a user should first register at the <a href="/Register">Register</a> page. 

Once registered a user can either <a href="/Login">login </a> or <a href="/ConfirmPassword">change the password</a>. 

<p align="center"><img src="https://github.com/aditya1962/PostOShare/blob/master/public/images/readme/Login.gif" alt="Login" style="margin:0% 15%;"/></p><p align="center"> Fig 1: Login </p>

<p align="center"><img src="https://github.com/aditya1962/PostOShare/blob/master/public/images/readme/Confirm%20Password.gif" alt="Confirm Password" style="margin:0% 15%;"/></p><p align="center"> Fig 2:Confirm Password </p>

Since PostOShare currently does not use a server environment for server side processing, a confirmation mail is not currently sent to the user. Also, the username of a username CANNOT be changed once registered. 

An authorized user will be redirected to the <a href="/">Home </a> component. Here the user has the ability to post posts and comments.

<p align="center"><img src="https://github.com/aditya1962/PostOShare/blob/master/public/images/readme/Add%20Post.gif" alt="Add Post" style="margin:0% 15%;"/></p><p align="center"> Fig 3: Add Post </p>


An authorized user also has the ability to edit posts and/or comments posted by them. If a post is edited an Edited flag will be shown on top of the time.

<p align="center"><img src="https://github.com/aditya1962/PostOShare/blob/master/public/images/readme/Edit%20Post.gif" alt="Edit Post" style="margin:0% 15%;"/></p><p align="center"> Fig 4: Edit Post </p>

The left side panel displays details of the user. These will be set only after the user has edited their profile.

To edit a profile, hover over the profile icon at the top row and click <a href="/editprofile">Edit Profile </a>. 

<p align="center"><img src="https://github.com/aditya1962/PostOShare/blob/master/public/images/readme/Edit.PNG" alt="Edit" style="margin:0% 15%;"/></p><p align="center"> Fig 5: Edit Profile </p>

The Edit Profile component is divided into two sections: login related data and user related data. Once all the data are filled the user can edit the profile. Currently, PostOShare does not allow uploading a profile picture. Therefore, the profile picture will be set to default.

A user can log out of the application by hovering over the profile icon at the top row and clicking <a href="/logout"> Logout </a>



<h3 id="session-control">Session Control</h3>

Sessions in the app are controlled using JavaScript cookies. A cookie is set for 100 seconds. This could be changed by visiting ~/PostOShare/src/Data/ProfileCookies.js file in an editor and changing the value after "max-age= " in the following line. 

```javascript
	createUserSession=(username,cb)=>
	{
		var cookie = "username="+username+";max-age=100";
		...
	}
```
The username will be stored in the cookie and this is used for session control in the app. After 100 seconds of logged in the user will be logged out. 


<h3 id="hashing">Hashing</h3>

PostOShare uses SHA 256 to hash passwords. 

<h3 id="contributions"> Contributing to PostOShare </h3>

Contributing guidelines to PostOShare can be found in <a href="https://github.com/aditya1962/PostOShare/blob/contributing/contribution.md"> contributing to PostOShare </a>

<h3 id="license"> License </h3>

PostOShare uses <a href="https://github.com/aditya1962/PostOShare/blob/master/LICENSE"> MIT </a>License. 

