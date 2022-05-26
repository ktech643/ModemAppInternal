import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme'
import { connect } from 'react-redux'
import Cities from '../../../assets/icons/tabIcons/cities.png'
// import CitiesActive from '../../../assets/icons/tabIcons/cities-active.png'
import Agenda from '../../../assets/icons/tabIcons/agenda.png'
import AgendaActive from '../../../assets/icons/tabIcons/agenda-active.png'
import Connections from '../../../assets/icons/tabIcons/connections.png'
import ConnectionsActive from '../../../assets/icons/tabIcons/connections-active.png'
import Magzine from '../../../assets/icons/tabIcons/magzine.png'
import MagzineActive from '../../../assets/icons/tabIcons/magzine-active.png'
import Account from '../../../assets/icons/tabIcons/account.png'
import AccountActive from '../../../assets/icons/tabIcons/account-active.png'
import AlertModal from '../../../components/alertModal'

// import Home from 'pages/home'
import { HomeNavigator, InitialNavigator, AgendaNavigator, ConnectionsNavigator } from '../stacks'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {

  const NullView = (props) => {
    const handlepress = () => {
      navigation.navigate('FirstScreen') 
    }
    const { navigation, title } = props;

    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(23,22,15,0.6)'}}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>To be launched soon</Text>
        <TouchableOpacity onPress={handlepress}>
          <Text style={styles.btn}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  

  return(
    <Tab.Navigator
      tabBarOptions={{
        showLabel: true,
        showIcon: true,
        activeTintColor: '#dbb11c',
        inactiveTintColor: 'black',
        labelStyle: {
          fontSize: 13,  
        },
        style: {
          height: Platform.OS === 'ios' ? 80 : 50,
          backgroundColor: colors.white,
      }}}
      screenOptions={({ route,navigation }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Default':
              return (
                <View style={styles.hiddenTab}>
                  <Text style={focused ? styles.active : styles.nonActive}>Default</Text>
                </View>
              )
            case 'Cities':
              return (
                <View style={styles.center}>
                  <Image source={Cities} style={styles.cities}/>
                  <TextInput editable={false} style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                    borderBottomColor: focused ? 'blue' : 'black',
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    paddingBottom: 1,
                    textTransform: 'uppercase'
                  }}>Cities</TextInput>
                </View>
              )
            case 'Agenda':
              return (
                <TouchableOpacity onPress={()=>{navigation.navigate('Agenda')}} style={{marginLeft: '-20%', alignItems: 'center'}}>
                  <Image source={Agenda} style={styles.agenda}/>
                  <TextInput editable={false} style={{
                    color: 'white',
                    // color: '#646464',
                    fontSize: 10,
                    fontWeight: 'bold',
                    borderBottomColor: focused ? 'blue' : 'black',
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    paddingBottom: 1,
                    textTransform: 'uppercase'
                  }}>Agenda</TextInput>
                </TouchableOpacity>
              )
            case 'Connect':
              return (
                <View style={{marginLeft: '-20%', alignItems: 'center'}}>
                  <Image source={ConnectionsActive} style={styles.connections}/>
                  <TextInput editable={false} style={{
                    color: 'white',
                    // color: '#646464',
                    color: '#646464',
                    fontSize: 10,
                    fontWeight: 'bold',
                    borderBottomColor: focused ? 'black' : 'black',
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    paddingBottom: 1,
                    textTransform: 'uppercase'
                  }}>Connect</TextInput>
                </View>
              )
            case 'Magzine':
              return (
                <View style={styles.center}>
                  <Image source={MagzineActive} style={styles.magazine}/>
                  <TextInput editable={false} style={{
                    // color: 'white',
                    color: '#646464',
                    fontSize: 10,
                    fontWeight: 'bold',
                    borderBottomColor: focused ? 'black' : 'black',
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    paddingBottom: 1,
                    textTransform: 'uppercase'
                  }}>modemmag</TextInput>
                </View>
              )  
            case 'Account':
              return (
                <View style={styles.center}>
                  <Image source={AccountActive} style={styles.account}/>
                  <TextInput editable={false} style={{
                    // color: 'white',
                    color: '#646464',
                    fontSize: 10,
                    fontWeight: 'bold',
                    borderBottomColor: focused ? 'black' : 'black',
                    borderBottomWidth: 2,
                    paddingTop: 2,
                    paddingBottom: 1,
                    textTransform: 'uppercase'
                  }}>mymodem</TextInput>
                </View>
              )  
            default:
              return <View />
          }
        },
      })}
      // initialRouteName="Welcome"
      swipeEnabled={true}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#000000',
          height: Platform.OS === 'ios' ? 90 : 80,
          paddingTop: Platform.OS === 'ios' ? 0 : 10,
          paddingBottom: 10,
        },
        // activeTintColor: '#646464',
        // inactiveTintColor: 'white',
      //   labelStyle: {
      //       fontSize: 12,
      //     }
      // ,
      }} 
    >
      <Tab.Screen name="Default" component={InitialNavigator} 
        options={{
            tabBarButton: () => null,
        }}
      />
      <Tab.Screen name="Cities" component={HomeNavigator} />
      <Tab.Screen name="Agenda" component={AgendaNavigator} />
      <Tab.Screen name="Connect" component={(props) => <NullView {...props} title="Connect" />} />
      {/* <Tab.Screen name="Magzine" component={HomeNavigator} />
      <Tab.Screen name="Account" component={HomeNavigator} /> */}
      {/* <Tab.Screen name="Agenda" component={NullView} /> */}
      {/* <Tab.Screen name="Connections" component={NullView}/> */}
      <Tab.Screen name="Magzine" component={(props) => <NullView {...props} title="Modem Mag" />} />
      <Tab.Screen name="Account" component={(props) => <NullView {...props} title="My Modem" />}/>
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  agenda: {
    height: 28,
    width: 26
  },
  cities: {
    height: 28,
    width: 28
  },
  connections: {
    height: 28.5,
    width: 24
  },
  magazine: {
    height: 28,
    width: 30
  },
  account: {
    height: 26,
    width: 26
  },
  center: {
    alignItems: 'center',
  },
  hiddenTab: {
    // display: 'none',
  },
  activeLine: {
    backgroundColor: '#0000ff',
    height: 2,
    width: '100%',
  },
  // centeredView: {
  //   flex: Platform.OS === 'android' && 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalContainer: {
    width: '87%',
    backgroundColor: "white",
    borderRadius: 26,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    paddingTop: 10
  },
  body: {
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  btn: {
    fontSize: 26,
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 4
  }
})

const mapStateToProps = state => {
  return {
    // citiesEvents: state.cities.citiesEvents,
    // loading: state.cities.loading,
  }
}

export default connect(mapStateToProps, {
  // fetchCitiesEvents,
})(TabNavigator)
