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
  signUp,
} from '../actions';


class signUpComponent extends Component {
  constructor(props) {
    super(props);
    console.log('We\'re constructing a sign up component!');
    this.state = {
      email: '',
      password: '',
    };
  }

  editingEmail = (event) => {
    console.log('editing email!');
    this.setState({ email: event.target.value });
  }

  editingPassword = (event) => {
    console.log('editing password!');
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    console.log('signing up a new user w these credentials:', this.state.email, this.state.password);
    // eslint-disable-next-line new-cap
    this.props.signUp({ email: this.state.email, password: this.state.password }, this.props.history);
  }


  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <div className="sign-in">
            <label>
              Email <input type="text" name="email" onChange={this.editingEmail} value={this.state.email} />
              Password <input type="text" name="password" onChange={this.editingPassword} value={this.state.password} />
            </label>
            <button type="submit" onClick={this.handleSubmit}>Sign up</button>
          </div>
        </div>
      );
    } else {
      return (
        <div> You are already signed in!</div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
//
});

const mapDispatchToProps = { // received help from Stephen, lint autocorrected it to this
  // eslint-disable-next-line no-undef
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(signUpComponent);
