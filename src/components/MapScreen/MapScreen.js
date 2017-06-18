import React from 'react';
import  Expo  from 'expo';
import { Text } from 'react-native';

export class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Mapa'
    }
    render() {
        return (
            <Expo.MapView 
                style={{flex: 1}}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} />
        );
    }
}
