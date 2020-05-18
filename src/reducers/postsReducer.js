/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import Immutable from 'Immutable';
import { ActionTypes } from '../actions';

const initialState = {
  // eslint-disable-next-line new-cap
  all: Immutable.Map(),
  current: null,
};

const convertArrayToMap = (array) => {
  const result = new Immutable.Map(array.map((i) => [i.id, i]));
  return result;
};

const postsReducer = (state = initialState, action, debug = true) => {
  // console.log('Postsreducer called & passed this action type:', action.type);
  // console.log(action.type);

  // reducers just need to set some current thing—so it's redundant to have an edit or update post method as all
  //  you have to do is change setting 1 post vs setting all posts.
  // your actions have to be more varied, but any part of CRUD would just boil down to either changing 1 thing or all the things
  switch (action.type) {
    case ActionTypes.getPostDetail: // return that single post.
      if (debug) {
        console.log('Ok, so we\'re in the reducer for the case getPostDetail and this is our current state:', state);
        console.log('Action.payload =', action.payload);
      }
      return { all: state.all, current: action.payload }; // so payload is just a parameter passed alongside that action function


    case ActionTypes.getPosts: // return the state object with the all property set to the new posts. // new posts or all posts??
      console.log('We are in the reducer for the case getPosts; we just got passed this action', action);
      if (Object.prototype.toString.call(action.payload) === '[object Array]') { // https://stackoverflow.com/questions/1058427/how-to-detect-if-a-variable-is-an-array
        const postsMap = convertArrayToMap(action.payload);
        return { all: postsMap, current: {} };
      }
      return { all: action.payload, current: {} };


    case ActionTypes.createPost:
      if (debug) {
        console.log('Ok, so we\'re in the reducer for the case createPost and this is our current state:', state);
        console.log('This is just seeing if set returns anything:', state.all.set(action.payload.id, action.payload));
        console.log('Action.payload =', action.payload);
      }
      return { all: state.all.set(action.payload.id, action.payload), current: state.current };


    case ActionTypes.deletePost:
      console.log('Ok, so we\'re in the reducer for the case deletePost and this is our current state:', state);
      console.log('Action.payload =', action.payload);
      // eslint-disable-next-line no-case-declarations
      const newState = { all: state.all.delete(action.payload.id), current: {} };
      console.log('And this is the state we\'re returning', newState);
      // window.location.reload();

      return newState;

    default:
      return state;
  }
};

export default postsReducer;
