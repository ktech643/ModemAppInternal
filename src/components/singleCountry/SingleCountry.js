import React, { useState } from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import { CheckBox } from 'react-native-elements'

const SingleCountry = props => {
  const { name } = props;
  const [checked, setChecked] = useState(false);
  return(
    <CheckBox 
      title={<View style={styles.checkboxTextContainer}><Text style={styles.checkboxText}>{name}</Text></View>}
      checkedIcon={<View style={styles.checkboxChecked}></View>}
      uncheckedIcon={<View style={styles.checkboxUnchecked}></View>}
      uncheckedColor={'black'}
      textStyle={{marginLeft: 12}}
      containerStyle={styles.checkBoxMainContainerStyle}
      checked={checked}
      onPress={() => {
        setChecked(!checked)
      }}
    />
  );
}

export default SingleCountry


const styles = StyleSheet.create({
  checkboxTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  checkboxText: {
    fontSize: 22,
    color: 'black',
    marginLeft: 15
  },
  checkboxChecked: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#646464',
    backgroundColor: '#646464'
  },
  checkboxUnchecked: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  checkBoxMainContainerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding:0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
})

