/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable indent */

// change require to es6 import style
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
// eslint-disable-next-line import/no-absolute-path
import '/Users/arjunbhatt/Documents/GitHub/sa6/src/style.scss';
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-duplicates
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// eslint-disable-next-line import/no-duplicates
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './posts';
import Post from './post';
import NewPost from './newposts';
import Nav from './nav';
import {
 createPost, updatePost, getPostDetail, getPosts, deletePost, signIn,
} from '../actions';
import SignInComponent from './signin';
import SignUpComponent from './signup';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    // console.log('These are app\'s props!');
    // console.log(props);
    // console.log(props.store);
    // this.makeSamplePosts();
    this.state = {};
  }

  componentDidMount() {
    // fetch posts
    console.log('component just mounted, calling getPosts!');
    this.props.getPosts();
  }

  makePost = (post = {
    title: 'sample title',
    tags: ['tag1', 'tag2'],
    content: 'This is the content. If it\'s actually displaying, you should feel content!',
    cover_url: 'boogityboogityboo',

  }) => {
    // const newPost = {
    //   title: 'sample title',
    //   tags: 'thismatag',
    //   content: 'This is the content. If it\'s actually displaying, you should feel content!',
    //   coverUrl: 'boogityboogityboo',
    // };
    // console.log('Post:');
    // console.log(newPost);
    // console.log(this.props.createPost);
    console.log('in makeSamplePosts!');
    this.props.createPost(post);
    // console.log('createPost sent this to the store:');
    // console.log(toLog);
  }

  deletePost = (post) => {
    this.props.deletePost(post); // so can confirm in our root.index.js we are passing the store which contains the reducers as props to App
  }

  updatePost = (post) => {
    this.deletePost(post); // so this depends on deletepost only deleting by ID
    this.makePost(post);
  }

  printReduxState = () => {
    // console.log(this.props);
    console.log(this.props.all);
    console.log(this.props.all.toJSON());
    console.log(this.props.current);
  }


  render() {
  // so posts is automatically rendering b/c the exact path is just '/'
  // I feel like I shouldn't be passing this.props.posts to the Post component


// *** Need to build the three components *** //

  return (
    <Router>
      <div> This is the app!
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={SignInComponent} />
          <Route path="/signup" component={SignUpComponent} />
          <Route render={() => (<div>post not found </div>)} />

        </Switch>
        <button onClick={this.printReduxState} type="button">Print reduxstate</button>
      </div>
    </Router>
  );
}
}

function mapStateToProps(reduxState) {
  return {
    all: reduxState.posts.all,
    current: reduxState.posts.current,
  };
}


// DispatchToProps: takes in dispatch returns mapping of ActionCreators we want to be able to use in this component.
// Can just take all actions if we want, or provide just the ones we are interested in.

// these are all actions here
const mapDispatchToProps = { // received help from Stephen, lint autocorrected it to this
  createPost,
  updatePost,
  getPostDetail,
  getPosts,
  deletePost,
  signIn,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
