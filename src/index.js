
import React, { Component } from 'react';
import 'config/ReactotronConfig';
import 'config/DevToolsConfig';
import createNavigation from 'routes';
import { AsyncStorage } from 'react-native';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@practiceNative:username');
    await this.appLogin(username);
  }

  appLogin = (username) => {
    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    if (!this.state.userChecked) return null;

    const Routes = createNavigation(this.state.userLogged);
    return <Routes />;
  }
}
