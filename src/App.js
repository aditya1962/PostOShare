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

  update(newElement)
  {
      var postSet = this.state.posts;
      //Get the postid of the last element
      var currpostid = newElement.postContent.postid;
      for(var i = 0; i < postSet.length;i++)
      {
        //check if current post id is equal to last post id
        if(postSet[i].postContent.postid==currpostid)
        {
          //remove current element
          postSet.splice(i,1);
        }
      }
      //push the new element to the post set
      postSet.push(newElement);
      //this.sortPosts(postSet);
      return postSet;
  }

  sortPosts(postSet)
  {
    var minPost = postSet[0];
    for(var i = 0; i < postSet.length; i++)
    {
      if(postSet[i].postContent.postid < minPost.postContent.postid)
      {
        postSet.splice(0,0,postSet[i]);
      }
    }
    
    console.log(postSet);
  }
  
  componentDidMount()
  {
     	const root = firebase.database().ref().child('posts');
     	let data = this;
      const posts = this.state.posts;
     	root.once('value',function(snapshot){
      		snapshot.forEach(function(child){
            const postSet = [...data.state.posts]
            const newPost = {
              postContent:child.val()
            }
            postSet.push(newPost)
    		  	data.setState((state)=>({
    		  		posts:postSet
    		  	}));
    		});
      });

      root.on("child_changed",function(child){
            const newPost = {
              postContent:child.val()
            }
            var postSet = data.update(newPost);
            data.setState((state)=>({
              posts:postSet
            }));
      })
  }



  render() {

    return (
      <div className="App">
      <Post data={this.state.posts} />
      </div>
    );
  }
}


export default App;
