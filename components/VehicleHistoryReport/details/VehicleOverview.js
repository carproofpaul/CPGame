import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';


export default class VehicleOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.list = [
        {
            title: 'Price',
            value: "$"+this.props.data.price.toFixed(0),
            icon: 'attach-money',
        }, 
        {
            title: 'Odometer',
            value: this.props.data.mileage + " km",
            icon: 'timelapse',
        },       
        {
            title: 'Country of Assembly',
            value: this.props.data.vhr.vehicleDetails.countryOfAssembly,
            icon: 'map',
        },   
        {
            title: 'Body Style',
            value: this.props.data.vhr.vehicleDetails.bodyStyle,
            icon: 'bubble-chart',
        },   
        {
            title: 'Fuel Type',
            value: this.props.data.vhr.vehicleDetails.fuelType,
            icon: 'cloud',
        },   
        {
            title: 'Number of Cylinders',
            value: this.props.data.vhr.vehicleDetails.cylinders.toString(),
            icon: 'directions',
        },
        {
            title: 'VIN',
            value: this.props.data.vhr.vehicleDetails.vin,
            icon: 'star',
        }, 
    ];
  }

  render() {
    console.log(this.props.data);
    
    component = null

    return(
        <View style={styles.container}>
            <IconButton
                size={30}
                onPress={() => this.props.onClose()}
                name='chevron-down' 
            />
            <Text style={{fontSize: 20, marginLeft: 15, fontWeight: 'bold', marginTop: 10}}>
                {this.props.data.title}
            </Text>
            <Divider style={{ backgroundColor: 'black', margin: 15 }} />
            <View>
                        {
                            this.list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                rightTitle={item.value}
                                leftIcon={{ name: item.icon }}
                            />
                            ))
                        }
            </View>
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
