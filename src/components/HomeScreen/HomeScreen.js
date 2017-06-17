import React from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';

export class HomeScreen extends React.Component {
  static navigationOptions = {
      title: 'Observatório de Resíduos'
  }
  render() {
    return (
      <View>
        <Image
          source={require('../../images/logo.png')}
          style={ styles.logo }
         />
      </View>
    )
  }
};