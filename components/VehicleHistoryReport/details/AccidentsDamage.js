import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal, ScrollView } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from 'moment';

const list = [
    {
        title: 'Accident/Damage Reports',
        icon: 'library-books',
    },    
];


export default class AccidentsDamage extends PureComponent {
  constructor(props) {
    super(props);

    this.police = {
        tableHead: ['Incident Date', 'Estimate Location', 'Type of Record', 'Detail'],
        tableData: [
           // ['02/28/2007', 'Caledon, Ontario', 'Police Report', 'Right front corner'],
        ]
    }

    this.loadPoliceReportData()

    this.accidents = {
        tableHead: ['Incident Date', 'Estimate Location', 'Estimate Date', 'Type of Record', 'Detail', 'Amount', 'Odometer'],
        tableData: []
    }

    this.loadAccidentData()

    this.insurance = {
        tableHead: ['Incident Date', 'Incident Location', 'Type of Record', 'Detail', 'Amount', 'Odometer'],
        tableData: [
            //['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '$2,305', '12,223 km'],
        ]
    }

    this.loadInsuranceClaims()

    this.other = {
        tableHead: ['Incident Date', 'Incident Location', 'Type of Record', 'Detail', 'Odometer'],
        tableData: [
            //['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '12,223 km'],
        ]
    }

    this.loadOtherReports()



    this.state = {
        imgWidth: 0,
        imgHeight: 0,
    };
  }

  loadPoliceReportData(){
    if(this.props.data.accidents.length == 0){
        this.police.tableData.push(
            [
                'No police reported accidents found', 
                '', 
                '', 
                ''
            ]       
        )
    } else {
        for(i = 0; i < this.props.data.accidents.length; i++){
            this.police.tableData.push(
                [
                    moment(moment(this.props.data.accidents[i].date, 'MM/DD/YYYY').add(2, 'days')).format('MM/DD/YYYY'), 
                    'Caledon, Ontario', 
                    'Police Record',
                    this.props.data.accidents[i].accident, 
                ]
                // ['02/28/2007', 'Caledon, Ontario', 'Police Report', 'Right front corner'],
            )
        }
    }
  }

  loadAccidentData(){
    if(this.props.data.accidents.length == 0){
        this.accidents.tableData.push(
            [
                'No reported accidents found', 
                '', 
                '',
                '', 
                '', 
                '', 
                ''
            ]       
        )
    } else {
        for(i = 0; i < this.props.data.accidents.length; i++){
            this.accidents.tableData.push(
                [
                    this.props.data.accidents[i].date, 
                    'Caledon, Ontario', 
                    this.props.data.accidents[i].date,
                    'Estimate', 
                    this.props.data.accidents[i].accident, 
                    '$'+this.props.data.accidents[i].cost, 
                    this.props.data.accidents[i].odometer+' km'
                ]
            )
        }
    }
  }

  loadInsuranceClaims(){
    if(this.props.data.accidents.length == 0){
        this.insurance.tableData.push(
            [
                'No reported claims found', 
                '', 
                '',
                '', 
                '', 
                ''
            ]       
        )
    } else {
        //['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '$2,305', '12,223 km'],
        for(i = 0; i < this.props.data.accidents.length; i++){
            this.insurance.tableData.push(
                [
                    moment(moment(this.props.data.accidents[i].date, 'MM/DD/YYYY').add(1, 'days')).format('MM/DD/YYYY'), 
                    'Caledon, Ontario', 
                    'Estimate', 
                    this.props.data.accidents[i].accident, 
                    '$'+this.props.data.accidents[i].cost, 
                    this.props.data.accidents[i].odometer+' km'
                ]
            )
        }
    }
  }

  loadOtherReports(){
    if(this.props.data.accidents.length == 0){
        this.other.tableData.push(
            [
                'No reported claims found', 
                '', 
                '', 
                '', 
                ''
            ]       
        )
    } else {
        //['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '12,223 km'],
        for(i = 0; i < this.props.data.accidents.length; i++){
            this.other.tableData.push(
                [
                    this.props.data.accidents[i].date, 
                    'Caledon, Ontario', 
                    'Estimate', 
                    this.props.data.accidents[i].accident, 
                    '$'+this.props.data.accidents[i].cost, 
                    this.props.data.accidents[i].odometer+' km'
                ]
            )
        }
    }
  }


  componentDidMount() {
    width = 620
    height = 45
    const screenWidth = Dimensions.get('window').width
    const scaleFactor = width / screenWidth
    const imageHeight = height / scaleFactor
    this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
  }

  getRowWidths(x){
    arr = []
    for(i = 0; i < x; i++){
        arr.push(150)
    }
    return arr
  }


  render() {
    const {imgWidth, imgHeight} = this.state

    if(this.props.data.length == 0) component = <Text style={{fontStyle: 'italic', textAlign: 'center'}}>No History Available</Text>
    else component = null

    component = null //test

    console.log(this.props.data.accidents);
    

    return(
    <View style={styles.container}>
        <IconButton
            size={30}
            style={{marginHorizontal: 15, marginTop: 15, marginBottom: 5}}
            onPress={() => this.props.onClose()}
            name='chevron-down' 
        />
        {
            component ||
            <ScrollView>
                <View style={styles.inner}>
                    <Image 
                        style={{width: imgWidth-30, height: imgHeight+10}} 
                        resizeMode='contain'
                        source={require('../../../assets/header_accidents.png')}
                    />
                    <View style={{justifyContent: 'flex-start', marginBottom: 15}}>
                        <Text style={{marginTop: 10, marginBottom: 10, textAlign: 'left'}}>
                            If the vehicle has had any history of accidents, collisions or damage in either Canada or the U.S., the records are outlined in this section.
                        </Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>
                            <Text style={{fontWeight: "bold"}}>VIN: </Text>
                            <Text>{this.props.data.vehicleDetails.vin}</Text>
                        </Text>
                        { /* Police Reported Accidents */ }
                        <Text style={styles.title}>Police Reported Accidents</Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>Accidents reported by police facilities are listed below.</Text>
                        <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 0}}>
                                <Row data={this.police.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(4)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.police.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(4)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                            </Table>
                        </ScrollView>
                        { /* Accident/Damage Estimates */ }
                        <Text style={styles.title}>Accident/Damage Estimates</Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>
                            Accident estimate records are generated by collision estimating facilities from the process of estimating the amount and extent of damage to a vehicle. Estimates in some cases have associated insurance claims.
                        </Text>
                        <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 0}}>
                                <Row data={this.accidents.tableHead}  style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(7)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.accidents.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(7)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                            </Table>
                        </ScrollView>
                        { /* Insurance Claims */ }
                        <Text style={styles.title}>Insurance Claims</Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>
                            The insurance claims identified in this report do not include any medical pay-outs, damage to other vehicles, damage to property, towing, rental cars, or any other incidental damages.
                        </Text>
                        <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 0}}>
                                <Row data={this.insurance.tableHead}  style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.insurance.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                            </Table>
                        </ScrollView>
                        { /* Other Damage Records */ }
                        <Text style={styles.title}>Other Damage Records</Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>
                            Any other damage records found are listed below.
                        </Text>
                        <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 0}}>
                                <Row data={this.other.tableHead}  style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.other.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                            </Table>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        }
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  inner: {
    alignItems: 'center',
    flex : 1,
    margin: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 7
  },
  head: { height: 40 },
  text: { margin: 6 }
});
