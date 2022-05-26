import React, { useState, useEffect } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native'
import Bullet from '../../assets/icons/bullet.png'
import { fetchFashionWeekShows } from '../../redux/actions/citiesActions'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';

const showsList = {
  'fashion-shows': {
    text: 'Shows and Presentations',
    link: 'Shows'
  },
  'press-contacts': {
    text: 'Press',
    link: 'Press'
  },
  'multilabel-showrooms': {
    text: 'Multi-Labels Showrooms',
    link: 'MultiLabelShowroom'
  },
  'collective-showrooms': {
    text: 'Collective Showrroms',
    link: 'CollectiveShowrroms'
  },
  'designer-showrooms': {
    text: 'Brands Showrooms',
    link: 'BrandsShowroom'
  },
  'tradeshows': {
    text: 'Trade Shows',
    link: 'TradeShows'
  },
  'events': {
    text: 'Events',
    link: 'CitiesEvents'
  },
  'multilabel-stores': {
    text: 'Multi-Label Stores',
    link: 'MultiLabelStores'
  },
  'restaurants': {
    text: 'Restaurants',
    link: 'Restaurants'
  },
  'hotels': {
    text: 'Hotels',
    link: 'Hotels'
  },
  'well-being': {
    text: 'Beauty',
    link: 'Beauty'
  },
  'sales-campaigns-brands': {
    text: 'Brands Showrooms',
    link: 'AgendaBrandsShowrooms'
  },
  'sales-campaigns-showrooms': {
    text: 'Multi-Label Showrooms',
    link: 'AgendaMultiLabelShowrooms'
  },
  'sales-campaigns-tradeshows': {
    text: 'Trade Shows',
    link: 'AgendaTradeShows'
  }
}

const City = props => {
  const { navigation, cityEvent, fetchFashionWeekShows, openedCity, setOpenedCity, homeScreenEventId } = props;

  useEffect(() => {
    setOpenedCity(homeScreenEventId);
  }, [homeScreenEventId])
  const handleShows = (link) => {
    link === 'Shows' && fetchFashionWeekShows(cityEvent.fashionweek_id);

    if(['AgendaTradeShows', 'AgendaMultiLabelShowrooms', 'AgendaBrandsShowrooms'].includes(link))
      navigation.navigate("Agenda", { screen: link, params:{cityEvent: cityEvent && cityEvent} });
    else
      navigation.navigate(link, { cityEvent: cityEvent });
  }
  const renderCityEventTypes = cityEvent.event_type.map((type, key) => <TouchableOpacity key={key} onPress={() => handleShows(showsList[type]?.link)}>
      <Animatable.View animation="slideInDown" duration={200} style={styles.list}>
        <Image source={Bullet} style={styles.bulletIcon} />
        <Text style={styles.listText}>{showsList[type] ? showsList[type]?.text : type}</Text>
      </Animatable.View>
    </TouchableOpacity>
  )

  const showCityDetails = <View style={styles.showCityDetailsContainer}>
    {renderCityEventTypes}
  </View>

  const handleView = () => {
    if(openedCity === cityEvent.fashionweek_id) setOpenedCity(0)
    else setOpenedCity(cityEvent.fashionweek_id)
  }

  return(
    <View style={styles.cityContainer}>
      <TouchableOpacity onPress={handleView} style={styles.cityDetailsBtn}>
        <Text style={styles.cityName}>{cityEvent.city}</Text>
        { cityEvent.fashionweek_id === openedCity && <Text style={styles.date}>{cityEvent.dates_collection.replace(/&amp;\s*\/?/mg, '& ')}</Text> }
      </TouchableOpacity>
      { cityEvent.fashionweek_id === openedCity && showCityDetails }
    </View>
  );
}


const mapStateToProps = state => {
  return {
    citiesEvents: state.cities.citiesEvents
  }
}

export default connect(mapStateToProps, {
  fetchFashionWeekShows
})(City)

const styles = StyleSheet.create({
  cityContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginBottom: -1
  },
  cityDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    flexWrap: 'wrap'
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
    maxWidth: '100%',
  },
  date: {
    fontSize: 20,
    maxWidth: '55%',
    textAlign: 'right'
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

