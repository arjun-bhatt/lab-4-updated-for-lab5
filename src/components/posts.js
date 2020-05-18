/* eslint-disable react/no-danger */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */

/* This will be the default page. It will display a list of posts. These posts can look like whatever you want.
The posts will be stored in the redux state rather than any single component so this will need to be a connected component
that connects to state.posts.all. In your listing you should utilize each posts cover_url, title, and tags.

Try the curl commands above, you’ll see that one of the fields you get back in the JSON is id.
You’ll use that construct NavLink elements to posts/:postID when you render the posts.
Each post should be clickable to open it full page using this route.
<Link to={posts/${post.id}}>....
 Where :postID is provided the router, refer back to the routing short to see how we did that there.

Min specs at a glance:

default page listing all posts
use post id to link to full view
show cover_url, title, tags in some form - can be a list, can be tiles, whatever you want!
Hint: As this is a connected component that relies on the list of posts, you’ll want to run your props.fetchPosts() ActionCreator from componentDidMount.
*/

import React, { Component } from 'react';
import { createStoreHook, connect } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { NavLink } from 'react-router-dom';
import marked from 'marked';
import {
  createPost, updatePost, getPostDetail, getPosts, deletePost,
} from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = () => {
  //   this.props.getPosts();
  // }

  componentDidMount() {
    console.log('in component did mount of posts; about to call getPosts');
    this.props.getPosts();
  }

  renderAllPosts = () => {
    console.log('in renderallposts in posts: testing this.props.posts:', this.props.posts);
    return this.props.posts.entrySeq().map(([id, post]) => { // remember, you're kind of renaming this in mapStatetoProps
      return (
        <div key={id}>
          <NavLink to={`/posts/${post.id}`}>
            <br />
            <div dangerouslySetInnerHTML={{ __html: marked(post.title || '') }} />
            <div>{post.tags}</div>
            <div dangerouslySetInnerHTML={{ __html: marked(post.cover_url || '') }} />
            <div> Post ID: {id} </div>
            <br />
            <br />
            <br />
          </NavLink>
        </div>
      );
    });
  }

  // automatically rendering
  render() {
    return (
      <div>
        <div>This is the posts page content</div>
        <div className="all-posts"> {this.renderAllPosts()} </div>
      </div>
    );
  }
}

const mapDispatchToProps = { // received help from Stephen, lint autocorrected it to this
  createPost,
  updatePost,
  getPostDetail,
  getPosts,
  deletePost,
};

// takes the redux state and returns a dictionary

const mapStateToProps = (reduxState) => {
  return {
    currentPost: reduxState.posts.current,
    posts: reduxState.posts.all,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
