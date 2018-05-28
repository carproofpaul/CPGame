import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Alert, Modal, ScrollView } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from 'moment';
import { Input, Button } from 'react-native-elements';
import VechicleHistoryReport from '../VehicleHistoryReport/VehicleHistoryReport';

export default class CreateCar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            year: "",
            make: "",
            model: "",
            odometer: "",
            value: "",
            error: ""
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(){
        if(this.props.car !== undefined){
            console.log("componentWillReceiveProps")
            valuation = ((this.props.car.MinValuation + this.props.car.MaxValuation)/2)
            this.setState({
                year: this.props.car.VehicleYear !== 0 ? this.props.car.VehicleYear.toString() : "",
                make: this.props.car.VehicleMake,
                model: this.props.car.VehicleModel,
                value: valuation !== 0 ? valuation.toFixed(0) : ""
            })
        }
    }

    createCar(){
        if(this.state.year == ""){
            this.setState({error: "Please provide a year"})
        } else if(this.state.make == ""){
            this.setState({error: "Please provide a make"})
        } else if(this.state.model == ""){
            this.setState({error: "Please provide a model"})
        } else if(this.state.odometer == ""){
            this.setState({error: "Please provide the vehicle's mileage"})
        } else if(this.state.value == ""){
            this.setState({error: "Please provide a value for your car"})
        } else {
            this.setState({error: ""})
        }

        car = {
            title: this.state.year + " " + this.state.make + " " + this.state.model,
            speed : 15,
            score : 250,
            mileage : parseInt(this.state.odometer),
            price : Math.ceil(parseInt(this.state.value)),
            isOnTrack : false,
            upgradeAvailable : false, 
            id: null,
            vhr: new VechicleHistoryReport({
                vin: this.props.car.Vin,
                bodyStyle: this.props.car.VehicleTrim,
                countryOfAssembly: this.props.additionalInformation.OEMCountryOfOrigin || "",
                cylinders: this.props.additionalInformation.OEMCylinders || "",
                fuelType: this.props.car.VehicleEngineEnglishText,
                yearMakeModel: this.state.year + " " + this.state.make + " " + this.state.model
            }),
        }

        console.log(car)
        this.props.insertNewCar(car)
        this.props.onClose()
    }


    render() {
        /***
        'Car Detected',
        'Average Value: $' + ((car.MinValuation+car.MaxValuation)/2).toFixed(2) + "\n" +
        'VIN: ' + car.Vin + "\n" +
        'Year: ' + car.VehicleYear + "\n" +
        'Make: ' + car.VehicleMake + "\n" +
        'Model: ' + car.VehicleModel + "\n" +
        'Trim: ' + car.VehicleTrim + "\n" +
        'Drive Train: ' + car.VehicleDrivetrainEnglishText + "\n" +
        'Body Style: ' + car.VehicleBodyStyleEnglishText,
         */

        if(this.props.car == undefined) return(<View/>)
        
        return(
            <Modal
                animationType="slide"
                visible={this.props.visible}
                onRequestClose={() => this.props.onClose()}>
                <View style={styles.container}>
                    <Text style={styles.title}>Please Add or Correct Any Information</Text>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <Input
                        onChangeText={(text) => this.setState({year: text})}
                        label='Year'
                        placeholder='year'
                        value={this.state.year}
                        keyboardType='numeric'
                        containerStyle={{margin: 5}}
                    />
                    <Input
                        onChangeText={(text) => this.setState({make: text})}
                        label='Make'
                        placeholder='Make'
                        value={this.state.make}
                        containerStyle={{margin: 5}}
                    />
                    <Input
                        onChangeText={(text) => this.setState({model: text})}
                        label='Model'
                        placeholder='Model'
                        value={this.state.model}
                        containerStyle={{margin: 5}}
                    />
                    <Input
                        onChangeText={(text) => this.setState({value: text})}
                        label='$ Value'
                        placeholder='$ Value'
                        value={this.state.value}
                        containerStyle={{margin: 5}}
                    />
                    <Input
                        onChangeText={(text) => this.setState({odometer: text})}
                        label='Odometer (km)'
                        placeholder='Odometer (km)'
                        value={this.state.odometer}
                        keyboardType='numeric'
                        containerStyle={{margin: 5}}
                    />
                    <Button
                        containerStyle={{margin: 10}}
                        title='CREATE CAR'
                        raised={false}
                        onPress={() => this.createCar()}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
    flex : 1,
    alignItems: 'center'
  },
  inner: {
    alignItems: 'center',
    flex : 1,
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  error: {
      color: 'red',
      margin: 10,
      textAlign: 'center',
  }
});
