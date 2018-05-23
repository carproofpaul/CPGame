import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration, Dimensions, Image, Modal, Alert, ActivityIndicator} from 'react-native';

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
      this.camera.takePictureAsync().then(data => {
        this.setState({image: data.uri})
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

  makeCall(data){
    /*** TODO: Add binary stream for uploading images
    
    //var image = {image: "https://i1.wp.com/wildsau.ca/wp-content/uploads/2013/06/front-quarter_.jpg?fit=1280%2C853"};

    var xmlhttp = new XMLHttpRequest();
    var result;

    console.log(data)

    xmlhttp.onreadystatechange = (function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            result = xmlhttp.responseText;
            json = JSON.parse(result)

            console.log(json);
            
            Alert.alert(
                'Car Detected',
                'License Plate: ' + json.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name + "\n" +
                'Make: '+ json.objects[0].vehicleAnnotation.attributes.system.make.name + "\n" +
                'Model: '+ json.objects[0].vehicleAnnotation.attributes.system.model.name + "\n" +
                'Colour: '+ json.objects[0].vehicleAnnotation.attributes.system.color.name + "\n",
                [
                  {text: 'OK', onPress: () => this.setState({image: null})},
                ],
                { cancelable: true }
            )

        } else {
        console.log(xmlhttp)
        }
    }).bind(this)

    xmlhttp.open("POST", "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate");
    xmlhttp.setRequestHeader("Content-type", "application/octet-stream");
    xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");
    xmlhttp.send(data);

    ***/
  }

  render() {
    if(this.state.image != null) {
      this.makeCall(this.state.image)
      return(
        <Image 
          style={{flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width}} 
          source={{uri: this.state.image}}
        />
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