import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  StyleSheet, Text, View, StatusBar, Image, SafeAreaView, TextInput, ScrollView
} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { login, clearAll } from '../../redux/actions/authActions'
// import Logo from '../../../assets/images/Asset1.png'

const Login = props => {
  const { } = props

  return(
    <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.rootContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={'white'} />
          <Text>123</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: '#efefef',
  },

})

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Login.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    loading: state.app.loading,
    message: state.app.message
  }
}

export default connect(mapStateToProps, {
  login,
  clearAll
})(Login)