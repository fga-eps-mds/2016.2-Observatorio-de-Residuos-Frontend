import React from 'react';
import { StackNavigator as StackNav} from 'react-navigation';
import { HomeScreen } from '../../components/HomeScreen';
import { MapScreen } from '../../components/MapScreen';

export const StackNavigator = StackNav({
  Home: { screen: HomeScreen },
  Map: { screen: MapScreen }
}, {
  navigationOptions: {
    headerStyle: {
      paddingTop: 24
    }
  }
});
