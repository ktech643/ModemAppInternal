import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Image, Dimensions, Pressable, TextInput
} from 'react-native'
import { connect,useSelector } from 'react-redux'
import ShowroomByAlphabet from '../../components/showroomByAphabet'
import ShowroomListByName from '../../components/showroomListByName'
import ShowroomCalendarView from '../../components/showroomCalendarView'
import { fetchMultiLabelShowrooms } from '../../redux/actions/citiesActions'
import moment from 'moment'

const MultiLabelShowroom = props => {
  const totalMultiLabelShowroomsbybrands = useSelector((state)=>state.cities.multiLabelShowroomsbybrands);
  const { route, loading, fetchMultiLabelShowrooms, totalMultiLabelShowrooms, navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const[ openedShowroom, setOpenedShowroom] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [alphaPos, setAlphaPos] = useState({});
  const [brandNames, setBrandNames] = useState([]);
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const [removedBrand, setRemovedBrand] = useState(null);
  const [filteredShowRooms, setFilteredShowRooms] = useState(totalMultiLabelShowrooms?.length && totalMultiLabelShowrooms || []);
  const [filteredShowRoomsbybrands, setFilteredShowRoomsbybrands] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const scrollRef = useRef();
  const id = route?.params?.cityEvent?.fashionweek_id;
  const other = route?.params?.other;
  console.log('totalMultiLabelShowroomsbybrands',id)

  const filteredBrandNames = (brand) => {
    setBrandNames(brandNames.filter(b => b !== brand));
  }
  useEffect(() => {
    fetchMultiLabelShowrooms(id);
  }, [id, other]);

  useEffect(() => {
    setFilteredShowRooms(totalMultiLabelShowrooms.length && totalMultiLabelShowrooms || []);
  }, [totalMultiLabelShowrooms]);
  useEffect(() => {
    setFilteredShowRoomsbybrands(totalMultiLabelShowroomsbybrands.length && totalMultiLabelShowroomsbybrands || []);
  }, [totalMultiLabelShowroomsbybrands]);

  useEffect(() => {
    const data = [{
      indexes: []
    }];

    if(!brandNames.length && !selectedDate) return setFilteredShowRooms(totalMultiLabelShowrooms.length && totalMultiLabelShowrooms);

    totalMultiLabelShowrooms?.length && Object.keys(totalMultiLabelShowrooms[0]?.indexes) && Object.keys(totalMultiLabelShowrooms[0].indexes).map(key => {
      const arr = [];
      totalMultiLabelShowrooms[0].indexes[key].forEach(d => {
        brandNames.forEach(b => {
          const start = moment(d.start_date).format('YYYY-MM-DD');
          const end = moment(d.end_date).format('YYYY-MM-DD');
          const compare = moment(selectedDate);
          if(brandNames.length && selectedDate && compare.isSameOrAfter(start) && compare.isSameOrBefore(end) && d.comments.replace(/<[^>]+>/g, '').match(b)) arr.push(d);
          if(brandNames.length && !selectedDate && d.comments.replace(/<[^>]+>/g, '').match(b)) arr.push(d);
        })

        if(selectedDate && !brandNames.length) {
          const start = moment(d.start_date).format('YYYY-MM-DD');
          const end = moment(d.end_date).format('YYYY-MM-DD');
          const compare = moment(selectedDate);
          if(selectedDate && compare.isSameOrAfter(start) && compare.isSameOrBefore(end)) arr.push(d);
        }
      })

      data[0].indexes[key] = arr;
    });

    setFilteredShowRooms(data);
  }, [brandNames, selectedDate]);

  const onRefresh = () => {
    fetchMultiLabelShowrooms(id);
  }

  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index);
  }
  const windowHeight = Dimensions.get('window').height;
  const showLetters = filteredShowRooms?.length ? Object.keys(filteredShowRooms[0].indexes).map(key => <TouchableOpacity onPress={() => {
    scrollRef.current.scrollTo({
      y: alphaPos[key],
      animated: true
    })
  }} key={key}><Text style={styles.alphaCharacter}>{key}</Text></TouchableOpacity>) : null

  const renderShowrooms = (filteredShowRooms.length && Object.keys(filteredShowRooms[0].indexes).length) ? Object.keys(filteredShowRooms[0].indexes).map((index, key) => <View
    key={key}
    multiLabelShowrooms = {filteredShowRooms[0].indexes[index]}
    onLayout={(event) => {
      const { y } = event.nativeEvent.layout;
      setAlphaPos({
        ...alphaPos,
        [index]: y
      })
    }}
  >
    {filteredShowRooms[0].indexes[index].length ? <TextInput editable={false} style={styles.letter}>{index}</TextInput> : null}
    {filteredShowRooms[0].indexes[index].map((singleShowroom, key) => <ShowroomByAlphabet 
      singleShowroom={singleShowroom}
      key={key}
      setOpenedShowroom={setOpenedShowroom}
      openedShowroom={openedShowroom}
      navigation={navigation}
    />
    )}
  </View> 
  ): <Text style={styles.noEvents}>There are no Events</Text>
 
  const renderBrands = (filteredShowRoomsbybrands.length && Object.keys(filteredShowRoomsbybrands[0].indexes).length) ? Object.keys(filteredShowRoomsbybrands[0].indexes).map((index, key) => <ShowroomListByName 
    key={key}
    letter={index}
    multiLabelShowrooms = {totalMultiLabelShowroomsbybrands[0]?.indexes[index]}
    alphaPos={alphaPos}
    setAlphaPos={setAlphaPos}
    brandNames={brandNames}
    setBrandNames={setBrandNames}
    removedBrand={removedBrand}
  />) : <Text style={styles.noEvents}>There are no Events</Text>

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
          style={{position: 'absolute', zIndex: 1, right: 5, elevation: 2, flex: 1, top: (((windowHeight - 118) - lettersViewHeight) / 2) || 0}}
        >
          {showLetters}
        </View>}
        <View style={styles.rootContainer}>
          {!other && <View style={styles.cityDetailsBtn} 
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setShowDetailViewHeight(height);
            }}
          >
            <Text style={styles.cityName}>{route?.params?.cityEvent?.city}</Text>
            <Text style={styles.date}>{route?.params?.cityEvent?.dates_collection}</Text>
          </View>}
          <ScrollView style={[styles.headingMainContainer, {marginTop: other ? 0 : -1}]} horizontal={true} contentContainerStyle={{alignItems: 'center', paddingRight: 30}}>
            <TouchableOpacity onPress={() => updateIndex(1)}>
              <Text style={selectedIndex === 1 ? styles.pressTabBtnActive : styles.pressTabBtn}>by Date</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateIndex(2)}>
              <Text style={selectedIndex === 2 ? styles.pressTabBtnActive : styles.pressTabBtn}>by Brand</Text>
            </TouchableOpacity>          
            {brandNames && brandNames.map((brand, i) => <View style={styles.filteredView} key={i}>
              <Text style={styles.brandName}>{brand}</Text>
              <Pressable style={styles.closeBtnContainer} hitSlop={{top: 5, left: 5, bottom: 5, right: 5}} onPress={() => {
                filteredBrandNames(brand)
                setRemovedBrand(brand)
              }}>
                <Image style={{height: 8, width: 8,tintColor: '#fff'}} source={require('../../assets/icons/closewhite.png')} />
              </Pressable>
            </View>)}
            {selectedDate && <View style={styles.filteredView}>
              <Text style={styles.brandName}>{selectedDate}</Text>
              <Pressable style={styles.closeBtnContainer} hitSlop={{top: 5, left: 5, bottom: 5, right: 5}} onPress={() => setSelectedDate(null)}>
                <Image style={{height: 8, width: 8,tintColor: '#fff'}} source={require('../../assets/icons/closewhite.png')} />
              </Pressable>
            </View>}
          </ScrollView>
          {selectedIndex ? <Pressable hitSlop={{top: 10, left: 10, bottom: 10, right: 10}} style={[styles.closeBtn, {top: (showDetailViewHeight + 20) || 0}]} onPress={() => updateIndex(0)}>
            <Image style={styles.closeImg} source={require('../../assets/icons/close.png')} />
          </Pressable>: null }
          <ScrollView style={{flex: 1, paddingHorizontal: 8}} contentContainerStyle={{flexGrow: 1}} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {!selectedIndex ? 
            <>
            <Text style={styles.gernalHeading}>{totalMultiLabelShowrooms && totalMultiLabelShowrooms[0]?.title}</Text>
            {renderShowrooms}
            </>
            : selectedIndex === 2 ? 
            renderBrands
            : 
            <ShowroomCalendarView selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedIndex={setSelectedIndex} />
            }
          </ScrollView>
        </View>
      </View> 
      }
    </View>
  );
}

MultiLabelShowroom.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

MultiLabelShowroom.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    totalMultiLabelShowrooms: state.cities.multiLabelShowrooms,
    loading: state.cities.loading,
  }
}

export default connect(mapStateToProps, {
  fetchMultiLabelShowrooms
})(MultiLabelShowroom)


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
  // headingMainContainer: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#000000',
  //   borderTopColor: '#000000',
  //   borderTopWidth: 1,
  //   marginTop: -1,
  //   flexDirection: 'row',
  //   marginHorizontal: 8,
  //   flexWrap: 'wrap'
  // },
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
    backgroundColor:'black',
    padding: 3,
    borderRadius: 4
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 14,
    width: 14,
    tintColor: '#fff'
  },
  alphaCharacter: {
    color: '#999696',
    fontSize: 16,
  },
  filteredView: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 10,
  },
  brandName: {
    color: '#646464',
    fontSize: 25,
    textTransform: 'capitalize',
  },
  closeBtnContainer: {
    backgroundColor:'black',
    padding: 3,
    borderRadius: 9,
    marginLeft: 4
  },
  noEvents: {
    fontSize: 20,
    color: '#B8B8B8',
    paddingVertical: 20,
    textAlign: 'center'
  },
})
