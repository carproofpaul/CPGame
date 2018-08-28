import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, AsyncStorage, ActivityIndicator } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import ScoreBoard from './ScoreBoard';
import VechicleHistoryReport from './VehicleHistoryReport/VehicleHistoryReport';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment';
import CameraScreen from './VisualVehicleReport/CameraScreen';


export default class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.saveCounter = 0 //no need to save this
    this.first = true

    this.clock = 1527180255
    this.timer = 0

    //load previous game
    this.loadGame()
    
    //state{ components }
    this.state = {
      ready : false,
      camera : false,
      components : []
    };

  }

  async loadGame() {
    //checking if there's a saved game, if no, load default starter
    try {
      const gameData = await AsyncStorage.getItem('@CPGame:game');
      if(gameData != null){
        gameData = JSON.parse(gameData) //converting back
        //load componenets
        console.log("Loading previous game")
        this.key = gameData[0]
        this.score = gameData[1]
        this.totalLaps = gameData[2]
        this.id = gameData[3]
        this.carInformation = gameData[4].slice()
        for(i = 0; i < this.carInformation.length; i++){
          //removing cars from track
           if(this.carInformation[i].isOnTrack == true) this.carInformation[i].isOnTrack = false
        }
        console.log(this.carInformation)
        
        this.newCars = gameData[5].slice()
        //this.carsOnTrack = gameData[6]
        this.carsOnTrack = []
        this.requiredPointForNewCar = gameData[7]

      } else {
        //loading default beginning
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Touring',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Sport',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Touring',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Sport',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Touring',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Sport',
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
            upgradeAvailable : false, 
            id: this.id++,
            vhr: new VechicleHistoryReport({
              vin: '2T1KU40E19C034127',
              bodyStyle: 'Luxury',
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
            upgradeAvailable : false, 
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
      }

      this.setState({ready: true})
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveGame() {
    /**
     * Storing game data in async storage
     */
    gameData = []
    gameData.push(this.key)
    gameData.push(this.score)
    gameData.push(this.totalLaps)
    gameData.push(this.id)
    gameData.push(this.carInformation)
    gameData.push(this.newCars)
    gameData.push(this.carsOnTrack)
    gameData.push(this.requiredPointForNewCar)

    try {
      await AsyncStorage.setItem('@CPGame:game', JSON.stringify(gameData));
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  componentWillUpdate(){
    if(this.saveCounter++ == 50){
      this.saveGame()
      this.saveCounter = 0
    }
  }
  
  componentWillUnmount(){
    for(i = 0; i < this.carsOnTrack.length; i++){
      this.carsOnTrack[i].delete() //kill      
    }
  }

  //callback
  addToScore(score){
    this.score = this.score + score
    if(this.requiredPointForNewCar != -1 && this.score > this.requiredPointForNewCar) this.userBoughtNewCar()
  }

  userBoughtNewCar(){
    if(this.newCars.length == 0) return; //no new cars
    this.refs.toast.show('New Car Available', 2000);
    unsoldCar = this.newCars.shift()
    unsoldCar.isOnTrack = null
    this.carInformation.push(unsoldCar) //storing it for later
    if(this.newCars.length != 0) this.requiredPointForNewCar = this.newCars[0].price
    else this.requiredPointForNewCar = -1
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
                                  date: moment(moment.unix(this.clock)).format('MM/DD/YYYY'), 
                                  repair: repair[1],
                                  cost: cost,
                                  odometer: car.mileage
                                })
    this.score = this.score - cost    
    this.refs.toast.show("Your "+car.title+" "+repair.join(' ')+". This repair will cost $"+cost+".", 3000);
  }

  displayAccident(car, accident, isWriteOff){
    cost = Math.floor((Math.random() * 5000) + 1000)
    car.vhr.accidents.push(
                            {
                              date: moment(moment.unix(this.clock)).format('MM/DD/YYYY'), 
                              accident: accident,
                              cost: cost,
                              odometer: car.mileage
                            }
                          )
    car.price = car.price - cost/2
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
                            (message) => this.refs.toast.show(message, 2000),
                            car
                            )
                  )
  }

  firstOpenCamera(){
    Alert.alert(
      'Import a Real Car',
      'You can import a real car into this game by taking a picture of one with the license plate visible.',
      [
        {text: 'OK', onPress: () => {
          this.first = false
          this.setState({camera: true})
        }},
        {text: 'Cancel', onPress: null, style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  getImage(){
    Alert.alert(
      '',
      'Do you want to use your camera or gallery?',
      [
        {text: 'Use Camera', onPress: () => this.setState({camera: true}) },
        {text: 'Use Gallery', onPress: () => this._pickImage() },
      ],
      { cancelable: true }
    )
  }

  render() {
    this.clock = this.clock + 100 //update unix time    
    
    if(this.state.ready == false){
      return(
        <View>
           <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else if(this.state.camera == true){
      return(
        <CameraScreen  onBack={() => this.setState({camera: false})} insertNewCar={(car) => { 
          this.carInformation.push(car) 
        }}/>
      );
    }
    return (
      <GameLoop 
        style={styles.container} 
        onUpdate={() => this.setState({components : this.updateCars()})}>
          <View style={styles.iconContainer}>
            <IconButton
              size={20}
              onPress={() => this.props.onBack()}
              name='arrow-left' 
            />
            <IconButton
              size={20}
              onPress={ () => this.first ? 
                              this.firstOpenCamera() : 
                              this.setState({camera: true})
                      }
              name='camera' 
            />
          </View>
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
  iconContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 10,
    backgroundColor:'transparent',
  },
  container: {
    flex: 1,
    backgroundColor:'#fcfcfc',
    justifyContent: 'space-between'
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