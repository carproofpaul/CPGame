import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text } from "react-native";
import Game from './components/Game';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:'transparent'
  },
});
