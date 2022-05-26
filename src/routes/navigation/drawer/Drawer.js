import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import TabNavigator from '../tabs'
import Home from '../../../pages/home'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter((item) => item.name !== 'Home')
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerMenu {...props} /> */}
      {/* <DrawerItemList state={newState} {...rest} /> */}
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = ({ userType }) => {
  return(
    <Drawer.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName="Home" drawerContent={DrawerMenuContainer}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      {/* <Drawer.Screen name="EventRequests" component={EventRequests} />
      <Drawer.Screen name="OtherProfile" component={OtherProfile} />  */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator
