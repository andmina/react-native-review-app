import { AsyncStorage } from 'react-native';

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "http://192.168.86.44:3000";
const AUTH_TOKEN = 'ReviewApp::AUTH_TOKEN';

export const saveAuthToken = token => {
  if (!token) { // if there's not a token
    return AsyncStorage.removeItem(AUTH_TOKEN); // once someone presses Sign Out we're not saving the token anymore
  }

  return AsyncStorage.setItem(AUTH_TOKEN, token); // set item AUTH_TOKEN to be the token
};

// 
export const hasAuthToken = () => {
  return AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    console.log('token', token); // return a promise in a form of a token
    if (token) {
      return true;
    }

    return false;
  });
};

export const reviewApi = (path, options = {}) => {
  const completeOptions = {
    ...options, // copy all of our options
    headers: {
      ...options.headers,
      'Content-Type': 'application/json', // so it exppects us to be sending json
    },
  };

  return fetch(`${BASE_URL}/api${path}`, completeOptions).then(async res => {
    const responseJson = await res.json();

    if (res.ok) {
      return responseJson;
    }

    throw new Error(responseJson.error);
  });
};