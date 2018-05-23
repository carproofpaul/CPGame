import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';

import CameraScreen from './CameraScreen';


export default class AnalysePhoto extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    makeCall(data){
        var image = {image: "https://i1.wp.com/wildsau.ca/wp-content/uploads/2013/06/front-quarter_.jpg?fit=1280%2C853"};
        var xmlhttp = new XMLHttpRequest();
        var result;

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                result = xmlhttp.responseText;
                json = JSON.parse(result)
                console.log()
                console.log(json.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name); //license plate
                console.log(json.objects[0].vehicleAnnotation.attributes.system.make.name);
                console.log(json.objects[0].vehicleAnnotation.attributes.system.model.name);
                console.log(json.objects[0].vehicleAnnotation.attributes.system.color.name);

                Alert.alert(
                    'Car Detected',
                    'License Plate: ' + json.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name + "\n" +
                    'Make: '+ json.objects[0].vehicleAnnotation.attributes.system.make.name + "\n" +
                    'Model: '+ json.objects[0].vehicleAnnotation.attributes.system.model.name + "\n" +
                    'Colour: '+ json.objects[0].vehicleAnnotation.attributes.system.color.name + "\n",
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: true }
                )
            }
        }

        xmlhttp.open("POST", "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate");
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");
        xmlhttp.send(JSON.stringify(image));
    }

    display(){
        
    }

    

    render() {
        return(
            <View style={styles.container}>
                <CameraScreen onResult={(data) => this.display(data)} onBack={() => this.setState({camera: false})}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
});
