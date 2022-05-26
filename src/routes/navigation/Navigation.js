import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'

export default ({ userType }) => (
  <NavigationContainer>
    <DrawerNavigator userType={userType} />
  </NavigationContainer>
)
