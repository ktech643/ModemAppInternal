import React from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import SingleCountry from '../singleCountry'

const AgendaByCountry = props => {

  return(
    <>
      <View style={styles.row}>
        <Text style={styles.time}>F</Text> 
        <View style={{width: '80%'}}>
          {/* <SingleCountry name="Finland" />
          <SingleCountry name="France"/> */}
        </View>
      </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(AgendaByCountry)


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  time: {
    color: '#0000ff',
    fontSize: 26,
    width: '20%',
    maxWidth: '20%',
    overflow: 'hidden',
  },
  contactName: {
    color: 'black',
    fontSize: 26,
  },
  addUser: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
})


