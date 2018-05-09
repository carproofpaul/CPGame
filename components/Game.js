import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import ScoreBoard from './ScoreBoard';

export default class Game extends PureComponent {
  constructor() {
    super();
    this.key = 0
    this.score = 0
    this.totalLaps = 0
    this.id = 0;

    this.carInformation = [
      {
        title: '2015 Toyota Corolla CE',
        speed : 17,
        score : 5,
        mileage : 105000,
        price : 13560,
        accidents : [],
        isOnTrack : false,
        id: this.id++,
      },
      {
        title: '2009 Toyota Matrix XR',
        speed : 21,
        score : 7,
        mileage : 210000,
        price : 6890,
        accidents : [],
        isOnTrack : false,
        id: this.id++,
      },
      {
        title: '2011 Toyota Yaris',
        speed : 15,
        score : 5,
        mileage : 150000,
        price : 9459,
        accidents : [],
        isOnTrack : false,
        id: this.id++,
      },
      {
        title: '2017 Toyota Camry V6',
        speed : 26,
        score : 13,
        mileage : 15788,
        price : 26955,
        accidents : [],
        isOnTrack : false,
        id: this.id++,
      },
    ]

    this.carsOnTrack = [ ]

    /*
    //array of cars
    this.carsOnTrack = [
      new Car(0, 0, 'RIGHT', 7, (score) => this.addToScore(score), 23, (laps) => this.addToLap(laps)),
      new Car(0, 0, 'RIGHT', 8, (score) => this.addToScore(score), 56, (laps) => this.addToLap(laps)),
      new Car(0, 0, 'RIGHT', 9, (score) => this.addToScore(score), 65, (laps) => this.addToLap(laps)),
    ]
    */

    //state{ car }
    this.state = {
      components : []
    };

  }

  //callback
  addToScore(score){
    this.score = this.score + score
  }

  addToLap(laps){
    this.totalLaps = this.totalLaps + laps
  }

  removeCarFromTrack(id){
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

  addNewCar(car){
    this.carsOnTrack.push( new Car(0, 
                            0, 
                            'RIGHT', 
                            (score) => this.addToScore(score), 
                            (laps) => this.addToLap(laps), 
                            car
                            )
                  )
  }



  render() {
    return (
      <GameLoop style={styles.container} onUpdate={() => this.setState({components : this.updateCars()})}>
        <ScoreBoard score={this.score} mileage={this.totalLaps} removeCar={(id) => this.removeCarFromTrack(id)} addNewCar={(car) => this.addNewCar(car)} cars={this.carInformation}/>
        {this.state.components.map(data =>
          <View key={this.key++} style={[styles.carContainer, data]}>
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
