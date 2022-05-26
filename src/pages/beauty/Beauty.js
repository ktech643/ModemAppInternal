import React, { useState, useEffect, useRef } from 'react'
import PropTypes, { object } from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Dimensions, Platform, Pressable
} from 'react-native'
import { fetchBeautySaloons, fetchCitiesEvents } from '../../redux/actions/citiesActions'
import { connect } from 'react-redux'
import BeautySaloonByAlphabet from '../../components/beautySaloonByAlphabet'
import MultiLabelStoreByCity from '../../components/multiLabelStoreByCity'

const Beauty = props => {
  const { route, loading, totalBeautySaloons, fetchBeautySaloons, fetchCitiesEvents } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const [alphaPos, setAlphaPos] = useState({});
  const scrollRef = useRef();
  const id = route?.params?.cityEvent?.fashionweek_id;
console.log('totalBeautySaloons',totalBeautySaloons)
  useEffect(() => {
    fetchBeautySaloons(id);
    fetchCitiesEvents();
  }, [id])

  const onRefresh = () => {
    fetchBeautySaloons(id);
    fetchCitiesEvents();
  }

  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index)
  }

  const windowHeight = Dimensions.get('window').height;
  const showLetters = totalBeautySaloons?.length ? Object.keys(totalBeautySaloons[0].indexes).map(key => <TouchableOpacity onPress={() => {
    scrollRef.current.scrollTo({
      y: alphaPos[key],
      animated: true
    })
  }} key={key}><Text style={styles.alphaCharacter}>{key}</Text></TouchableOpacity>) : null

  const renderSaloons = (totalBeautySaloons?.length && Object.keys(totalBeautySaloons[0].indexes).length) ? Object.keys(totalBeautySaloons[0].indexes).map((index, key) => {
    // if(totalBeautySaloons[0].indexes[key][0]?.neighborhood) setNeighbourhoods([...neighbourhoods, totalBeautySaloons[0].indexes[key][0]?.neighborhood]);

    return <View
      key={key}
      onLayout={(event) => {
        const { y } = event.nativeEvent.layout;
        setAlphaPos({
          ...alphaPos,
          [index]: y
        })
      }}
    >
      {totalBeautySaloons[0].indexes[index].length ? <Text style={styles.letter}>{index}</Text> : null}
      {totalBeautySaloons[0].indexes[index].map((saloon, key) => <BeautySaloonByAlphabet 
        saloon={saloon}
        key={key}
      />)}
  </View>
  }) : <Text style={styles.noEvents}>There are no saloons.</Text>
  
  const renderCities = neighbourhoods.length ? neighbourhoods.map((neighbourhood, i) => <MultiLabelStoreByCity city={neighbourhood} key={i}/>) : <Text style={styles.noEvents}>There are no neighbourhoods.</Text>

  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
    {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View>
      :
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content"/>
        {!selectedIndex && <View
          onLayout={(event) => {
            setLettersViewHeight(event.nativeEvent.layout.height)
          }}
          style={{position: 'absolute', zIndex: 1, right: 5, elevation: 99, flex: 1, top: (((windowHeight - 118) - lettersViewHeight) / 2) || 0}}
        >
          {showLetters}
        </View>}
        <View style={styles.rootContainer}>
          <View
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setShowDetailViewHeight(height);
            }}
            style={styles.cityDetailsBtn}
          >
            <Text style={styles.cityName}>{route?.params?.cityEvent?.city}</Text>
            <Text style={styles.date}>{route?.params?.cityEvent?.dates_collection}</Text>
          </View>
          { neighbourhoods.length ? <ScrollView style={styles.headingMainContainer} horizontal={true} contentContainerStyle={{alignItems: 'center', paddingRight: 30}}>
            <TouchableOpacity onPress={() => updateIndex(1)}>
              <Text style={selectedIndex === 1 ? styles.pressTabBtnActive : styles.pressTabBtn}>Neighbourhood</Text>
            </TouchableOpacity>
          </ScrollView> : null }
          {selectedIndex ? <Pressable hitSlop={{top: 5, left: 5, bottom: 5, right: 5}} style={[styles.closeBtn, {top: (showDetailViewHeight + 20) || 0}]}  onPress={() => updateIndex(0)}>
            <Image style={styles.closeImg} source={require('../../assets/icons/closewhite.png')} />
          </Pressable>: null }
          <ScrollView style={{flex: 1, paddingHorizontal: 8}} contentContainerStyle={{flexGrow: 1}} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {!selectedIndex ? 
            <>
              <Text style={styles.gernalHeading}>{totalBeautySaloons && totalBeautySaloons[0]?.title}</Text>
              {renderSaloons}
            </>
            :
            renderCities
            }
          </ScrollView>
        </View>
      </View> 
      }
    </View>
  );
}


Beauty.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Beauty.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    totalBeautySaloons: state.cities.beautySaloons,
    loading: state.cities.loading,
    allCities: state.cities.citiesEvents
  }
}

export default connect(mapStateToProps, {
  fetchBeautySaloons,
  fetchCitiesEvents
})(Beauty)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  cityDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    flexWrap: 'wrap',
    marginHorizontal: 8
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
    maxWidth: '40%',
  },
  date: {
    fontSize: 20,
    maxWidth: '60%',
    textAlign: 'right'
  },
  headingMainContainer:{
    height: 65,
    maxHeight: 65,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  letter: {
    color: '#0000ff',
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginTop: 40
  },
  centerMe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressTabBtn: {
    color: '#646464',
    fontSize: 25,
    textTransform: 'capitalize',
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressTabBtnActive: {
    color: 'white',
    fontSize: 25,
    textTransform: 'capitalize',
    backgroundColor: '#646464',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden'
  },
  gernalHeading: {
    color: '#0000ff',
    fontSize: 26,
    textAlign: 'center',
    paddingHorizontal: '10%',
    paddingTop: 60,
  },
  closeBtn: {
    right: 10,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    zIndex: 100,
    elevation: 100,
    padding: 5,
    borderRadius: 4,
    backgroundColor:'black'
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 12,
    width: 12,
    tintColor: '#fff'
  },
  noEvents: {
    fontSize: 20,
    color: '#B8B8B8',
    paddingVertical: 20,
    textAlign: 'center'
  },
  alphaCharacter: {
    color: '#e6e6e6',
    fontSize: 16,
  },
  comingSoon: {
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
    marginTop: 20
  }
})
