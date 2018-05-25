import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration, Dimensions, Image, Modal, Alert, ActivityIndicator} from 'react-native';
import ImageTools from 'react-native-image-tool';
import Loader from '../Loader';
import { Token } from '../../resources/Token';
import CreateCar from './CreateCar';


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    permissionsGranted: null,
    ratio: '16:9',
    image: null,
    loading: false,
    createCarModal: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true}).then(data => {
        console.log("takePictureAsync")
        this.setState({image: data})
        this.makeCall(data)
        Vibration.vibrate();
      });
    }
  };

  renderNoPermissions() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  }

  renderCamera() {
    return (
      <Modal
        animationType="fade"
        visible={true}
        onRequestClose={() => this.props.onBack()}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
            }}
            type={this.state.type}
            flashMode={this.state.flash}
            autoFocus={this.state.autoFocus}
            zoom={this.state.zoom}
            whiteBalance={this.state.whiteBalance}
            ratio={this.state.ratio}
            focusDepth={this.state.depth}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: Constants.statusBarHeight / 2,
              }}>
              <TouchableOpacity style={styles.flipButton} onPress={() => this.props.onBack()}>
                <Icon name='arrow-left' size={25} color='#fff'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                <Text style={styles.flipText}> FLIP </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}>
              <TouchableOpacity
                style={[styles.flipButton, styles.picButton, { position: 'absolute', left: Dimensions.get('window').width/2-50, bottom: 20 }]}
                onPress={this.takePicture.bind(this)}>
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </Camera>
      </Modal>
    );
  }

  displayResults(car){
    Alert.alert(
      'Car Detected',
      'Average Value: $' + ((car.MinValuation+car.MaxValuation)/2).toFixed(2) + "\n" +
      'VIN: ' + car.Vin + "\n" +
      'Year: ' + car.VehicleYear + "\n" +
      'Make: ' + car.VehicleMake + "\n" +
      'Model: ' + car.VehicleModel + "\n" +
      'Trim: ' + car.VehicleTrim + "\n" +
      'Drive Train: ' + car.VehicleDrivetrainEnglishText + "\n" +
      'Body Style: ' + car.VehicleBodyStyleEnglishText,
      [
        {text: 'OK', onPress: () => this.setState({image: null})},
      ],
      { cancelable: false }
    )
  }

  displayError(error){
    Alert.alert(
      'Error',
      error,
      [
        {text: 'OK', onPress: () => this.setState({image: null})},
      ],
      { cancelable: false }
    )
  }

  getValueRange(vin){
    var xmlhttp = new XMLHttpRequest();
    var result;
    
    xmlhttp.onreadystatechange = (function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        //DATA
        console.log(xmlhttp.responseText)
        this.car = JSON.parse(xmlhttp.responseText)
        
        if(this.car.ResultCode === 1){
          //this.displayResults(this.car)
          this.setState({createCarModal: true})
        } else {
          this.displayError(this.car.ResultMessage)
        }

        //Stop Loader
        this.setState({loading: false})
      } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
        //ERROR
        console.log(xmlhttp)
        this.setState({loading: false})
      }
    }).bind(this)
    
    xmlhttp.open("GET", "http://apivaluationwebservice.carproof.com/ValuationRange/GetRetailValuationRange?vin="+vin, true);
    xmlhttp.setRequestHeader("webServiceToken", Token._webServiceToken);

    xmlhttp.send();

  }

  getVIN(licensePlate){

    var xmlhttp = new XMLHttpRequest();
    var result;

    console.log("GETTING VIN FOR " + licensePlate)
    
    xmlhttp.onreadystatechange = (function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        //DATA
        console.log(xmlhttp.responseText)
        json = JSON.parse(xmlhttp.responseText)

        //if VIN array empty, display error and return
        if(json.QuickVINPlus.VINInfo.VIN.length == 0){
          this.displayError("No VIN found, please only use vehicles registered in Canada.")
          return
        } 
        this.additionalInfomation = json.QuickVINPlus.VINInfo.CarFaxVINDecode.Trims[0]
        this.getValueRange(json.QuickVINPlus.VINInfo.VIN[0]) //VIN
      } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
        //ERROR
        console.log(xmlhttp)
        this.setState({loading: false})
      }
    }).bind(this)
    
    xmlhttp.open("GET", "http://carfaxapi.carproof.com/api/QuickVIN?licensePlate="+licensePlate+"&province=on", true);
    xmlhttp.setRequestHeader("User-Agent", "request");
    xmlhttp.setRequestHeader("webServiceToken", Token._webServiceToken);

    xmlhttp.send();

  }

  getCarData(url){
    var image = {image: url};
    var xmlhttp = new XMLHttpRequest();
    var result;
    
    xmlhttp.onreadystatechange = (function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        result = JSON.parse(xmlhttp.responseText);

        if(result.objects.length == 0){
          this.displayError("No car found.")
          return
        } else if(result.objects[0].vehicleAnnotation.recognitionConfidence === 0){
          this.displayError("Recognition confidence is zero.")
          return
        }

        

        licensePlate = ''
        make = ''
        color = ''
        confidence = ''
        try{ licensePlate = result.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name } 
        catch(error) { licensePlate = 'Not Found' }

        try{ make = result.objects[0].vehicleAnnotation.attributes.system.make.name }
        catch(error){ make = 'Not Found' }

        try{ model = result.objects[0].vehicleAnnotation.attributes.system.model.name }
        catch(error){ model = 'Not Found' }
        
        try{ color = result.objects[0].vehicleAnnotation.attributes.system.color.name }
        catch(error){ color = 'Not Found'  }

        try{ confidence = result.objects[0].vehicleAnnotation.recognitionConfidence}
        catch(error){ confidence = 'Not Found'  }

        console.log("License plate: " + licensePlate)
        
        if(licensePlate !== 'Not Found'){
          this.getVIN(licensePlate)
        } else {
          this.displayError("License plate cannot be read.")
        }


        this.backupCar = {
          licensePlate: licensePlate,
          make: make,
          model: model,
          color: color,
          confidence: confidence
        }


      }
    }).bind(this)
    
    xmlhttp.open("POST", "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");
    xmlhttp.send(JSON.stringify(image));
  }

  makeCall(file){

    this.setState({loading: true})

    var fd = new FormData();
    var xmlhttp = new XMLHttpRequest();
    var result;
    
    xmlhttp.onreadystatechange = (function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        result = JSON.parse(xmlhttp.responseText);
        this.getCarData(result.url)
      } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
        console.log(xmlhttp)
        //this.displayError(xmlhttp)
      }
    }).bind(this)
    
    xmlhttp.open("POST", "https://api.cloudinary.com/v1_1/dlic95ed5/image/upload", true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
    xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");

    fd.append('upload_preset', 'tqcsiwue');
    fd.append('file', {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'file',
    });
    xmlhttp.send(fd);

  }

  render() {
    if(this.state.image != null) {
      return(
        <View style={{flex: 1}}>
          <CreateCar 
            insertNewCar={(car) => this.props.insertNewCar(car)} 
            visible={this.state.createCarModal} 
            additionalInformation={this.additionalInfomation} 
            car={this.car} 
            onClose={() => {
              this.setState({createCarModal: false})
              this.props.onBack()
            }}/>
          <Loader loading={this.state.loading}/>
          <Image 
            style={{flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width}} 
            source={{uri: this.state.image.uri}}
          />
        </View>
      );
    }

    if(this.state.permissionsGranted == true) cameraScreenContent = this.renderCamera()
    else if(this.state.permissionsGranted == false) cameraScreenContent = this.renderNoPermissions()
    else cameraScreenContent = <Text>Loading</Text>    

    return <View style={styles.container}>{cameraScreenContent}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    width: 100,
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});