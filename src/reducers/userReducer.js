/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import Immutable from 'Immutable';
import { ActionTypes } from '../actions';

const initialState = {
  // eslint-disable-next-line new-cap
  all: Immutable.Map(),
  current: null,
  authenticated: false,
};

const userReducer = (state = initialState, action, debug = true) => {
  // console.log('Postsreducer called & passed this action type:', action.type);
  // console.log(action.type);

  // reducers just need to set some current thing—so it's redundant to have an edit or update post method as all
  //  you have to do is change setting 1 post vs setting all posts.
  // your actions have to be more varied, but any part of CRUD would just boil down to either changing 1 thing or all the things

  switch (action.type) {
    case ActionTypes.AUTH_USER: // return that single post.
      if (debug) {
        console.log('Ok, so we\'re in the reducer for the case AUTH_USER and this is our current state:', state);
        console.log('Action.payload =', action.payload);
      }
      return { ...state, authenticated: true, email: action.payload.email };

    case ActionTypes.DEAUTH_USER: // return the state object with the all property set to the new posts. // new posts or all posts??
      console.log('We are in the reducer for the case DEAUTH_USER; we just got passed this action', action);
      return { ...state, authenticated: false, email: null };


    case ActionTypes.AUTH_ERROR:
      if (debug) {
        console.log('Ok, so we\'re in the reducer for the case AUTH_ERROR and this is our current state:', state);
        console.log('Action.payload =', action.payload);
      }
      return { ...state, authenticated: false, email: null };

    default:
      return state;
  }
};

export default userReducer;
