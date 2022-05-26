import React from 'react'
import {
  StyleSheet, TextInput, View, Platform
} from 'react-native'
import { connect } from 'react-redux'
import PressOfficeContact from '../pressOfficeContact'

const PressOffices = props => {
  const { pressOffice, letter, alphaPos, setAlphaPos, navigation } = props;
  const renderContact = pressOffice.map((user, key) => <PressOfficeContact 
    key={key}
    user={user}
    navigation={navigation}
  />)

  return(
    <View 
      style={styles.singlePressContact} 
      onLayout={(event) => {
        const { y } = event.nativeEvent.layout;
        setAlphaPos({
          ...alphaPos,
          [letter]: y
        })
      }}
    >
      {pressOffice.length ? <TextInput editable={false} style={styles.letter}>{letter}</TextInput> : null}
      {renderContact}
    </View>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(PressOffices)


const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  letter: {
    width: '100%',
    color: '#0000ff',
    fontSize: 28,
    overflow: 'hidden',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 8
  },
  blueDate: {
    color: '#0000ff',
    fontSize: 26,
  },
  singlePressContact: {
    paddingVertical: 14,
    alignItems: 'flex-start',
    flexWrap: Platform.OS === 'android' ? 'wrap' : 'nowrap',
  },
  mail: {
    height: 12,
    width: 17,
    marginLeft: 8
  },
  contactText: {
    fontSize: 20
  },
  marginBottomExtra: {
    marginBottom: 20
  }
})


