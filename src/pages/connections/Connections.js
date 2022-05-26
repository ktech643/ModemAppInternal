import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, StatusBar, ScrollView, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { fetchCitiesEvents } from '../../redux/actions/citiesActions'
import HomeView from '../../components/home'

import ConnectionsSubMenu from '../../components/connections/connectionsSubMenu'

const connectionsList = [
  {
    id: 1,
    text: 'brands',
    link:'ConnectionsBrands'
  },
  {
    id: 2,
    text: 'tradeshows'
  },
  {
    id: 3,
    text: 'fashion weeks'
  },
  {
    id: 4,
    text: 'trade shows'
  },
  {
    id: 5,
    text: 'fashion weeks'
  },
  {
    id: 6,
    text: 'multi-label showrooms'
  },
  {
    id: 7,
    text: 'multi-label stores'
  },
  {
    id: 8,
    text: 'editors and media'
  },
  {
    id: 9,
    text: 'fashion schools'
  },
  {
    id: 10,
    text: 'fashion services',
    menu: {
      ORGANIZATIONS: [
        'Associations', 'Federations', 'Tradeshows representative'
      ],
      AGENCIES: [
        'Event production', 'Buying offices', 'Agents', 'Tends agencies', 'Consulting', 'Video production', 'Sound designer' 
      ],
      ONLINESERVICES:[
        'Showrooms online Platforms', 'Ecommerce Platforms', 'B2B Software', 'Service Platforms', 'Federations', 'Tradeshows representative', 'Technology and Software Solutions'
      ],
    }
  }
]

const Connections = props => {
  const { navigation, loading } = props;
  const [currActive, setCurrActive] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const modalizeRef = useRef(null);

  useEffect(() => {
    fetchCitiesEvents();
  }, [])

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
  const windowHeight = Dimensions.get('window').height;
  const modalHeight = windowHeight - 121;

  const renderHeader = () => (
    <TouchableOpacity
      style={styles.modal__header}
      activeOpacity={0.75}
      onPress={() => navigation.navigate('FirstScreen')}
      hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
      <Image
        source={require('../../assets/icons/cross.png')}
        style={{ tintColor: '#fff', width: '40%', height: '40%' }}
      />
    </TouchableOpacity>
  );
  
  const renderContent = () => (
    <View style={styles.modalMainContainer}>
      {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View> : 
        connectionsList.map(c => <View 
          key={c.id}
          style={styles.cityContainer}
        >
          <TouchableOpacity onPress={() => {setShowMenu(!showMenu); setCurrActive(c.id); c.link && navigation.navigate(c.link)}} style={styles.cityDetailsBtn}>
            <Text style={styles.cityName}>{c.text}</Text>
          </TouchableOpacity>
          {c.id === currActive && c.menu && Object.keys(c.menu).map((menu, key) => <ConnectionsSubMenu 
            key={key}
            title={menu}
            submenu={c.menu[menu]}
          />)}
        </View>)
      }  
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
        <HomeView 
          handleOpen={handleOpen}
          navigation={navigation}
        />
      </ScrollView>
    </>
  );
}


Connections.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Connections.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, {
  // fetchCitiesEvents,
})(Connections)


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
    marginBottom: -1
  },
  cityDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
})



