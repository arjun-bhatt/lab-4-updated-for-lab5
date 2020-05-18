import axios from 'axios';

const ROOT_URL = 'https://lab5-pt-2.herokuapp.com/';
// trial
const API_KEY = '?key=a_bhatt'; // said firstname_last name, did it mean first initial_last name? // later in the lab he corrected

// keys for actiontypes
export const ActionTypes = {
  getPosts: 'getPosts',
  getPostDetail: 'getPostDetail',
  updatePost: 'updatePost',
  deletePost: 'deletePost',
  createPost: 'createPost',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

function arrayToString(array) {
  return array.join(' / ');
}

// so these actions + the current state are all the reducer should need to get the next state

// GET #1
export function getPosts() {
  console.log('We are in the action creator for getPosts, producing a getPosts action!');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => { // response is coming from the server
      console.log('We sent a request to the server through axios, and this is what we got as a response', response);
      dispatch({ type: ActionTypes.getPosts, payload: response.data }); // take that response, attach it to the payload and dispatch that action
    })
      .catch((err) => {
        console.log(err);
      });
  };
}


// GET #2
export function getPostDetail(post) {
  console.log('We\'re in the action creator for getPostDetail; this is the post we got:', post);
  // console.log('And this is its post ID:', post.id);
  const postID = post; // but I thought the server generated the IDs? // I know this is unclear, but I'm actually passing in just the post ID
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${postID}`).then((response) => {
      console.log('Then we called axios.get and got this response.data which is then going to the reducer:', response.data);
      dispatch({ type: ActionTypes.getPostDetail, payload: response.data });
    })
      .catch((err) => {
        console.log(err);
      });
  };
}


// actiontypes are usually setters

// PUT
export function updatePost(post) {
  console.log('We\'re in the action creator for updatepost, this is the post we got:', post);
  const postID = post.id;
  const params = {
    title: post.title,
    tags: post.tags,
    content: post.content,
    cover_url: post.cover_url,
  };
  return (dispatch) => {
    // eslint-disable-next-line max-len
    axios.put(`${ROOT_URL}/posts/${postID}${API_KEY}`, params, { headers: { authorization: localStorage.getItem('token') } }).then((response) => { // so axios.put did the actual updating, now you just want to store that thing therefore you call get post detail
      // console.log('This is response.data!', response.data);
      dispatch({ type: ActionTypes.getPostDetail, payload: response.data });
    })
      .catch((err) => {
        console.log(err);
      });
  };
}

// DELETE
export function deletePost(postID, historyObj) {
  console.log('So we\'re in the deletePost action creator, and we got passed this (should be a post ID):', postID);
  console.log('this is our token:', localStorage.getItem('token'));
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${postID}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('and we got this response from the server:', response);
      dispatch({ type: ActionTypes.deletePost, payload: response.data });
      historyObj.push('/');
    })
      .catch((err) => {
        console.log('there was an error in deletePost!');
        console.log(err);
      });
  };
}

// POST
export function createPost(post) {
  console.log('We made it to the action creator! Creating a new post!');
  console.log('This is the post we got passed:', post);
  const params = {
    title: post.title,
    tags: arrayToString(post.tags),
    content: post.content,
    coverUrl: post.coverUrl,
    author: post.author,
  };
  console.log('These are the params we extracted from the post to send to axios:', params);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, params, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log('We are in the actions, and here is the response we get:', response);
      dispatch({ type: ActionTypes.createPost, payload: response.data });
      // consider adding history.push
    })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function signIn({ email, password }, history) { // shouldn't be AUTH_USER here, remember diverse actions to fewer reducers
  console.log('We made it to the signIn action creator!');
  console.log('This is the user info we got passed:', email, password);
  return (dispatch) => { // is this a thunk method??
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      console.log('We are in the actions, and here is the response we get:', response);
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
    })
      .catch((err) => {
        dispatch({ type: ActionTypes.AUTH_ERROR, payload: 'placeholder' });
      });
  };
}
// takes in an object with email and password (minimal user object)
// returns a thunk method that takes dispatch as an argument (just like our create post method really)
// does an axios.post on the /signin endpoint
// on success does:
//  dispatch({ type: ActionTypes.AUTH_USER });
//  localStorage.setItem('token', response.data.token);
// on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));


// deletes token from localstorage
// and deauths
export function signOut(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function signUp({ email, password }, history) {
  console.log('We made it to the signUp action creator!');
  console.log('This is the user info we got passed:', email, password);
  return (dispatch) => { // is this a thunk method??
    axios.post(`${ROOT_URL}/signup`, { email, password }).then((response) => {
      console.log('We are in the actions, and here is the response we get:', response);
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
    })
      .catch((err) => {
        dispatch({ type: ActionTypes.AUTH_ERROR, payload: 'placeholder' });
      });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function AUTH_ERROR(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}
