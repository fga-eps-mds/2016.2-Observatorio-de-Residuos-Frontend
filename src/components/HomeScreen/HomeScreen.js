import React from 'react';
import { View, Image } from 'react-native';
import { homeStyles } from './styles';
import { NavButton } from '../NavButton';

export class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Observatório de Resíduos'
  }
  render() {
    return (
      <View style={ homeStyles.container }>
        <Image
          source={require('../../images/logo.png')}
          style={ homeStyles.logo }
         />
         <NavButton />
      </View>
    )
  }
};