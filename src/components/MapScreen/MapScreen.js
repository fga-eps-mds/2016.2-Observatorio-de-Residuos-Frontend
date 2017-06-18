import React from 'react';
import  Expo  from 'expo';
import { Text } from 'react-native';
import { markers } from './mockMarkers';

export class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: markers
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
      >
      {this.state.markers.map(marker => (
        <Expo.MapView.Marker
          key={marker.id_incidente}
          coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
          title={marker.titulo_incidente}
          description={marker.descricao_incidente}
        />
      ))}
      </Expo.MapView>
    );
  }
}
