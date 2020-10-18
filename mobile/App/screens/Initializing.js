import React from 'react';

import { hasAuthToken } from '../util/api';

export default class Initializing extends React.Component {
  componentDidMount() {
    // hasAuthToken is returning a promise
    hasAuthToken().then(hasToken => {
      if (hasToken) { // if they have a token navigate to Info
        this.props.navigation.navigate('Information');
      } else { // else navigate to to Auth if they're not a users
        this.props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    return null;
  }
}