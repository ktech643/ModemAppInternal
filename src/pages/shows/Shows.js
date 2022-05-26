import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, ActivityIndicator
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect,useSelector } from 'react-redux'
import BrowseByAlphabet from '../../components/browseByAlphabet'
import BrowseByDate from '../../components/browseByDate/BrowseByDate'
import { fetchFashionShowsByAlpha } from '../../redux/actions/citiesActions'

const Shows = props => {
  const { route, fashionShows, fetchFashionShowsByAlpha, fashionShowsByAlpha, loading, navigation } = props;
  const [changeView, setChangeView] = useState(route?.params?.fashionweekId ? route?.params?.fashionweekId+1 : route?.params?.cityEvent?.fashionweek_id+1);
  const [alphaPos, setAlphaPos] = useState({});
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const scrollRef = useRef();
  console.log('fashionShowsByAlpha.length',changeView)
  useEffect(() => {
    fetchFashionShowsByAlpha(route?.params?.fashionweekId ? route?.params?.fashionweekId : route?.params?.cityEvent?.fashionweek_id);
  }, [route?.params?.fashionweekId ? route?.params?.fashionweekId+1 : route?.params?.cityEvent?.fashionweek_id+1])
 
  const windowHeight = Dimensions.get('window').height;
  const showLetters = fashionShowsByAlpha.length ? Object.keys(fashionShowsByAlpha[0].indexes).map(key => <TouchableOpacity onPress={() => {
    scrollRef.current.scrollTo({
      y: alphaPos[key],
      animated: true
    })
  }} key={key}><Text style={styles.letter}>{key}</Text></TouchableOpacity>) : null

  const renderShowsByAlphabet = fashionShowsByAlpha.length ? Object.keys(fashionShowsByAlpha[0].indexes).map((key, index) => <BrowseByAlphabet
    navigation={navigation}
    show={fashionShowsByAlpha[0].indexes[key]}
    key={key}
    letter={key}
    setAlphaPos={setAlphaPos}
    alphaPos={alphaPos}
  />) : <Text style={styles.noEvents}>There are no Events</Text>

  const renderShowsByDates = (fashionShows && Object.keys(fashionShows[0].days).length) ? Object.keys(fashionShows[0].days).map((key, index) => <BrowseByDate navigation={navigation} show={fashionShows[0].days[key]} key={index} date={key} />) : <Text style={styles.noEvents}>There are no Events</Text>

  return(
    <View style={{flex: 1, backgroundColor: 'white', elevation: 3}}>
    {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View>
    :
      <View style={{flex: 1}}>
        {changeView && <View 
            onLayout={(event) => {
              setLettersViewHeight(event.nativeEvent.layout.height)
            }}
            style={{position: 'absolute', zIndex: 1, right: 5, elevation: 99, top: (((windowHeight - 118) - lettersViewHeight) / 2) || 0}}>
            {showLetters}
          </View>}
        <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.rootContainer}>
            <View style={styles.cityDetailsBtn}>
              <Text style={styles.cityName}>{route?.params?.cityEvent?.city.replace(/&amp;\s*\/?/mg, '& ')}</Text>
              <Text style={styles.date}>{route?.params?.cityEvent?.dates_collection}</Text>
            </View>
            <View style={styles.headingMainContainer}>
              <View style={styles.showsHeadingContainer}>
                <Text style={styles.heading}>Shows and Presentations</Text>
                <Text style={styles.heading}>{fashionShows && fashionShows[0]?.title.replace(/&amp;\s*\/?/mg, '& ')}</Text>
              </View>
              <TouchableOpacity onPress={() => setChangeView(!changeView)}>
                <Text style={styles.browseBtn}>{changeView ? 'Browse by Date' : 'Browse A-Z'}</Text>
              </TouchableOpacity>
            </View>
            {changeView ? 
              renderShowsByAlphabet
            : 
              renderShowsByDates
            }
          </View>
        </ScrollView>
      </View>
      }
    </View>
  );
}


Shows.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Shows.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    fashionShows: state.cities.fashionShows,
    fashionShowsByAlpha: state.cities.citiesEventsByAlpha,
    loading: state.cities.loading
  }
}

export default connect(mapStateToProps, {
  fetchFashionShowsByAlpha,
})(Shows)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  postsContainer: {
    paddingVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    marginBottom: -1
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  modalMainContainer: {
    paddingHorizontal: 10
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
    flexWrap: 'wrap'
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
  headingMainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1
  },
  showsHeadingContainer: {
    paddingTop: 50,
    paddingBottom: 30
  },
  heading: {
    color: '#0000ff',
    fontSize: 26,
    textAlign: 'center'
  },
  day: {
    color: '#0000ff',
    fontSize: 26,
    minWidth: '40%',
    overflow: 'hidden'
  },
  browseBtn: {
    color: '#b2b2b2',
    alignSelf: 'flex-end',
    fontSize: 18,
    marginBottom: 10,
  },
  blueDate: {
    color: '#0000ff',
    fontSize: 26,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1,
    paddingVertical: 15 
  },
  letter: {
    color: '#999696',
    fontSize: 16,
  },
  noEvents: {
    fontSize: 20,
    color: '#B8B8B8',
    paddingVertical: 20,
    textAlign: 'center'
  },
  centerMe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
