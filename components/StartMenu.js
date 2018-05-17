import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Alert, Modal, TouchableHighlight, AsyncStorage } from "react-native";
import { GameLoop } from "react-native-game-engine";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Game from './Game';
import Tutorial from './Tutorial';


export default class StartMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        buttons : null,
        play: false,
        tutorial: false,
    };

    this.isPreviousGameAvailable()
  }

  async isPreviousGameAvailable(){
    data = await AsyncStorage.getItem('@CPGame:game')
    if(data != null){
        console.log("YES")
        //yes
        this.setState({
            buttons:
            <View>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.setState({play: true})}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>CONTINUE GAME</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() =>{
                        AsyncStorage.clear() //clearing prev game data
                        this.setState({play: true})
                    }}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>NEW GAME</Text>
                </TouchableHighlight>
            </View>
        })            
    } else {
        this.setState({
            buttons:
                <View>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => this.setState({play: true})}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>PLAY</Text>
                    </TouchableHighlight>
                </View>   
        })  
    }
  }



  render() {
    if(this.state.play) component = <Game onBack={() => this.setState({play: false})}/>
    if(this.state.tutorial) component = <Tutorial onBack={() => this.setState({tutorial: false})}/>
      
    if(this.state.buttons == null){
        return( <View></View>)
    } else if(this.state.play || this.state.tutorial){
        return(
            <Modal
                animationType="slide"
                visible={true}
                onRequestClose={() => this.setState({play: false})}>
                    {component}
            </Modal>
        )
    } else {
        return(
            <Modal
              animationType="slide"
              visible={true}
              onRequestClose={() => null}>
              <View style={{margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{margin: 10, height: 50, width: 207.5}}
                     source={{uri: 'https://www.carproof.com/public/images/CARPROOFlogo-primary_flat.png'}}
                />
                {this.state.buttons}
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.setState({tutorial: true})}
                    underlayColor='#fff'>
                    <Text style={styles.submitText}>TUTORIAL</Text>
                </TouchableHighlight>
              </View>
            </Modal>
        )
    }
  }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin: 15
  },
  submit:{
    width: 207.5,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#e50b10',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 20,
  }
});
