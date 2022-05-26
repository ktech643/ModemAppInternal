import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, StatusBar, ScrollView, Image, Text, TouchableOpacity, Dimensions, Platform
} from 'react-native'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import SingleAgenda from '../../components/agenda'
import HomeView from '../../components/home'

const Agenda = props => {
  const { navigation } = props;
  const [openedCity, setOpenedCity] = useState(null);
  const modalizeRef = useRef(null);

  const handleClose = dest => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };

  const handleOpen = dest => {
    if (modalizeRef.current) {
      modalizeRef.current.open(dest);
    }
  };
  // height: 65,56
  const iosStatusBarHeight = Constants.statusBarHeight;
  const iosCalc = iosStatusBarHeight + 108
  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight - (Platform.OS === 'ios' ? iosCalc : 121);

  const renderHeader = () => (
    <TouchableOpacity
      style={styles.modal__header}
      activeOpacity={0.75}
      onPress={async () => {
        let route = await AsyncStorage.getItem('lastPage');
        route = route ? JSON.parse(route) : {
          name: null,
          params: {}
        };
        const pages = ["Home", "Agenda"];
        navigation.navigate((route.name && !pages.includes(route.name)) ? route.name : 'FirstScreen', route.params || {});
      }}
      hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
      <Image
        source={require('../../assets/icons/closewhite.png')}
        style={{ tintColor: '#fff', width: '40%', height: '40%' }}
      />
    </TouchableOpacity>
  );

  const renderContent = () => (
    <View style={styles.modalMainContainer}>
      <View style={styles.cityContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('FashionWeeksAgenda')} style={styles.cityDetailsBtn}>
          <Text style={styles.cityName}>FASHION WEEKS AGENDA</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cityContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('InternationalAgenda')} style={styles.cityDetailsBtn}>
          <Text style={styles.cityName}>International Agenda</Text>
        </TouchableOpacity>
      </View>
      <SingleAgenda setOpenedCity={setOpenedCity} openedCity={openedCity} navigation={navigation} name='InternATIONAL Sales Campaigns'/>
    </View>
  );

  return(
    <>
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.modal}
        alwaysOpen={modalHeight}
        withOverlay={false}
        disableScrollIfPossible={false}
        handlePosition="outside"
        withHandle={false}
        HeaderComponent={renderHeader}
      >
        {renderContent()}
      </Modalize>
      <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="dark-content" />   
        {/* <View style={styles.rootContainer}>
          <View style={styles.postsContainer}>
            <Image source={Dummy} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy2} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy2} style={styles.postImage} />
          </View>
        </View> */}
        <HomeView 
          handleOpen={handleOpen}
          navigation={navigation}
        />
      </ScrollView>
    </>
  );
}


Agenda.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Agenda.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    // citiesEvents: state.cities.citiesEvents,
    // loading: state.cities.loading,
  }
}

export default connect(mapStateToProps, {
  // fetchCitiesEvents,
})(Agenda)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    paddingTop:Platform.OS=='ios'?20:0
  },
  postsContainer: {
    paddingVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    marginBottom: -1
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  modalMainContainer: {
    paddingHorizontal: 10,
    marginTop: 60
  },
  closeBtn: {
    fontSize: 14,
    position: 'absolute',
  },
  modal__header: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
  },
  centerMe: {
    marginTop: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1
  },
  cityDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
})



