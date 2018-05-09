import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import GridView from 'react-native-super-grid';


export default class ScoreBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        score: 0,
        mileage: 0,
        cars: this.props.cars,
        carInformation: null,
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

  addCarToTrack(car){
    index = this.state.cars.indexOf(car)
      
    if(car.isOnTrack == false){
        this.props.addNewCar(car)
        arr = this.state.cars
        arr[index].isOnTrack = true
        this.component = null //clearing information component
        this.carInformationTobeUpdated = car
        this.setState({items : arr})
    } else {
        arr[index].isOnTrack = false
        this.component = null //clearing information component
        this.carInformationTobeUpdated = null 
        this.props.removeCar(car.id) //removed from track
    }
  }

  showCarInformation(car, index){
    this.carInformationTobeUpdated = car
    if(this.carInformationTobeUpdated == null) return
    accidents = ""
    if(car.accidents.length == 0){
        accidents = 'No accidents'
    } else {
        accidents = "Accident Reported"
    }

    this.component = 
    <View style={{alignItems: 'center'}}>
        <Text>{car.title}</Text>
        <Text>{car.mileage} kilometres</Text>
        <Text>Speed: {car.speed}</Text>
        <Text>{accidents}</Text>
        <Text>${car.price}</Text>
    </View>
  }

  getCarIconColour(x){
      if(x) return '#efefef'
      else return '#000000'
  }

  render() {
    return (
        <View style={styles.container}>
            <Text>${this.state.score.toFixed(2)}</Text>
            <Text>{this.state.mileage} km</Text>
            <GridView
                style={styles.gridView}
                itemDimension={50}
                items={this.state.cars}
                renderItem={
                    (item) => (
                                        <IconButton 
                                            onPress={() => this.addCarToTrack(item)} 
                                            onLongPress={() => this.showCarInformation(item)} 
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
