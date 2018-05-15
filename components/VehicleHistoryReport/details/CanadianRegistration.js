import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';


export default class CanadianRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if(this.props.data.length == 0) component = <Text style={{fontStyle: 'italic', textAlign: 'center'}}>No History Available</Text>
    else component = null

    return(
    <View style={styles.container}>
        <IconButton
            size={30}
            onPress={() => this.props.onClose()}
            name='chevron-down' 
        />
        {component}
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin: 15
  },

});
