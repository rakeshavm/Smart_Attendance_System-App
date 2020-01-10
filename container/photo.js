import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

import Toolbar from './toolbar';

export default class Pic extends PureComponent {
  camera = null;

  state = {
    path: null,
    cam: 'front',
  };
  async componentDidMount() {
    console.log('Phoyo');
  }

  onCapture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log('hello', data.uri);
      console.log(RNCamera.Constants);
      this.setState({path: data.uri});
    }
    // console.log(
    //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA),
    // );
  };

  switchCam = () => {
    console.log(this.state.cam);
    if (this.state.cam === 'front') this.setState({cam: 'back'});
    else this.setState({cam: 'front'});
  };

  renderCam = () => {
    return (
      <React.Fragment>
        <View>
          <RNCamera
            ref={camera => (this.camera = camera)}
            style={styles.preview}
            type={RNCamera.Constants.Type[this.state.cam]}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
        </View>
        <Toolbar onCapture={this.onCapture} switchCam={this.switchCam} />
      </React.Fragment>
    );
  };

  renderImg = () => {
    return (
      <React.Fragment>
        <Image source={{uri: this.state.path}} style={styles.preview} />
        <Text style={styles.cancel} onPress={() => this.setState({path: null})}>
          Cancell
        </Text>
      </React.Fragment>
    );
  };

  render() {
    return (
      <View style={styles.preview}>
        {this.state.path ? this.renderImg() : this.renderCam()}
      </View>
    );
  }
}

const {width: winWidth, height: winHeight} = Dimensions.get('window');
const styles = {
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'blue',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#000',
  // },
  // preview: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // capture: {
  //   flex: 0,
  //   backgroundColor: '#fff',
  //   borderRadius: 5,
  //   padding: 15,
  //   paddingHorizontal: 20,
  //   alignSelf: 'center',
  //   margin: 20,
  // },
};
