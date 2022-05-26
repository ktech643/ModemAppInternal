import React from 'react'
import {
  StyleSheet, Text, TouchableOpacity, View, Platform, Image, StatusBar
} from 'react-native'
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import AutoHeightWebView from 'react-native-autoheight-webview'
import Logo from '../../../assets/images/modem-logo.png'

const WebViewModal = props => {
  const {setWebModal, webModal, navigation, miniwebsiteLogin, miniWebsiteType } = props;
  const iosStatusBarHeight = Constants.statusBarHeight;
  return(
    <Modal
      style={{flex: 1, alignSelf: 'center', width: '100%', margin: 0}}
      animationType='slide'
      transparent={true} 
      step={1} 
      backdropColor={'rgba(23,22,15,0.6)'}
      isVisible={webModal}
      onRequestClose={() => {
        setWebModal(!webModal);
      }}
      onBackdropPress={() => setWebModal(!webModal)}
    >
      <View style={styles.centeredView} >
        <StatusBar barStyle="dark-content" />   
        <View style={[styles.modalContainer, {paddingTop: Platform.OS === 'ios' ? iosStatusBarHeight : 0}]}>
          <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')}>
            <Image source={Logo} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWebModal(!webModal)} style={styles.backBtnContainer}>
            <Image style={styles.img} source={require('../../assets/icons/arrowBlack.png')} />
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
          <AutoHeightWebView
            automaticallyAdjustContentInsets={false}
            source={{ uri: `https://www.modemonline.com/fashion/mini-web-sites/${miniWebsiteType}/references/${miniwebsiteLogin}&noheader=yes` }}
          />
        </View>
      </View>
    </Modal>
  );
}


const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(WebViewModal)


const styles = StyleSheet.create({
  centeredView: {
    // flex: Platform.OS === 'android' && 1,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: '100%',
    backgroundColor: "white",
    // borderTopEndRadius: 26,
    // borderTopStartRadius: 26,
    paddingVertical: 16,
    justifyContent: 'center',
    height: '100%'
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 8
  },
  logo: {
    width: 200,
    height: 35,
    alignSelf: 'center',
  },
  backBtnContainer: {
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 12,
    marginTop: 16
  },
  btnText: {
    fontSize: 26,
    color: 'black'
  }
})


