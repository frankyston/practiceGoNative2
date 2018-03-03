import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import api from 'services/api';
import OrganizationItem from './components/OrganizationItem';
import styles from './styles';

export default class Organizations extends Component {
  static navigationOptions = {
    title: 'Organizações',
    tabBarIcon: ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />,
  };

  state = {
    data: [],
    loading: true,
    refrashing: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ refrashing: true });
    const username = await AsyncStorage.getItem('@practiceNative:username');
    const response = await api.get(`/users/${username}/orgs`);
    this.setState({ data: response.data, loading: false, refrashing: false });
  }

  renderListItem = ({ item }) => <OrganizationItem organization={item} />

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      numColumns={2}
      columnWrapperStyle={styles.columnContainer}
      onRefresh={this.loadData}
      refreshing={this.state.refrashing}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading
        ? <ActivityIndicator style={styles.loading} />
        : this.renderList() }
      </View>
    );
  }
}
