/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router, Route, NavLink, withRouter,
} from 'react-router-dom';

import { signOut } from '../actions';


class Nav extends Component {
  constructor(props) {
    super(props);
  }

renderAuthOptions = () => {
  console.log(this.props.authenticated, '<-- authenticated ');
  if (this.props.authenticated) {
    return (
      <button className="signout" onClick={this.handleSignOut} type="button">Sign Out</button>
    );
  } else {
    return (
      <div>
        <NavLink to="/signin">Sign in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </div>
    );
  }
}

handleSignOut = (event) => {
  console.log('in nav component, handling signOut!');
  this.props.signOut(this.props.history);
}

render() {
  return (
    <div>
      This is the Navbar!
      <NavLink exact to="/">My Super Awesome Blog</NavLink>
      <NavLink to="/posts/new">new post</NavLink>
      {this.renderAuthOptions()}
    </div>
  );
}
}


const mapStateToProps = (reduxState) => (
  {
    authenticated: reduxState.user.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signOut })(Nav));
