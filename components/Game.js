import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, AsyncStorage } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import ScoreBoard from './ScoreBoard';
import VechicleHistoryReport from './VehicleHistoryReport';
import moment from 'moment';

export default class Game extends PureComponent {
  constructor() {
    super();

    //TODO: save in AsyncStorage
    this.game = {
      key: 0, //for unique component arrays
      score: 0,
      totalLaps:  0,
      id: 0,
      stop: false,
      carInformation: [
        {
          title: '2010 Toyota Yaris',
          speed : 15,
          score : 50,
          mileage : 150000,
          price : 9459,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'touring',
            countryOfAssembly: 'Japan',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2010 Toyota Yaris'
          }),
        },
        {
          title: '2010 Honda Civic',
          speed : 17,
          score : 55,
          mileage : 210000,
          price : 6890,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'sport',
            countryOfAssembly: 'Japan',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2010 Honda Civic'
          })
        },
        {
          title: '2007 Pontiac Vibe',
          speed : 11,
          score : 70,
          mileage : 250300,
          price : 4999,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'normal',
            countryOfAssembly: 'USA',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2007 Pontiac Vibe'
          })
        }
      ],
      newCars: [
        {
          title: '2015 Toyota Corolla CE',
          speed : 17,
          score : 50,
          mileage : 105000,
          price : 9799,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'touring',
            countryOfAssembly: 'Japan',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2015 Toyota Corolla CE'
          }),
        },
        {
          title: '2010 Toyota Matrix XR',
          speed : 21,
          score : 70,
          mileage : 210000,
          price : 6890,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'sport',
            countryOfAssembly: 'Japan',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2010 Toyota Matrix XR'
          }),
        },
        {
          title: '2017 Toyota Camry V6',
          speed : 26,
          score : 130,
          mileage : 15788,
          price : 26955,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'sport',
            countryOfAssembly: 'Japan',
            cylinders: 6,
            fuelType: 'gas',
            yearMakeModel: '2017 Toyota Camry V6'
          }),
        },
        {
          title: '2018 Toyota Avalon',
          speed : 24,
          score : 230,
          mileage : 100,
          price : 45999,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'luxury',
            countryOfAssembly: 'Japan',
            cylinders: 4,
            fuelType: 'gas',
            yearMakeModel: '2018 Toyota Avalon'
          }),
        },
        {
          title: '2018 Toyota RAV4 Limited',
          speed : 20,
          score : 250,
          mileage : 100,
          price : 29999,
          isOnTrack : false,
          id: null,
          vhr: new VechicleHistoryReport({
            vin: '2T1KU40E19C034127',
            bodyStyle: 'Limited',
            countryOfAssembly: 'Japan',
            cylinders: 6,
            fuelType: 'gas',
            yearMakeModel: '2018 Toyota RAV4 Limited'
          }),
        },
      ],
      carsOnTrack: [],
      indexOfCar: [],
      requiredPointForNewCar: 0, //the price of the first car in the newCars array
      init: function() {
        id = 0
        this.requiredPointForNewCar = this.newCars[0].price
        for(var car in this.carInformation) car.id = id++;
        for(var car in this.newCars) car.id = id++;

        return this
      }
    }.init()
    

    //state{ components }
    this.state = {
      components : []
    };

    //try to laod prev game
    //this.loadGame()

  }

  async loadGame(){
    try {
      const value = await AsyncStorage.getItem('@CPGame:game');
      this.game = value
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveGame(game){
    try {
      await AsyncStorage.setItem('@CPGame:game', game);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  //callback
  addToScore(score){
    this.game.score = this.game.score + score
    if(this.game.score > this.game.requiredPointForNewCar) this.game.userBoughtNewCar()
  }

  userBoughtNewCar(){
    if(this.game.stop) return;        
    if(this.game.newCars.length == 0) return; //no new cars
    this.game.stop = true
    Alert.alert(
      'New Car Available',
      'Do you want to buy a ' + this.game.newCars[0].title + " for $" + this.game.newCars[0].price +"?",
      [
        {text: 'Yes!', onPress: () => {
          this.game.score = this.game.score - this.game.requiredPointForNewCar
          if(this.game.newCars.length !== 0) this.game.carInformation.push(this.game.newCars.shift());
          if(this.game.newCars.length !== 0){
            this.game.requiredPointForNewCar = this.game.newCars[0].price
          } else {
            this.game.requiredPointForNewCar = null
          }
          this.game.stop = false
        }},
        {text: 'Maybe Later', onPress: () => {
          unsoldCar = this.game.newCars.shift()
          unsoldCar.isOnTrack = null
          this.game.carInformation.push(unsoldCar) //storing it for later
          this.game.requiredPointForNewCar = this.game.newCars[0].price
          this.game.stop = false
        }},
      ],
      { cancelable: false }
    )
  }

  addToLap(laps){
    this.game.totalLaps = this.game.totalLaps + laps
  }

  removeCarFromTrack(id){
    console.log(this.game.carsOnTrack);
    
    if(this.game.carsOnTrack[this.game.indexOfCar.indexOf(id)] == null) return;
    this.game.carsOnTrack[this.game.indexOfCar.indexOf(id)].delete() //deleting references/callbacks
    this.game.carsOnTrack.splice(this.game.indexOfCar.indexOf(id), 1) //removing from track
  }

  updateCars(){
    //moving the car and adding the new coordinates to an array
    carsToBeAddedOnTrack = []
    this.game.indexOfCar = [] //this array will be used to find the index of a car using it's id
    for (var i = 0; i < this.game.carsOnTrack.length; i++) {
      this.game.carsOnTrack[i].move()
      this.game.indexOfCar.push(this.game.carsOnTrack[i].info.id) //keeping the index of each car
      carsToBeAddedOnTrack.push(
        {
          left: this.game.carsOnTrack[i].x,
          top: this.game.carsOnTrack[i].y
        }
      )
    }
    return carsToBeAddedOnTrack
  }

  displayRepair(car, repair){
    if(this.game.stop) return; //stop repair from being display when another alert is up
    this.game.stop = true
    
    cost = Math.floor((Math.random() * 1000) + 100);
    car.vhr.serviceHistory.push([repair[1], cost, moment().format('YYYY-MM-DD')])
    
    this.game.score = this.game.score - cost    
    Alert.alert(
      'Maintenance is Required',
      "Your "+car.title+" "+repair.join(' ')+". This repair will cost $"+cost+".",
      [
        {text: 'Okay', onPress: () => {this.game.stop = false}}
      ],
      { cancelable: false }
    )
  }

  displayAccident(car, accident, isWriteOff){
    if(this.game.stop) return; //stop repair from being display when another alert is up
    this.game.stop = true
    message = ""
    if(isWriteOff){
      //car is a write off, removing it from the game
      message = "Your "+car.title+" was in an "+accident+". It was a write off."
      this.removeCarFromTrack(car.id) //killing all references
      for(i = 0; i < this.game.carInformation.length; i++){
        if(this.game.carInformation[i].id == car.id){
          //found the index, removing it from the array
          this.game.carInformation.splice(i, 1);
        }
      }
    } else {
      cost = Math.floor((Math.random() * 5000) + 1000)
      car.vhr.accidents.push([accident, cost, moment().format('YYYY-MM-DD')])
      this.game.score = this.game.score - cost
      message = "Your "+car.title+" was in an "+accident+". Repairs will cost you $"+cost+"."
    }

    Alert.alert(
      'Your car was in an accident',
      message,
      [
        {text: 'Okay', onPress: () => {this.game.stop = false}}
      ],
      { cancelable: false }
    )
  }

  addNewCar(car){
    this.game.carsOnTrack.push( new Car(0, 
                            0, 
                            'RIGHT', 
                            (score) => this.addToScore(score), 
                            (laps) => this.addToLap(laps), 
                            (car, repair) => this.displayRepair(car, repair),
                            (car, accident, isWriteOff) => this.displayAccident(car, accident, isWriteOff),
                            car
                            )
                  )
  }

  render() {
    //this.saveGame(this.game)
    return (
      <GameLoop 
        style={styles.container} 
        onUpdate={() => this.setState({components : this.updateCars()})}>
          <ScoreBoard 
            score={this.game.score} 
            mileage={this.game.totalLaps} 
            removeCar={(id) => this.removeCarFromTrack(id)} 
            addNewCar={(car) => this.addNewCar(car)} 
            cars={this.game.carInformation}
            requiredPoints={this.game.requiredPointForNewCar}
            payForCar={(score) => this.addToScore(score)}
          />
          {this.state.components.map(data =>
            <View 
              key={this.game.key++} 
              style={[styles.carContainer, data]}>
                <Icon name='car' size={50}/>
            </View>
          )}
      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  carContainer: {
    flex : 1,
    position: "absolute",
    backgroundColor:'transparent'
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 20,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});
