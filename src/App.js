import React, { Component } from 'react';
import Post from './Components/Post';
import * as firebase from 'firebase'


class App extends Component {

  constructor()
  {
  	super();
  	this.state = {
  		posts : ''
  	}
  }
  componentDidMount()
  {
  	const root = firebase.database().ref().child('comment');
  	console.log(root);
  	const comment = root.child('comment2');
  	root.once('value',function(snapshot){
  		snapshot.forEach(function(child){
  			console.log(child.val());
  			/*
		  	this.setState({
		  		posts: this.state.posts+child.val()
		  		
		  	});
*/
		});
  	console.log(snapshot.val());
  });
  }

  render() {
    return (
      <div className="App">
      	<div> {this.state.posts.datetime} </div>
        <Post />
        <Post />
      </div>
    );
  }
}


export default App;
