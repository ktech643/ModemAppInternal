import React, { useState } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native'
import Bullet from '../../assets/icons/bullet.png'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';

const compaignList = [
  {
    text: 'Multi-Label Showrooms',
    link: 'AgendaMultiLabelShowrooms'
  },
  {
    text: 'Brands Showrooms',
    link: 'AgendaBrandsShowrooms'
  },
  {
    text: 'Trade Shows',
    link: 'AgendaTradeShows'
  }
]

const Agenda = props => {
  const { navigation, openedCity, setOpenedCity, name } = props;
  const [cityDetails, setCityDetails] = useState(false);
  const handleShows = (link) => {
    // link === 'Shows' && fetchFashionWeekShows(cityEvent.fashionweek_id);
    // link === 'Press' && fetchFashionShowsPressContacts(cityEvent.fashionweek_id);
    navigation.navigate(link);
  }
  const renderAllAgendas = compaignList.map((compaign, key) => <TouchableOpacity key={key} onPress={() => navigation.navigate(compaign.link, {other: true})}>
  <Animatable.View animation="slideInDown" duration={200} style={styles.list}>
    <Image source={Bullet} style={styles.bulletIcon} />
    <Text style={styles.listText}>{compaign.text}</Text>
  </Animatable.View>
</TouchableOpacity>)



  const showCityDetails = <View style={styles.showCityDetailsContainer}>
    {renderAllAgendas}
  </View>

  const handleView = () => {
    setCityDetails(!cityDetails)
    // setOpenedCity(cityEvent.fashionweek_id)
  }

  return(
    <View style={styles.cityContainer}>
      <TouchableOpacity onPress={handleView} style={styles.cityDetailsBtn}>
        <Text style={styles.cityName}>{name}</Text>
      </TouchableOpacity>
      {cityDetails && showCityDetails}
    </View>
  );
}


const mapStateToProps = state => {
  return {
    // citiesEvents: state.cities.citiesEvents
  }
}

export default connect(mapStateToProps, {
  // fetchFashionWeekShows
})(Agenda)

const styles = StyleSheet.create({
  cityContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1
  },
  cityDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
  },
  bullet: {
    color: 'black',
    fontSize: 14
  },
  bulletIcon: {
    height: 15,
    width: 15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listText: {
    fontSize: 20,
    marginLeft: 10
  },
  showCityDetailsContainer: {
    marginVertical: 12
  }
})

