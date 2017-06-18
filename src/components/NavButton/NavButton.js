import React from 'react';
import { 
  TouchableHighlight,
  View,
  Text,
  Alert
} from 'react-native';
import { navButtonStyles } from './styles';

export class NavButton extends React.Component {
  render() {
    return(
      <TouchableHighlight
        onPress={() => {this.props.navigate('Map')}}
        style={ navButtonStyles.button }
      >
        <Text>{this.props.text}</Text>
      </TouchableHighlight>            
    );
  }
}