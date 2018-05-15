import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, ListItem, Divider} from 'react-native-elements';


export default class TrueValue extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        if(this.props.data == null) noData = <Text style={{fontStyle: 'italic', textAlign: 'center'}}>No Data Available</Text>
        else noData = null

        console.log(this.props.data)

        return(
        <View style={styles.container}>
            <IconButton
                size={30}
                onPress={() => this.props.onClose()}
                name='chevron-down' 
            />
            {   noData || 
                <View style={{flex: 1}}>
                    <Card 
                        style={{flex: 1, alignItems: 'center'}}
                        backgroundColor='#498fff'
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image 
                                style={{width: 100, height: 100, margin: 10}}
                                source={{uri: 'https://www.carproof.com/public/images/avatar-male.png'}}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                                <Text style={styles.title}>{'CARPROOF TRUE VALUE'+'\u2122'}</Text>    
                                <Text style={styles.valueFont}>${this.addCommas(this.props.data.price.toFixed(0))}</Text>                    
                            </View>
                        </View>
                    </Card>
                    <Card 
                        style={{flex: 1, alignItems: 'center'}}
                        backgroundColor='#e5e5e5'
                    >
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={[styles.textBold, {fontSize: 15, margin: 2}]}>{this.props.data.vhr.vehicleDetails.vin}</Text>    
                            <Text style={[styles.textBold, {fontSize: 20, margin: 2}]}>{this.props.data.vhr.vehicleDetails.yearMakeModel.toUpperCase()}</Text>       
                            <Text style={{fontSize: 15, color: '#000000', margin: 2}}>{this.props.data.vhr.vehicleDetails.bodyStyle}</Text>         
                            <Text style={{fontSize: 15, color: '#000000', margin: 2}}>Location: Ontario | Odometer: {this.props.data.mileage} km</Text>            
                        </View>
                    </Card>
                </View>
            }
        </View>
        )
    }

    addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin: 15
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  valueFont: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  textBold:{
    fontWeight: 'bold',
    color: '#000000'
  },
});
