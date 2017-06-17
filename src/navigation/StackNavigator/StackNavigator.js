import React from 'react';
import { StackNavigator as StackNav} from 'react-navigation';
import { HomeScreen } from '../../components/HomeScreen'

export const StackNavigator = StackNav({
  Home: { screen: HomeScreen }
}, {
  navigationOptions: {
    headerStyle: {
      paddingTop: 24
    }
  }
});