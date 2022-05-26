import React from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import SingleBrand from '../singleBrand'
const BrowseByAlphabet = props => {
  const { multiLabelShowrooms, letter, alphaPos, setAlphaPos, setBrandNames, brandNames, removedBrand } = props;
  const renderSingleBrand = multiLabelShowrooms?.map((showroom, key) => <SingleBrand
    showroom={showroom}
    key={key}
    brandNames={brandNames}
    setBrandNames={setBrandNames}
    removedBrand={removedBrand}
  />)
  console.log('brandNames',brandNames)

  return(
      <View 
        style={styles.row}
        onLayout={(event) => {
        const { y } = event.nativeEvent.layout;
        setAlphaPos({
          ...alphaPos,
          [letter]: y
        })
      }}
      >
        <Text style={styles.time}>{letter}</Text> 
        <View style={{width: '74%'}}>   
          {renderSingleBrand}
        </View>
      </View>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(BrowseByAlphabet)


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


