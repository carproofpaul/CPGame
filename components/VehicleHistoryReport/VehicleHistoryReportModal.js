import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal, ScrollView } from "react-native";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from '../Car';
import {ListItem, Divider} from 'react-native-elements';
import AccidentsDamage from './details/AccidentsDamage';
import ServiceHistory from './details/ServiceHistory';
import LienRecords from './details/LienRecords';
import CanadianRegistration from './details/CanadianRegistration';
import StolenStatus from './details/StolenStatus';
import UsHistory from './details/UsHistory';
import Recalls from './details/Recalls';
import TrueValue from './details/TrueValue';
import VehicleOverview from './details/VehicleOverview';


const list = [
                {
                    title: 'Vehicle Overview',
                    icon: 'find-in-page',
                },
                {
                    title: 'Accident/Damage Reports',
                    icon: 'library-books',
                },
                /*
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
                */
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
    this.trueValue = <TrueValue data={this.props.data} onClose={() => this.setState({content: null})}/>
    this.details = [
        <VehicleOverview data={this.props.data} onClose={() => this.setState({content: null})}/>,
        <AccidentsDamage data={this.props.vhr} onClose={() => this.setState({content: null})}/>, /*
        <LienRecords data={this.props.vhr.lienRecords} onClose={() => this.setState({content: null})}/>,
        <CanadianRegistration data={this.props.vhr.canadianRegistration} onClose={() => this.setState({content: null})}/>,
        <StolenStatus data={this.props.vhr.isStolen} onClose={() => this.setState({content: null})}/>,
        <UsHistory data={this.props.vhr.usHistory} onClose={() => this.setState({content: null})}/>,
        <Recalls data={this.props.vhr.recalls} onClose={() => this.setState({content: null})}/>, */
        <ServiceHistory data={this.props.vhr.serviceHistory} onClose={() => this.setState({content: null})}/>,         
    ];
  }

    render() {
        //if(this.props.modalVisible) console.log(this.props.vhr);
        const data = 
            this.state.content || 
            <ScrollView style={{flex: 1}}>
                <IconButton
                    style={{margin: 15}}
                    size={30}
                    onPress={() => this.props.onClose()}
                    name='chevron-down' 
                />
                <Text style={{fontSize: 20, marginLeft: 15, fontWeight: 'bold'}}>Vehicle History Report</Text>
                <Divider style={{ backgroundColor: 'black', margin: 15 }} />
                <ListItem
                    title={'CARPROOF TRUE VALUE'+'\u2122'}
                    leftIcon={{ name: 'account-circle' }}
                    chevron={true}
                    onPress={() => this.setState({content: this.trueValue})}
                />
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
            </ScrollView>

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
