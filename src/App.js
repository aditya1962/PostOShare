import React, { Component } from 'react';
import Post from './Components/Post';
import * as firebase from 'firebase'


class App extends Component {

  constructor()
  {
  	super();
  	this.state = {
  		posts : []
  	}
  }
  
  componentDidMount()
  {
 	const root = firebase.database().ref().child('posts');
  	const comment = root.child('post1');
 	let data = this;
 	root.once('value',function(snapshot){
  		snapshot.forEach(function(child){
        data.state.posts.push(child.val())
		  	data.setState((state)=>({
		  		posts:data.state.posts
		  	}));
		});
  });
  }

  render() {
    return (
      <div className="App">
        {
          console.log(this.state.posts)
          /*
         this.state.posts.map((data,index)=>{
          return data.datetime
         })
        */
        } 
      	{this.state.posts.datetime}
        <Post />
        <Post />
      </div>
    );
  }
}


export default App;
