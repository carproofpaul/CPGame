import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal } from "react-native";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from '../Car';
import {ListItem, Divider} from 'react-native-elements';
import AccidentsDamage from './details/AccidentsDamage';
import ServiceHistory from './details/ServiceHistory';


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
        content: null
    };
    
  }

  componentDidUpdate(){
    this.details = [
        <AccidentsDamage data={this.props.vhr.accidents} onClose={() => this.setState({content: null})}/>,
        null,
        null,
        null,
        null,
        null,
        <ServiceHistory data={this.props.vhr.serviceHistory} onClose={() => this.setState({content: null})}/>,         
    ];
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
        //if(this.props.modalVisible) console.log(this.props.vhr);
        
        const data = 
            this.state.content || 
            <View style={{flex: 1}}>
                <IconButton
                    style={{margin: 15}}
                    size={30}
                    onPress={() => this.props.onClose()}
                    name='chevron-down' 
                />
                <Text style={{fontSize: 20, marginLeft: 15, fontWeight: 'bold'}}>Vehicle History Report</Text>
                <Divider style={{ backgroundColor: 'black', margin: 15 }} />
                <View>
                    {
                        list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            chevron={true}
                            onPress={() => this.setState({content: this.details[i]})}
                        />
                        ))
                    }
                </View>
            </View>

        return(    
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {
            if(this.state.content == null) this.props.onClose()
            else this.setState({content: null})
        }}>
            {data}
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
