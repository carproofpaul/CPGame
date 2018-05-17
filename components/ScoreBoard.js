import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View, Text, Image, Button, Alert, TouchableOpacity} from "react-native";
import { GameLoop } from "react-native-game-engine";
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from './Car';
import GridView from 'react-native-super-grid';
import VehicleHistoryReportModal from './VehicleHistoryReport/VehicleHistoryReportModal';
import VechicleHistoryReport from './VehicleHistoryReport/VehicleHistoryReport';
import {Card} from 'react-native-elements';


export default class ScoreBoard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            mileage: 0,
            cars: this.props.cars,
            carInformation: null,
            modalVisible: false,
            vhr: new VechicleHistoryReport({
                vin: null,
                bodyStyle: null,
                countryOfAssembly: null,
                cylinders: null,
                fuelType: null,
                yearMakeModel: null
            }),
            data: null,
        };
        this.carInformationTobeUpdated = null
        
    }

    componentDidUpdate(){
        this.showCarInformation(this.carInformationTobeUpdated)
        this.setState({
            score: this.props.score,
            mileage: this.props.mileage
        })
    }

    addNewCarToTrack(car){
        index = this.state.cars.indexOf(car)
        this.props.addNewCar(car)
        arr = this.state.cars
        arr[index].isOnTrack = true
        this.carInformationTobeUpdated = car
    }

    onPressCar(car){
        index = this.state.cars.indexOf(car)
        if(car.upgradeAvailable){
            Alert.alert(
                'Upgrade Available',
                "Do you want to upgrade this car's speed to by 10% for $" + (car.price/10).toFixed(2) +"?",
                [
                {text: 'Yes', onPress: () => {
                    if(car.price/10 > this.state.score){
                        this.props.toast.show("Sorry, you don't have enough money.", 3000)
                        return
                    }
                    this.props.payForCar(car.price/10) //paying for car
                    car.speed = car.speed + car.speed*0.1 // +10%
                    car.upgradeAvailable = false
                }},
                {text: 'No', onPress: () => {

                }},
                ],
                { cancelable: false }
            )
        } else if(car.isOnTrack == null){
            //available for purchase
            Alert.alert(
                'Available for purchase',
                'Do you want to buy this ' + car.title + " for $" + car.price +"?",
                [
                {text: 'Yes', onPress: () => {
                    if(car.price > this.state.score){
                        this.props.toast.show("Sorry, you don't have enough money.", 3000)
                        return
                    }
                    this.addNewCarToTrack(car)
                    this.props.payForCar(car.price * -1) //paying for car
                    this.setState({items : arr})
                }},
                {text: 'No', onPress: () => {

                }},
                ],
                { cancelable: false }
            )
        } else if(car.isOnTrack == false){
            this.addNewCarToTrack(car)
        } else {
            arr[index].isOnTrack = false
            this.carInformationTobeUpdated = car
            this.props.removeCar(car.id) //removed from track
        }
    }

    showCarInformation(car){
        this.carInformationTobeUpdated = car
        if(this.carInformationTobeUpdated == null) return
        accidents = ""
        if(car.vhr.accidents.length == 0){
            accidents = 'No accidents'
        } else {
            accidents = "Accident Report:\n"
            accidents = accidents + car.vhr.accidents.join('\n')
        }
        this.carOnDisplay = car
        this.component = 
        <TouchableOpacity onPress={() => {
                    this.setState({
                        vhr: car.vhr,
                        data: car,
                        modalVisible: true
                    })
                }}>
            <Card wrapperStyle={styles.card}>
                <Text style={styles.title}>{car.title}</Text>
                <Text style={styles.subTitle}>{car.mileage} km</Text>
                <Text style={styles.subTitle}>Value: ${this.addCommas(car.price.toFixed(2))}</Text>
                <Text style={{fontSize: 10, fontStyle: 'italic', textAlign: 'center', marginTop: 5}}>click here to view the vehicle history report</Text>
            </Card>
        </TouchableOpacity>
    }

    getCarIconColour(car){
        if(car.upgradeAvailable) return '#adccff' //baby blue
        else if(car.isOnTrack == null) return '#d81c00' //red
        else if(car.isOnTrack) return '#efefef' //grey
        else return '#000000' //black
    }

    getTotalAssets(){
        total = 0
        for(i = 0; i < this.state.cars.length; i++){
            if(this.state.cars[i].isOnTrack != null){
                total = total + this.state.cars[i].price;
            }
        }
        return total
    }

    showVehicleHistoryReport(car){
        //NOT_USED
        this.vhr = car.vhr
        Alert.alert(
            'Vehicule History Report',
            car.vhr.reportSummary(),
            [
            {text: 'View Complete VHR', onPress: () => this.setState({modalVisible: true})},
            ],
            { cancelable: true }
        )
    }

    render() {
        if(this.props.requiredPoints != -1) nextCar = '$' + this.addCommas(this.props.requiredPoints) + " to buy next car"
        else nextCar = ""
        return (
            <View style={styles.container}>
                <VehicleHistoryReportModal vhr={this.state.vhr} data={this.state.data} modalVisible={this.state.modalVisible} onClose={() => this.setState({modalVisible: false})}/>
                <Card wrapperStyle={styles.card}>
                    <Text style={styles.title}>${this.addCommas(this.state.score.toFixed(2))}</Text>
                    <Text style={styles.subTitle}>{this.state.mileage} km</Text>
                    <Text style={styles.subTitle}>{nextCar}</Text>
                    {/* <Text>total assets: ${this.addCommas(this.getTotalAssets().toFixed(2))}</Text> */}
                </Card>
                <GridView
                        style={styles.gridView}
                        itemDimension={50}
                        items={this.state.cars}
                        renderItem={
                            (item) =>  (
                                            <IconButton 
                                                onPress={() => this.onPressCar(item)} 
                                                onLongPress={() => {
                                                    this.setState({
                                                        vhr: item.vhr,
                                                        data: item,
                                                        modalVisible: true
                                                    })
                                                }} 
                                                name='car' 
                                                size={50} 
                                                color={this.getCarIconColour(item)}
                                            />
                                        )
                        }
                />
                {this.component}
            </View>
        );
    }

    addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 20,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor:'#fcfcfc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
    },
    carContainer: {
        flex : 1,
        position: "absolute",
        backgroundColor:'transparent'
    },
    card : {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'center',
    },
});
