import React, { useState, useEffect, useRef } from 'react'
import PropTypes, { object } from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Dimensions, Pressable
} from 'react-native'
import { fetchSalesCompaignsTradeShows } from '../../redux/actions/agendasActions'
import { connect } from 'react-redux'
import BrowseBrandsListByAlphabet from '../../components/browseBrandsListByAlphabet'
// import ShowroomListByName from '../../components/showroomListByName'
import ShowroomCalendarView from '../../components/showroomCalendarView'

const CompaignTradeShowrooms = props => {
  const { route, loading, fetchSalesCompaignsTradeShows, allSaleCompaignTradeShows } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [alphaPos, setAlphaPos] = useState({});
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const [filteredShowRooms, setFilteredShowRooms] = useState(allSaleCompaignTradeShows || []);
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    fetchSalesCompaignsTradeShows();
  }, [])

  const onRefresh = () => {
    fetchSalesCompaignsTradeShows();
  }

  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index)
  }

  const windowHeight = Dimensions.get('window').height;
  const showLetters = filteredShowRooms?.length ? Object.keys(filteredShowRooms[0].indexes).map(key => <TouchableOpacity onPress={() => {
    console.log("why are you clicking me", key, alphaPos[key]);
    scrollRef.current.scrollTo({
      y: alphaPos[key],
      animated: true
    })
  }} key={key}><Text style={styles.alphaCharacter}>{key}</Text></TouchableOpacity>) : null

  const renderShowrooms = (allSaleCompaignTradeShows?.length && Object.keys(allSaleCompaignTradeShows[0].indexes).length) ? Object.keys(allSaleCompaignTradeShows[0].indexes).map((index, key) => <BrowseBrandsListByAlphabet 
    key={key}
    compaignBrands={allSaleCompaignTradeShows[0].indexes[index]}
    letter={index}
    alphaPos={alphaPos}
    setAlphaPos={setAlphaPos}
  />) : <Text style={styles.noEvents}>There are no Events</Text> 

  const renderCountries = <Text style={styles.noEvents}>Sorry your data is not available</Text>

  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
    {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View>
      :
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content"/>
        {(!selectedIndex || selectedIndex === 2) && <View
          onLayout={(event) => {
            setLettersViewHeight(event.nativeEvent.layout.height)
          }}
          style={{position: 'absolute', zIndex: 1, right: 5, elevation: 99, flex: 1, top: (((windowHeight - 118) - lettersViewHeight) / 2) || 0}}
        >
          {showLetters}
        </View>}
        <View style={styles.rootContainer}>
          <View
            style={styles.cityDetailsBtn}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setShowDetailViewHeight(height);
            }}
          >
            <Text style={styles.cityName}>trade showrooms</Text>
          </View>
          <View style={styles.headingMainContainer}>
            <TouchableOpacity onPress={() => updateIndex(1)}>
              <Text style={selectedIndex === 1 ? styles.pressTabBtnActive : styles.pressTabBtn}>by Date</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateIndex(2)}>
              <Text style={selectedIndex === 2 ? styles.pressTabBtnActive : styles.pressTabBtn}>by Country</Text>
            </TouchableOpacity>
          </View>
          {selectedIndex ? <Pressable hitSlop={{top: 10, left: 10, bottom: 10, right: 10}} style={[styles.closeBtn, {top: (showDetailViewHeight + 75) || 0}]} onPress={() => updateIndex(0)}>
            <Image style={styles.closeImg} source={require('../../assets/icons/close.png')} />
          </Pressable>: null }
          <ScrollView style={{flex: 1, paddingHorizontal: 8}} contentContainerStyle={{flexGrow: 1}} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {!selectedIndex ? 
            <>
            <Text style={styles.gernalHeading}>{allSaleCompaignTradeShows && allSaleCompaignTradeShows[0]?.title}</Text>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btn}>
                <Image source={require('../../assets/icons/arrowleft.png')} style={styles.leftArrow}/>
                <Text style={styles.btnText}>Previous Month</Text>
              </TouchableOpacity>
              <View style={{backgroundColor: 'grey', width: 1}}></View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Next Month</Text>
                <Image source={require('../../assets/icons/rightarrow.png')} style={styles.arrow}/>
              </TouchableOpacity>
            </View>
            <View>
            {renderShowrooms}
            </View>
            </>
            : selectedIndex === 2 ? 
            renderCountries
            : 
            <ShowroomCalendarView setSelectedIndex={setSelectedIndex}/>
            }
          </ScrollView>
        </View>
      </View> 
      }
    </View>
  );
}


CompaignTradeShowrooms.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

CompaignTradeShowrooms.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    allSaleCompaignTradeShows: state.agendas.saleCompaignTradeShows,
    loading: state.agendas.loading,
  }
}

export default connect(mapStateToProps, {
  fetchSalesCompaignsTradeShows
})(CompaignTradeShowrooms)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  cityDetailsBtn: {
    flexDirection: 'row',
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
    fontSize: 26,
    textTransform: 'uppercase'
  },
  headingMainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1,
    flexDirection: 'row',
    marginHorizontal: 8
  },
  letter: {
    color: '#0000ff',
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 8,
    marginTop: 40,
    textTransform: 'uppercase'
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
    marginVertical: 12,
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
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  gernalHeading: {
    color: '#0000ff',
    fontSize: 26,
    textAlign: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 50,
  },
  closeBtn: {
    right: 22,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    zIndex:2,
    backgroundColor:'grey'
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 16,
    width: 16,
    tintColor: '#fff'
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    width: '50%',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#646464'
  },
  leftArrow: {
    width: 17,
    height: 12,
    marginRight: 4
  },
  arrow: {
    width: 16,
    height: 10,
    marginLeft: 4
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
})
