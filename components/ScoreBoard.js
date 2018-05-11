import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import GridView from 'react-native-super-grid';
import VehicleHistoryReportModal from './VehicleHistoryReportModal';


export default class ScoreBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        score: 0,
        mileage: 0,
        cars: this.props.cars,
        carInformation: null,
        modalVisible: false,
    };
    this.carInformationTobeUpdated = null
    
  }

  componentDidUpdate(){
      this.showCarInformation(this.carInformationTobeUpdated)
      this.setState({
        score: this.props.score,
        mileage: this.props.mileage
      })
  }

  addNewCarToTrack(car){
    this.props.addNewCar(car)
    arr = this.state.cars
    arr[index].isOnTrack = true
    this.carInformationTobeUpdated = car
  }

  onPressCar(car){
    index = this.state.cars.indexOf(car)
    if(car.isOnTrack == null){
        //available for purchase
        Alert.alert(
            'Available for purchase',
            'Do you want to buy this ' + car.title + " for $" + car.price +"?",
            [
              {text: 'Yes', onPress: () => {
                this.addNewCarToTrack(car)
                this.props.payForCar(car.price * -1) //paying for car
                this.setState({items : arr})
              }},
              {text: 'No', onPress: () => {

              }},
            ],
            { cancelable: false }
          )
    } else if(car.isOnTrack == false){
        this.addNewCarToTrack(car)
    } else {
        arr[index].isOnTrack = false
        this.carInformationTobeUpdated = car
        this.props.removeCar(car.id) //removed from track
    }
  }

  showCarInformation(car, index){
    this.carInformationTobeUpdated = car
    if(this.carInformationTobeUpdated == null) return
    accidents = ""
    if(car.vhr.accidents.length == 0){
        accidents = 'No accidents'
    } else {
        accidents = "Accident Report:\n"
        accidents = accidents + car.vhr.accidents.join('\n')
    }

    this.component = 
        <View style={{alignItems: 'center'}}>
            <Text>{car.title}</Text>
            <Text>{car.mileage} kilometres</Text>
            <Text>Speed: {car.speed}</Text>
            <Text>${car.price}</Text>
        </View>
  }

  getCarIconColour(x){
      if(x == null) return '#d81c00' //red
      else if(x) return '#efefef' //grey
      else return '#000000' //black
  }

  getTotalAssets(){
      total = 0
      for(i = 0; i < this.state.cars.length; i++){
        total = total + this.state.cars[i].price;
      }
      return total
  }

  showVehicleHistoryReport(car){
    this.vhr = car.vhr
    console.log(this.vhr.getServiceHistory());
    
    Alert.alert(
        'Vehicule History Report',
        car.vhr.reportSummary(),
        [
          {text: 'View Complete VHR', onPress: () => this.setState({modalVisible: true})},
        ],
        { cancelable: true }
    )
  }

  render() {
    return (
        <View style={styles.container}>
            <VehicleHistoryReportModal vhr={this.vhr} modalVisible={this.state.modalVisible} onClose={() => this.setState({modalVisible: false})}/>
            <Text>${this.state.score.toFixed(2)}</Text>
            <Text>{this.state.mileage} km</Text>
            <Text>${this.props.requiredPoints} to buy next car</Text>
            <Text>total assets: ${this.getTotalAssets()}</Text>
            <GridView
                style={styles.gridView}
                itemDimension={50}
                items={this.state.cars}
                renderItem={
                    (item) =>  (
                                    <IconButton 
                                        onPress={() => this.onPressCar(item)} 
                                        onLongPress={() => this.showVehicleHistoryReport(item)} 
                                        name='car' 
                                        size={50} 
                                        color={this.getCarIconColour(item.isOnTrack)}
                                    />
                                )
                }
            />
            {this.component}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 50,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
  },
  carContainer: {
    flex : 1,
    position: "absolute",
    backgroundColor:'transparent'
  },
});
