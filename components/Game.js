import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import ScoreBoard from './ScoreBoard';
import VechicleHistoryReport from './VehicleHistoryReport/VehicleHistoryReport';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment';

export default class Game extends PureComponent {
  constructor() {
    super();
    this.key = 0
    this.score = 0
    this.totalLaps = 0
    this.id = 0;

    this.carInformation = [
      {
        title: '2010 Toyota Yaris',
        speed : 15,
        score : 100,
        mileage : 150000,
        price : 9459,
        isOnTrack : false,
        id: this.id++,
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
        score : 110,
        mileage : 210000,
        price : 6890,
        isOnTrack : false,
        id: this.id++,
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
        score : 120,
        mileage : 250300,
        price : 4999,
        isOnTrack : false,
        id: this.id++,
        vhr: new VechicleHistoryReport({
          vin: '2T1KU40E19C034127',
          bodyStyle: 'normal',
          countryOfAssembly: 'USA',
          cylinders: 4,
          fuelType: 'gas',
          yearMakeModel: '2007 Pontiac Vibe'
        })
      }
    ]
    this.newCars = [
      {
        title: '2010 Toyota Matrix XR',
        speed : 21,
        score : 200,
        mileage : 210000,
        price : 6890,
        isOnTrack : false,
        id: this.id++,
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
        title: '2009 Toyota Corolla CE',
        speed : 17,
        score : 120,
        mileage : 155000,
        price : 8375,
        isOnTrack : false,
        id: this.id++,
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
        title: '2017 Toyota Camry V6',
        speed : 26,
        score : 450,
        mileage : 15788,
        price : 26955,
        isOnTrack : false,
        id: this.id++,
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
        score : 600,
        mileage : 100,
        price : 45999,
        isOnTrack : false,
        id: this.id++,
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
        score : 740,
        mileage : 100,
        price : 29999,
        isOnTrack : false,
        id: this.id++,
        vhr: new VechicleHistoryReport({
          vin: '2T1KU40E19C034127',
          bodyStyle: 'Limited',
          countryOfAssembly: 'Japan',
          cylinders: 6,
          fuelType: 'gas',
          yearMakeModel: '2018 Toyota RAV4 Limited'
        }),
      },
    ]
    this.carsOnTrack = []

    this.requiredPointForNewCar = this.newCars[0].price //the price of the first car in the newCars array
    

    //state{ components }
    this.state = {
      components : []
    };

  }

  //callback
  addToScore(score){
    this.score = this.score + score
    if(this.score > this.requiredPointForNewCar) this.userBoughtNewCar()
  }

  userBoughtNewCar(){
    if(this.newCars.length == 0) return; //no new cars
    this.refs.toast.show('New Car Available', 2000);
    unsoldCar = this.newCars.shift()
    unsoldCar.isOnTrack = null
    this.carInformation.push(unsoldCar) //storing it for later
    this.requiredPointForNewCar = this.newCars[0].price
    /*
    Alert.alert(
      'New Car Available',
      'Do you want to buy a ' + this.newCars[0].title + " for $" + this.newCars[0].price +"?",
      [
        {text: 'Yes!', onPress: () => {
          this.score = this.score - this.requiredPointForNewCar
          if(this.newCars.length !== 0) this.carInformation.push(this.newCars.shift());
          if(this.newCars.length !== 0){
            this.requiredPointForNewCar = this.newCars[0].price
          } else {
            this.requiredPointForNewCar = null
          }
          this.stop = false
        }},
        {text: 'Maybe Later', onPress: () => {
          unsoldCar = this.newCars.shift()
          unsoldCar.isOnTrack = null
          this.carInformation.push(unsoldCar) //storing it for later
          this.requiredPointForNewCar = this.newCars[0].price
          this.stop = false
        }},
      ],
      { cancelable: false }
    )
    */
  }

  addToLap(laps){
    this.totalLaps = this.totalLaps + laps
  }

  removeCarFromTrack(id){
    if(this.carsOnTrack[this.indexOfCar.indexOf(id)] == null) return;
    this.carsOnTrack[this.indexOfCar.indexOf(id)].delete() //deleting references/callbacks
    this.carsOnTrack.splice(this.indexOfCar.indexOf(id), 1) //removing from track
  }

  updateCars(){
    //moving the car and adding the new coordinates to an array
    carsToBeAddedOnTrack = []
    this.indexOfCar = [] //this array will be used to find the index of a car using it's id
    for (var i = 0; i < this.carsOnTrack.length; i++) {
      this.carsOnTrack[i].move()
      this.indexOfCar.push(this.carsOnTrack[i].info.id) //keeping the index of each car
      carsToBeAddedOnTrack.push(
        {
          left: this.carsOnTrack[i].x,
          top: this.carsOnTrack[i].y
        }
      )
    }
    return carsToBeAddedOnTrack
  }

  displayRepair(car, repair){
    cost = Math.floor((Math.random() * 1000) + 100);
    car.vhr.serviceHistory.push({
                                  date: moment().format('MM/DD/YYYY'), 
                                  repair: repair[1],
                                  cost: cost
                                })
    this.score = this.score - cost    
    this.refs.toast.show("Your "+car.title+" "+repair.join(' ')+". This repair will cost $"+cost+".", 3000);
  }

  displayAccident(car, accident, isWriteOff){
    cost = Math.floor((Math.random() * 5000) + 1000)
    car.vhr.accidents.push({
                            date: moment().format('MM/DD/YYYY'), 
                            accident: accident,
                            cost: cost
                          })
    message = ""
    if(isWriteOff){
      //car is a write off, removing it from the game
      message = "Your "+car.title+" was in an "+accident+". It was a write off."
      this.removeCarFromTrack(car.id) //killing all references
      for(i = 0; i < this.carInformation.length; i++){
        if(this.carInformation[i].id == car.id){
          //found the index, removing it from the array
          this.carInformation.splice(i, 1);
        }
      }
    } else {
      this.score = this.score - cost
      message = "Your "+car.title+" was in an "+accident+". Repairs will cost you $"+cost+"."
    }
    this.refs.toast.show(message, 3000);
  }

  addNewCar(car){
    this.carsOnTrack.push( new Car(0, 
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
    return (
      <GameLoop 
        style={styles.container} 
        onUpdate={() => this.setState({components : this.updateCars()})}>
          <Toast 
            ref="toast"
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}  
            style={{margin: 20}}
          />
          <ScoreBoard 
            toast={this.refs.toast}
            score={this.score} 
            mileage={this.totalLaps} 
            removeCar={(id) => this.removeCarFromTrack(id)} 
            addNewCar={(car) => this.addNewCar(car)} 
            cars={this.carInformation}
            requiredPoints={this.requiredPointForNewCar}
            payForCar={(score) => this.addToScore(score)}
          />
          {this.state.components.map(data =>
            <View 
              key={this.key++} 
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