import React from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import CompaignBrandDetail from '../../components/compaignBrandDetail'

const BrowseBrandsListByAlphabet = props => {
  const { compaignBrands, letter, setAlphaPos, alphaPos, navigation } = props;
  const renderContact = compaignBrands.map((brand, key) => <CompaignBrandDetail 
    key={key}
    brand={brand}
    index={key}
    length={compaignBrands.length}
    navigation={navigation}
  />) 

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
      <View style={{width: '80%'}}>
        {renderContact}
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(BrowseBrandsListByAlphabet)


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 20,
  },
  time: {
    alignSelf: 'baseline',
    color: '#0000ff',
    fontSize: 26,
    width: '20%',
    maxWidth: '20%',
    overflow: 'hidden',
    paddingTop: 8,
  },
})


