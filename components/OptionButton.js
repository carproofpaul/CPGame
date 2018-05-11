import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class OptionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableOpacity onPress={this.props.onPress} style={styles.buttonContainer}>
        <View style={styles.border} />
        <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Icon
            name={this.props.iconName}
            style={{ marginLeft : 15 }}
            size={20}
            color='#000000'
          />
          <Text style={styles.buttonText}> {this.props.text} </Text>
          <Icon
            name='chevron-right'
            style={{ marginRight : 15 }}
            size={20}
            color='#000000'
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  border : {
     borderBottomColor: 'black',
     borderBottomWidth: 1,
     marginBottom: 5,
  },
  buttonContainer : {
    margin: 5,
    width: Dimensions.get('window').width,
  },
  buttonText : {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    margin: 5,
  },
});