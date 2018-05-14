import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import {ListItem} from 'react-native-elements';

const list = [
    {
        title: 'Accident/Damage Reports',
        icon: 'library-books',
    },
    {
        title: 'Lien Records',
        icon: 'trending-down',
    },
    {
        title: 'Canadian Registration',
        icon: 'people',
    },
    {
        title: 'Stolen Status',
        icon: 'cancel',
    },
    {
        title: 'U.S. History',
        icon: 'flag',
    },
    {
        title: 'Recalls',
        icon: 'new-releases',
    },
    {
        title: 'Service History',
        icon: 'search',
    },       
];


export default class VehicleHistoryReportModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
    
  }
/*
  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => this.props.onClose()}>
            <IconButton 
                style={{margin: 10}}
                onPress={() => this.props.onClose()} 
                name='chevron-down' 
                size={35} 
            />
            <View style={styles.buttonLayoutContainer}>
                <OptionButton
                    onPress={() => null}
                    iconName={'wrench'}
                    text={'Accident/Damage Reports'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'trending-down'}
                    text={'Lien Records'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'account'}
                    text={'Canadian Registration'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'cancel'}
                    text={'Stolen Status'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'flag'}
                    text={'U.S. History'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'bullhorn'}
                    text={'Recalls'}
                />
                <OptionButton
                    onPress={() => null}
                    iconName={'search-web'}
                    text={'Service History'}
                />
            </View>
        </Modal>
    );
  }
*/

  render() {
      return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.onClose()}>
        <View>
            {
                list.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon }}
                    onPress={() => console.log(i)}
                />
                ))
            }
        </View>
      </Modal>        
      )
  }

}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 50,
    flex: 1,
  },

  buttonLayoutContainer : {
    flex : 1,
    flexDirection: 'column',
    alignItems: 'center',
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
