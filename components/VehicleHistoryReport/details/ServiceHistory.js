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


export default class ServiceHistory extends PureComponent {
  constructor(props) {
    super(props);

    this.service = {
        tableHead: ['Date', 'Address', 'Data Source', 'Type of Record', 'Detail', 'Odometer'],
        tableData: []
    }

    this.createTableData()

    this.state = {
        imgWidth: 0,
        imgHeight: 0,
    };
  }
  
    createTableData(){
        if(this.props.data.length == 0){
            this.service.tableData.push(
                [
                    'No reported service found', 
                    '', 
                    '',
                    '', 
                    '', 
                    '', 
                    ''
                ]       
            )
        } else {
            for(i = 0; i < this.props.data.length; i++){
                this.service.tableData.push(
                    [
                        this.props.data[i].date, 
                        'Caledon, Ontario', 
                        'AutoMax Pre-Owned Supercentre', 
                        'Service Record', 
                        this.props.data[i].repair, 
                        this.props.data[i].odometer+' km'
                    ]
                )
            }
        }
    }


  componentDidMount() {
    width = 426
    height = 45
    const screenWidth = Dimensions.get('window').width
    const scaleFactor = width / screenWidth
    const imageHeight = height / scaleFactor
    this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
  }

  getRowWidths(x){
    arr = []
    for(i = 0; i < x; i++){
        arr.push(125) //width
    }
    return arr
  }


  render() {
    const {imgWidth, imgHeight} = this.state

    if(this.props.data.length == 0) component = <Text style={{fontStyle: 'italic', textAlign: 'center'}}>No History Available</Text>
    else component = null

    component = null //test

    console.log(this.props.data);
    

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
                        source={require('../../../assets/service_history.png')}
                    />
                    <View style={{justifyContent: 'flex-start', marginBottom: 15}}>
                        { /* Service History */ }
                        <Text style={styles.title}>Service History</Text>
                        <Text style={{textAlign: 'left', marginBottom: 10}}>
                            These are records of service performed on the vehicle. These are the records reported to CARPROOF when this report was run – it is possible that service has occurred that is not captured here.
                        </Text>
                        <ScrollView horizontal={true}>
                            <Table borderStyle={{borderWidth: 0}}>
                                <Row data={this.service.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
                                <Divider style={{backgroundColor: '#000'}} />
                                <Rows data={this.service.tableData}  textStyle={styles.text} widthArr={this.getRowWidths(6)}/>
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
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 15
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
