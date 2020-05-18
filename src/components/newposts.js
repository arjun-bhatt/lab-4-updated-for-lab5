/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* This is a component to create a new blog post.
Should be a connected component that can trigger actions via ActionCreators.
You could have one component that is used for create, show, and update.
Personal preference on this, but it might be easier at first to have a simple new post component and then refactor
later to have one component that does double duty. */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  createPost,
} from '../actions';


class newPosts extends Component {
  constructor(props) {
    super(props);
    console.log('We\'re making a new post!');
    this.state = {
      newBarText: 'New Note Title:',
      tagText: 'tags! separated by commas',
      bodyText: 'write your awesome post here',
      img: 'insert cover image/gif url here',
      creator: 'placeholder person',
    };
    console.log('Establishing our new post fx exists:', this.props.createfx);
  }

  addPost = (event) => {
    const title = this.state.newBarText;
    const tags = this.state.tagText.split(',');
    const content = this.state.bodyText;
    const coverUrl = this.state.img;
    const author = this.state.creator;
    const newPost = {
      title,
      tags,
      content,
      cover_url: coverUrl,
      author,
    };
    this.props.createPost(newPost);
  }

  editingTitlePost = (event) => {
    console.log('editing title of post!');
    this.setState({ newBarText: event.target.value });
  }

  editingTags = (event) => {
    this.setState({ tagText: event.target.value });
  }

  editingBody = (event) => {
    this.setState({ bodyText: event.target.value });
  }

  editingImg = (event) => {
    this.setState({ img: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="new-post">
          <label>
            <input type="text" name="new-post-title" onChange={this.editingTitlePost} value={this.state.newBarText} />
            <input type="text" name="new-post-tags" onChange={this.editingTags} value={this.state.tagText} />
            <input type="text" name="new-post-body" onChange={this.editingBody} value={this.state.bodyText} />
            <input type="text" name="new-post-img" onChange={this.editingImg} value={this.state.img} />
          </label>
          <button type="submit" onClick={this.addPost}>Add Post</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  // not sure what goes here
});

const mapDispatchToProps = { // received help from Stephen, lint autocorrected it to this
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(newPosts);
