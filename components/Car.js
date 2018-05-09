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

export default class Car  {
  constructor(xOffset, yOffset, direction, callbackScore, callbackLap, info){
    this.info = info //info of the car: speed, score, mileage, price, and accidents(array)
    this.y = (yOffset + TOP_BUFFER) || TOP_BUFFER
    this.x = (xOffset + LEFT_BUFFER) || LEFT_BUFFER
    this.callbackScore = callbackScore //callback for notifying game of an event (e.g adding score every second)
    this.callbackLap = callbackLap //callback to notify the game of an new lap
    this.laps = 0

    this.direction = {
      up:     {value: false, tag: 'UP'},
      down:   {value: false, tag: 'DOWN'},
      left:   {value: false, tag: 'LEFT'},
      right:  {value: false, tag: 'RIGHT'}
    }

    this.setDirection(direction || 'RIGHT') //'RIGHT' is default

    this.timer = setInterval(() => this.callbackScore(this.info.score/10 || .1), 100); //callback every second/10 (Keeping a reference to be deleted later)
  }

  delete(){
    //destroy all references/callbacks
    this.callbackScore = null
    this.callbackLap = null
    clearInterval(this.timer) //clearing timer
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

  checkBoundary () {
    if(this.y <= TOP_BUFFER && this.getDirection() == 'UP'){
      this.setDirection('RIGHT')
      this.laps++ //adding a lap
      this.callbackLap(1)
      this.info.mileage++
    }
    if(this.x >= RIGHT_BUFFER && this.getDirection() == 'RIGHT'){
      this.setDirection('DOWN')
    }
    if(this.y >= BOTTOM_BUFFER && this.getDirection() == 'DOWN'){
      this.setDirection('LEFT')
    }
    if(this.x <= LEFT_BUFFER && this.getDirection() == 'LEFT'){
      this.setDirection('UP')
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
