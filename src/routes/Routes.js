import React from 'react'
import { useSelector } from 'react-redux'

import Main from './navigation'
import Login from '../pages/login'

const Routes = () => {
  const { loggedIn, userType } = useSelector((state) => state.app)
  console.log('[##] loggedIn', loggedIn, userType)

  // if(!loggedIn) return <Login />
  // else return <Main userType={userType} />

   return <Main userType={userType} />
}

export default Routes
