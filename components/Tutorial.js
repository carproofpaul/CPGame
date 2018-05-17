import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';


export default class Tutorial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return(
    <View style={{flex: 1}}>
        <IconButton
            size={30}
            style={{margin: 15}}
            onPress={() => this.props.onBack()}
            name='chevron-down' 
        />
        <View style={styles.container}>
            <Text style={styles.subTitleItalic}>
                Tutorial  
            </Text>
            <Text style={styles.subTitle}>
                The goal of this game is to gain the most money possible to be able to buy new cars and upgrade you’re your current fleet.
            </Text>
            <Text style={styles.subTitleItalic}>
                To start playing; 
            </Text>
            <Text style={styles.subTitle}>
                Click on a car to place it on or remove it from the track.   
            </Text>
            <Text style={styles.subTitle}>
                When you gain enough cash to buy a new car, it will appear as a red car in your inventory. Click on it to buy it.  
            </Text>
            <Text style={styles.subTitle}>
                Long pressing on a car or clicking the information panel with display the car's vehicle history report. This report will provide you information regarding the car's maintenance and damage report.  
            </Text>
        </View>
    </View>
    )

  }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin: 25,
    },
    title : {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subTitle : {
        textAlign: 'center',
        margin: 10,
        fontSize: 17,
    },
    subTitleItalic : {
        textAlign: 'center',
        fontStyle: 'italic',
        margin: 10,
        fontSize: 17,
    },
});
