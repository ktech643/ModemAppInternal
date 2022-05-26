import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { colors } from 'theme'
import Home from 'pages/home'
import Shows from 'pages/shows'
import FirstScreen from 'pages/firstScreen'
import ArticleScreen from 'pages/article'
import HeaderTitle from './HeaderTitle'
import HeaderTitleHome from './HeaderTitleHome'
import Press from 'pages/press'
import MultiLabelShowroom from 'pages/multiLabelShowroom'
import BrandsShowroom from 'pages/brandsShowroom'
import TradeShowRooms from 'pages/tradeShowrooms'
import CitiesEvents from 'pages/citiesEvents'
import MultiLabelStores from 'pages/multiLabelStores'
import Restaurants from 'pages/restaurants'
import Hotels from 'pages/hotels'
import Beauty from 'pages/beauty'
import Agenda from 'pages/agenda'
import FashionWeeksAgenda from 'pages/fashionWeeksAgenda'
import InternationalAgenda from 'pages/internationalAgenda'
import Connections from 'pages/connections'
import ConnectionsBrands from 'pages/connectionsBrands'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

// const navigationProps = {
//   headerTintColor: 'white',
//   headerStyle: { backgroundColor: colors.darkPurple },
//   headerTitleStyle: { fontSize: 18 },
// }

// ------------------------------------
// Navigators
// ------------------------------------

export const InitialNavigator = () => (
  <Stack.Navigator
    initialRouteName="FirstScreen"
    headerMode="screen"
    screenOptions={{
      headerShown: false,
      headerStyle: {
        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="FirstScreen"
      component={FirstScreen}
      options={({ navigation }) => ({
        title: 'FirstScreen',
        headerTitle: () => <HeaderTitleHome navigation={navigation}/>,
      })}
    />
    <Stack.Screen
      name="ArticleScreen"
      component={ArticleScreen}
    />
  </Stack.Navigator>
)

export const HomeNavigator = (props) => {
  return (<Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    // screenOptions={navigationProps}
    screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'Home',
        headerTitle: () => <HeaderTitle page="Home" navigation={navigation}/>,
      })}
    />
    <Stack.Screen
      name="Shows"
      component={Shows}
      options={({ navigation }) => ({
        title: 'Home',
        headerTitle: () => <HeaderTitle page="Shows" navigation={navigation}/>,
        headerLeft: null,
      })}
    />
    <Stack.Screen
      name="Press"
      component={Press}
      options={({ navigation }) => ({
        title: 'Press',
        headerTitle: () => <HeaderTitle page="Press" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="MultiLabelShowroom"
      component={MultiLabelShowroom}
      options={({ navigation }) => ({
        title: 'MultiLabelShowroom',
        headerTitle: () => <HeaderTitle page="MultiLabelShowroom" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="BrandsShowroom"
      component={BrandsShowroom}
      options={({ navigation }) => ({
        title: 'BrandsShowroom',
        headerTitle: () => <HeaderTitle page="BrandsShowroom" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="TradeShows"
      component={TradeShowRooms}
      options={({ navigation }) => ({
        title: 'TradeShowRooms',
        headerTitle: () => <HeaderTitle page="TradeShowRooms" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="CitiesEvents"
      component={CitiesEvents}
      options={({ navigation }) => ({
        title: 'CitiesEvents',
        headerTitle: () => <HeaderTitle page="CitiesEvents" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="MultiLabelStores"
      component={MultiLabelStores}
      options={({ navigation }) => ({
        title: 'MultiLabelStores',
        headerTitle: () => <HeaderTitle page="MultiLabelStores" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="Restaurants"
      component={Restaurants}
      options={({ navigation }) => ({
        title: 'Restaurants',
        headerTitle: () => <HeaderTitle page="Restaurants" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="Hotels"
      component={Hotels}
      options={({ navigation }) => ({
        title: 'Hotels',
        headerTitle: () => <HeaderTitle page="Hotels" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="Beauty"
      component={Beauty}
      options={({ navigation }) => ({
        title: 'Beauty',
        headerTitle: () => <HeaderTitle page="Beauty" navigation={navigation}/>,
        headerLeft: null
      })}
    />
  </Stack.Navigator>)
}

export const AgendaNavigator = () => (
  <Stack.Navigator
    initialRouteName="Agenda"
    headerMode="screen"
    // screenOptions={navigationProps}
    screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="Agenda"
      component={Agenda}
      options={({ navigation }) => ({
        title: 'Agenda',
        headerTitle: () => <HeaderTitle page="Agenda" navigation={navigation}/>,
      })}
    />
    <Stack.Screen
      name="FashionWeeksAgenda"
      component={FashionWeeksAgenda}
      options={({ navigation }) => ({
        title: 'FashionWeeksAgenda',
        headerTitle: () => <HeaderTitle page="FashionWeeksAgenda" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="InternationalAgenda"
      component={InternationalAgenda}
      options={({ navigation }) => ({
        title: 'InternationalAgenda',
        headerTitle: () => <HeaderTitle page="InternationalAgenda" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="AgendaBrandsShowrooms"
      component={BrandsShowroom}
      options={({ navigation }) => ({
        title: 'BrandsShowroom',
        headerTitle: () => <HeaderTitle page="BrandsShowroom" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="AgendaTradeShows"
      component={TradeShowRooms}
      options={({ navigation }) => ({
        title: 'TradeShows',
        headerTitle: () => <HeaderTitle page="AgendaTradeShows" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="AgendaMultiLabelShowrooms"
      component={MultiLabelShowroom}
      options={({ navigation }) => ({
        title: 'BrandsShowrooms',
        headerTitle: () => <HeaderTitle page="BrandsShowroom" navigation={navigation}/>,
        headerLeft: null
      })}
    />
    {/* <Stack.Screen
      name="CompaignBrandsShowroom"
      component={CompaignBrandsShowroom}
      options={({ navigation }) => ({
        title: 'CompaignBrandsShowroom',
        headerTitle: () => <HeaderTitle navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="CompaignMultiLabelShowroom"
      component={CompaignMultiLabelShowroom}
      options={({ navigation }) => ({
        title: 'CompaignMultiLabelShowroom',
        headerTitle: () => <HeaderTitle navigation={navigation}/>,
        headerLeft: null
      })}
    />
    <Stack.Screen
      name="CompaignTradeShowrooms"
      component={CompaignTradeShowrooms}
      options={({ navigation }) => ({
        title: 'CompaignTradeShowrooms',
        headerTitle: () => <HeaderTitle navigation={navigation}/>,
        headerLeft: null
      })}
    /> */}
  </Stack.Navigator>
)

export const ConnectionsNavigator = () => (
  <Stack.Navigator
    initialRouteName="Connect"
    headerMode="screen"
    // screenOptions={navigationProps}
    screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 0,
      },
    }}
  >
    <Stack.Screen
      name="Connect"
      component={Connections}
      options={({ navigation }) => ({
        title: 'Connect',
        headerTitle: () => <HeaderTitle navigation={navigation}/>,
      })}
    />
    <Stack.Screen
      name="ConnectionsBrands"
      component={ConnectionsBrands}
      options={({ navigation }) => ({
        title: 'ConnectionsBrands',
        headerTitle: () => <HeaderTitle navigation={navigation}/>,
        headerLeft: null
      })}
    />
  </Stack.Navigator>
)