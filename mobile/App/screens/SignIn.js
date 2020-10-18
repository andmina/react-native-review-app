import React from 'react';
import { ScrollView } from 'react-native';

import { TextField, ErrorText } from '../components/Form';
import { Button } from '../components/Button';
import { reviewApi, saveAuthToken } from '../util/api';

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };


  handleSubmit = () => {
    this.setState({ error: '' });
    // make a request to our API
    reviewApi('/sign-in', { 
      method: 'POST', // this is what we're expecting
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      // get a response back
      .then(response => {
        return saveAuthToken(response.result.token);   // save token in async storage
      })
      .then(() => {
        this.props.navigation.navigate('Information'); // send the user to the "Information" screen
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <ErrorText text={this.state.error} />
        <Button text="Submit" onPress={this.handleSubmit} />
      </ScrollView>
    );
  }
}