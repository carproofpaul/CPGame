import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';

const list = [
    {
        title: 'Accident/Damage Reports',
        icon: 'library-books',
    },
    {
        title: 'Lien Records',
        icon: 'trending-down',
    },
    {
        title: 'Canadian Registration',
        icon: 'people',
    },
    {
        title: 'Stolen Status',
        icon: 'cancel',
    },
    {
        title: 'U.S. History',
        icon: 'flag',
    },
    {
        title: 'Recalls',
        icon: 'new-releases',
    },
    {
        title: 'Service History',
        icon: 'search',
    },       
];


export default class AccidentsDamage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      return(
        <View style={styles.container}>
            <IconButton
                style={{margin: 15}}
                size={30}
                onPress={() => this.props.onClose()}
                name='chevron-down' 
            />
            <Text>AccidentsDamage</Text>
        </View>
      )
  }

}

const styles = StyleSheet.create({
  container : {
    flex : 1
  },

});
