//imports
import { Dimensions } from "react-native";

//Screen dimensions
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

//buffers 10-20% from edge
const TOP_BUFFER = (HEIGHT*0.1) - RADIUS
const BOTTOM_BUFFER = (HEIGHT*0.9) - RADIUS
const LEFT_BUFFER = (WIDTH*0.2) - RADIUS
const RIGHT_BUFFER = (WIDTH*0.8) - RADIUS
const REPAIRS = [ 
                  ['has a', 'flat tire'],
                  ['has a', 'dented bummer'],
                  ['needs a','oil change'],
                  ['has a','cracked windshield'],
                  ['needs new', 'spark plugs'],
                  ['needs new', 'head lights'],
                  ['needs new', 'brake pads'],
                  ['needs a new', 'cabin air filter'],
                  ['needs a', 'engine tune'],
                  ['needs a', 'general check up'],
                  ['needs a', 'battery/charging system check'],
                  ['needs a', 'steering/suspension check'],
                  ['needs a new', 'catalytic converter'],
                  ['needs a new', 'fuel cap'],
                  ['needs a new', 'oxygen sensor'],
                ]

const ACCIDENTS = [ 'front-end collision', 
                    'rear-end collision', 
                    'head-to-head collision']

export default class Car  {
  constructor(xOffset, 
              yOffset, 
              direction, 
              callbackScore, 
              callbackLap,  
              callbackRepair, 
              callbackAccident, 
              callbackMessage,
              info){

    this.info = info //info of the car: speed, score, mileage, price, and accidents(array)
    this.y = (yOffset + TOP_BUFFER) || TOP_BUFFER
    this.x = (xOffset + LEFT_BUFFER) || LEFT_BUFFER
    this.callbackScore = callbackScore //callback for notifying game of an event (e.g adding score every second)
    this.callbackLap = callbackLap //callback to notify the game of an new lap
    this.callbackRepair = callbackRepair //callback to display required maintenace
    this.callbackAccident = callbackAccident //callback to display an accident
    this.callbackMessage = callbackMessage //callback to display messages as a toast
    this.laps = 0

    this.upgradeProbability = 25


    this.direction = {
      up:     {value: false, tag: 'UP'},
      down:   {value: false, tag: 'DOWN'},
      left:   {value: false, tag: 'LEFT'},
      right:  {value: false, tag: 'RIGHT'}
    }

    this.setDirection(direction || 'RIGHT') //'RIGHT' is default

    //callback every second/10 (Keeping a reference to be deleted later)
    this.timer = setInterval(() => this.callbackScore(this.info.score/10 || .1), 100);

    this.maintenance = setInterval(() => {
      if(this.isMaintenaceRequired()){
        index = Math.floor((Math.random() * (REPAIRS.length-1)))
        this.callbackRepair( this.info, REPAIRS[index] )
      }
    }, 1000);

    this.accident = setInterval(() => {
      if(this.isInvolvedInAccident()){
        //isWriteOff = ( 1 == Math.floor((Math.random() * 5)+1)  )  false for now
        index = Math.floor((Math.random() * (ACCIDENTS.length-1)))
        this.callbackAccident(info, ACCIDENTS[index], false)
      }
    }, 1000);
  }

  isMaintenaceRequired(){
    //1 out of 100 chance
    return Math.floor((Math.random() * 100) + 1) == Math.floor((Math.random() * 100 ) + 1)
  }

  isInvolvedInAccident(){
    //1 out of 645 chance
    return Math.floor((Math.random() * 645) + 1) == Math.floor((Math.random() * 645) + 1)    
  }

  delete(){
    //destroy all references/callbacks
    this.callbackScore = null
    this.callbackLap = null
    this.callbackRepair = null
    this.callbackAccident = null
    clearInterval(this.timer) //clearing timers  
    clearInterval(this.maintenance) 
    clearInterval(this.accident)
  }

  move(){
    this.checkBoundary()
    this.moveCar()
  }

  getDirection() {
    //iterate through direction obj, returns when value is true
    for(var key in this.direction){
      if(this.direction[key].value == true) return this.direction[key].tag;
    }
  }

  setDirection(direction) {
    for(var key in this.direction){
      if(this.direction[key].tag == direction) this.direction[key].value = true;
      else this.direction[key].value = false;
    }
  }

  onLap(){
    //checking for upgrade 
    result = Math.floor((Math.random() * this.upgradeProbability))
    if(result == 20){
      this.upgradeProbability = this.upgradeProbability * 2
      this.callbackMessage("Upgrade Available!")
      this.info.upgradeAvailable = true;
    }

    this.laps++ //adding a lap
    this.callbackLap(1)
    this.info.mileage++
    this.info.price = this.info.price - 0.20 //20 cents per km
  }

  checkBoundary () {
    if(this.y <= TOP_BUFFER && this.getDirection() == 'UP'){
      this.setDirection('RIGHT')
      this.onLap()
    }
    if(this.x >= RIGHT_BUFFER && this.getDirection() == 'RIGHT'){
      this.setDirection('DOWN')
      this.onLap()
    }
    if(this.y >= BOTTOM_BUFFER && this.getDirection() == 'DOWN'){
      this.setDirection('LEFT')
      this.onLap()
    }
    if(this.x <= LEFT_BUFFER && this.getDirection() == 'LEFT'){
      this.setDirection('UP')
      this.onLap()
    }
  }

  moveCar() {
    const CORNER = 40
    switch (this.getDirection()) {
      case 'UP':
        this.y = this.y - this.info.speed
        break;
      case 'DOWN':
        this.y = this.y + this.info.speed
        break;
      case 'LEFT':
        this.x = this.x - this.info.speed
        break;
      case 'RIGHT':
        this.x = this.x + this.info.speed
        break;
      default:
        return undefined //error..
    }
  }
}
