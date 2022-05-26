import React, { useEffect, useState } from 'react'
import {
  StyleSheet, View, Text
} from 'react-native'
import { CheckBox } from 'react-native-elements'

const SingleBrand = props => {
  const { showroom, setBrandNames, brandNames } = props;
  const [checked, setChecked] = useState(brandNames.includes(showroom?.name) ? true : false);
  console.log('brandNamesbrandNames',brandNames)
  const handleBrands = (name) => {
    if(checked) {
      setBrandNames(brandNames.filter(b => b !== name));
      setChecked(false);
    } else {
      setBrandNames([...brandNames, name]);
      setChecked(true);
    }
  }

  useEffect(() => {
    const foundName = brandNames.find(b => b === showroom?.name);
    if(!foundName) setChecked(false);
    else setChecked(true);
  }, [brandNames]);

  return(
    <CheckBox 
      title={<View style={styles.checkboxTextContainer}><Text style={styles.checkboxText}>{showroom?.name.replace(/&amp;\s*\/?/mg, '& ')}</Text></View>}
      checkedIcon={<View style={styles.checkboxChecked}></View>}
      uncheckedIcon={<View style={styles.checkboxUnchecked}></View>}
      uncheckedColor={'black'}
      textStyle={{marginLeft: 12}}
      containerStyle={styles.checkBoxMainContainerStyle}
      checked={checked}
      onPress={() => handleBrands(showroom?.name)}
    />
  );
}

export default SingleBrand


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

