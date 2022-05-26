import React, { useState, useEffect } from 'react'
import { View,StatusBar } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Router from './routes'

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(true)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
   await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    //handleLoadAssets()\
    console.disableYellowBox = true; 

  }, [])

  // rendering
  if (!didLoad) return <View />
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
