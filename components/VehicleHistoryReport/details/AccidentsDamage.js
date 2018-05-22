import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, Modal, ScrollView } from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem, Divider} from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

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
            ['02/28/2007', 'Caledon, Ontario', 'Police Report', 'Right front corner'],
            ['04/25/2010', 'Guelph, Ontario', 'Police Report', 'Left rear corner'],
        ]
    }

    this.accidents = {
        tableHead: ['Incident Date', 'Estimate Location', 'Estimate Date', 'Type of Record', 'Detail', 'Amount', 'Odometer'],
        tableData: [
            ['02/28/2007', 'Caledon, Ontario', '03/03/2007', 'Estimate', 'Right front corner', '$2,305', '12,223 km'],
            ['04/25/2010', 'Guelph, Ontario', '04/30/2010', 'Estimate', 'Left rear corner', '$3,345', '15,623 km'],
        ]
    }

    this.insurance = {
        tableHead: ['Incident Date', 'Incident Location', 'Type of Record', 'Detail', 'Amount', 'Odometer'],
        tableData: [
            ['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '$2,305', '12,223 km'],
            ['04/25/2010', 'Guelph, Ontario', 'Estimate', 'Left rear corner', '$3,345', '15,623 km'],
        ]
    }

    this.other = {
        tableHead: ['Incident Date', 'Incident Location', 'Type of Record', 'Detail', 'Odometer'],
        tableData: [
            ['02/28/2007', 'Caledon, Ontario', 'Estimate', 'Right front corner', '12,223 km'],
            ['04/25/2010', 'Guelph, Ontario', 'Estimate', 'Left rear corner', '15,623 km'],
        ]
    }



    this.state = {
        imgWidth: 0,
        imgHeight: 0,
    };
  }


  componentDidMount() {
    Image.getSize('https://reports.carproof.com/Content/Report/Headers/Accidents/2_en.png', (width, height) => {
      // calculate image width and height 
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
    })
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

    return(
    <View style={styles.container}>
        <IconButton
            size={30}
            onPress={() => this.props.onClose()}
            name='chevron-down' 
        />
        {
            component ||
            <ScrollView>
                <View style={styles.inner}>
                    <Image 
                        style={{width: imgWidth-30, height: imgHeight}} 
                        resizeMode='contain'
                        source={{uri: 'https://reports.carproof.com/Content/Report/Headers/Accidents/2_en.png'}}
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
                                <Row data={this.insurance.tableHead}  style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.insurance.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
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
    margin: 15
  },
  inner: {
    alignItems: 'center',
    flex : 1,
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
