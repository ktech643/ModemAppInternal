import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, Image, SafeAreaView, TextInput, Platform
} from 'react-native'
import { fonts } from 'theme'
import { connect } from 'react-redux'

const Signup = props => {
  const { } = props;

  const [googleResp, setGoogleResp] = useState();
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [zipcode, setZipcode] = useState(null);


  return(
    <View>
      <SafeAreaView style={styles.fieldsContainer}> 
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Enter password"
              />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder="Enter password"
              />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Zipcode</Text>
            <TextInput
                style={styles.input}
                onChangeText={setZipcode}
                value={zipcode}
                placeholder="Enter zipcode"
                keyboardType="number-pad"
              />
          </View>
         
      </SafeAreaView>
    </View>
  );
}


Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Signup.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, {
 
})(Signup)


const styles = StyleSheet.create({
  
  fieldsContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  inputField: {
    marginTop: 43,
  },
  inputLabel: {
    color: '#999999',
    fontSize: 15,
    fontFamily: fonts.sfuiSemibold,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 36,
    fontSize: 17,
    borderBottomColor: '#4a4a4a',
    borderBottomWidth:1,
    textDecorationLine:'none',
  },
  iamReadyBtn: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
  BtnContainer: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 25,
    marginTop: 43,
  },
  forgetPass: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fa5014',
    fontFamily: fonts.sfuiSemibold,
    marginTop: 18,
  },
  tagsInput: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#616161',
    fontSize: 17,
    borderBottomColor: '#4a4a4a',
    borderBottomWidth:1,
    textDecorationLine:'none',
    width: '100%'
  },
  singleTag: {
    backgroundColor: '#33aaff',
    fontSize: 15,
    color: 'white',
    fontFamily: fonts.sfuiSemibold,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 16,
    borderRadius: Platform.OS === 'android' ? 4 : 0,
  },
  closeBtn: {
    // position: Platform.OS === 'android' ? 'relative' : 'absolute',
    // top: Platform.OS === 'ios' ? 4 : 0,
    // left: Platform.OS === 'ios' ? 5 : 0,
    color: 'white',
    fontSize: 13,
    marginLeft: 7,
  },
  ionCloseBtn: {
    // marginRight: Platform.OS === 'android' ? 0 : 10
  },  
  iosBtn: {
    // overflow: 'hidden',
    // borderRadius: 4,
  },
  tagContainer: {
    flexDirection: 'column-reverse',
    width: '100%',
  },
  galleryBtn: {
    fontSize: 25,
    paddingHorizontal: 28,
    paddingVertical: 17,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 1,
    alignItems: 'center',
    height: 70,
    width: 70,
    marginTop: 10
  },
  galleryContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  galleryImage: {
    height: 70,
    width: 70,
    marginTop: 10,
    marginRight: 20
  },
  singleTagContainer: {
    marginVertical: 8,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
  alertText: {
    color: 'red',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },

})
