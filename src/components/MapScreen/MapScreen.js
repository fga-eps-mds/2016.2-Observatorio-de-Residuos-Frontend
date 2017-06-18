import React from 'react';
import  Expo  from 'expo';
import { Text } from 'react-native';

export class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }
  static navigationOptions = {
    title: 'Mapa'
  }
  componentDidMount() {
    Expo.Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    }).then(success => {
      success.coords.latitudeDelta  = 0.0041;
      success.coords.longitudeDelta = 0.0058;
      console.log(success.coords)
      this.setState({region: success.coords});
    }, error => {
      console.log(error);
    });
  }
  render() {
    return (
      <Expo.MapView 
        style={{flex: 1}}
        region={this.state.region}
      />
    );
  }
}
