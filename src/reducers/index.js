// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostsReducer from './postsReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  user: UserReducer,
});


export default rootReducer;
