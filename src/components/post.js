/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* This is the component that gets loaded when you want to see the full rendered contents of a single post.
Post should display the full content of the post (selected by the ID that is passed in through this.props.match.params.postID.
    This post id parameter will come from the react-router when you navigate to: /posts/:postID.
    Where does postID come from in general? It is automatically assigned to your post by the API when you create the post
    (similarly to how firebase assigned automatic keys).

Your Post component should provide a way to edit the post.
You can either have an edit button that makes the whole post editable,
or you could have in place editing for each field as in the gif. Another option is to have an edit route:
/posts/:postID/edit for instance. Personal preference here, lots of different design choices you can make.

Note: for now the shared API server only supports title, tags, content, cover_url as fields.
In part 2 you will implement your own server and can add or change fields then.

Min specs at a glance:

render full content of post at route /posts/:postID
render markdown
allow editing of post fields
either in separate form or as individual editable fields
This is a connected component that can both trigger actions and is connected to the global redux state.

What is this connected thing you keep talking about?!
It is a react-redux connect function that makes your component connected to the redux store. It takes 2 arguments:

mapStateToProps: like what is says, take in redux state, outputs a dictionary mapping only the keys we are interested in.
mapDispatchToProps: takes in dispatch returns mapping of ActionCreators we want to be able to use in this component. Can just take all actions if we want, or provide just the ones we are interested in
^ all of the above end up in props, remember that. */

// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import marked from 'marked';
import { getPostDetail, deletePost, updatePost } from '../actions/index';


class Post extends Component {
  constructor(props) {
    super(props);
    console.log('We are making a post component!!!');
    console.log('This is the current post we\'re looking at!', this.props.current);
    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
      weAreEditing: false,
    };
  }

  componentDidMount() {
    console.log('Component just mounted. These are our props', this.props);
    if (this.props.match.params.postID) {
      console.log('Here\'s one place (in componentDidMount) we\'re calling getPostDetail. At this point, we\'re passing it this:', this.props.match.params.postID);
      this.props.getPostDetail(this.props.match.params.postID);
    }
  }

  handleDelete = () => {
    console.log('in handle delete in post!');
    this.props.deletePost(this.props.match.params.postID, this.props.history); // so this is technically sending over more than we need, but I think that should be OK
  }

  makePostFromState = () => {
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      cover_url: this.state.cover_url,
      content: this.state.content,
      id: this.props.match.params.postID,
      author: this.props.author,
    };
    console.log('We are in makePostFromState, and returning', post);
    return post;
  };

  logState = () => {
    console.log(this.state.weAreEditing);
  }

  // handleToggleEditHelper = () => {
  //   console.log(this.state.weAreEditing);
  //   if (!this.state.weAreEditing) { // so if we're not editing more
  //     console.log('We\'ve decided we want to save the post, and are about to make the post from the state and call update post.');
  //     this.props.updatePost(this.makePostFromState()); // remake the post object here
  //   }
  // }

  handleToggleEdit = (event) => {
    // // if we went from editing to not editing we want to save things, you need to do that still
    // console.log('Before making the change, weAreEditing is', this.state.weAreEditing);
    // this.setState((prevState) => ({
    //   weAreEditing: !prevState.weAreEditing,
    // // eslint-disable-next-line no-sequences
    // }, this.handleToggleEditHelper()));

    if (this.state.weAreEditing) {
      this.props.updatePost(this.makePostFromState());
    } else {
      // props has the most up to date stuff, that's what you wanna show the user to edit
      this.setState({
        title: this.props.current.title,
        tags: this.props.current.tags,
        content: this.props.current.content,
        cover_url: this.props.current.cover_url,
      });
    }
    this.setState((prevState) => ({ weAreEditing: !prevState.weAreEditing }));
  };


  // do we really need separate functions for all of these? probably not, but I think it makes it cleaner?
  editTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  // Got the idea for distinguishing updatedPost and currentpost from billy mcgrath

  editTags = (event) => {
    this.setState({ tags: event.target.value });
  };

  editBody = (event) => {
    this.setState({ content: event.target.value });
  };

  editImg = (event) => {
    this.setState({ cover_url: event.target.value });
  };

  renderPost = () => {
    if (!this.state.weAreEditing) { // if we are just displaying
      return (
        <div>
          <div>
            <br /> <br /> <br />
            <div dangerouslySetInnerHTML={{ __html: marked(this.props.current.title || '') }} />
            <div> Tags: {this.props.current.tags} </div>
            <div dangerouslySetInnerHTML={{ __html: marked(this.props.current.content || '') }} />
            <div dangerouslySetInnerHTML={{ __html: marked(this.props.current.cover_url || '') }} />
            <div> Author: {this.props.current.author} </div>
          </div>
          <button onClick={this.handleDelete} type="button">delet this</button>
          <button onClick={this.handleToggleEdit} type="button"> edit this</button>
        </div>
      );
    } else { // so if we are editing
      return (
        <div className="edit-post">
          <label>
            <input type="text" name="edit-post-title" onChange={this.editTitle} value={this.state.title} defaultValue={this.props.current.title} />
            <input type="text" name="edit-post-tags" onChange={this.editTags} value={this.state.tags} defaultValue={this.props.current.tags} />
            <input type="text" name="edit-post-body" onChange={this.editBody} value={this.state.content} defaultValue={this.props.current.content} />
          </label>
          <button type="submit" onClick={this.addPost}>This button does nothing. Go ahead, click it.</button>
          <div>
            <br /><br />
            <div> Post title: {this.props.current.title} </div>
            <div> Post tags: {this.props.current.tags} </div>
            <div> Post content: {this.props.current.content} </div>
            <div> Post URL: {this.props.current.cover_url}</div>
          </div>
          <button onClick={this.handleToggleEdit} type="button"> save!</button>
        </div>
      );
    }
  }

  render = () => {
    console.log('Rendering post!');
    if (this.props.current === null) {
      return (<div> Loading</div>);
    } else {
      return (this.renderPost());
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    current: reduxState.posts.current,
    posts: reduxState.posts.all,
    author: reduxState.user.email,
  };
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { getPostDetail, deletePost, updatePost })(Post);
