import api from 'services/api';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import styles from './styles';

StatusBar.setBarStyle('light-content');

export default class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    errorMessage: '',
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@practiceNative:username', username);
  }

  signIn = async () => {
    this.setState({ loading: true });
    const { username } = this.state;

    if (username.length === 0) {
      this.setState({ loading: false, errorMessage: 'Você deve informar um usuário' });
      return;
    }

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      const resetActions = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'User' }),
        ],
      });

      this.props.navigation.dispatch(resetActions);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Usuário não encontrado.' });
    }
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar, precisamos que você informa seu usuário do Github.
        </Text>

        { !!this.state.errorMessage &&
          <Text style={styles.textError}>{this.state.errorMessage}</Text>}

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Digite o seu usuário"
            underlineColorAndroid="rgba(0,0,0,0)"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Prosseguir</Text> }
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
