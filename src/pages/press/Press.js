import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, ActivityIndicator, RefreshControl, TextInput
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import PressOffices from '../../components/pressOffices'
import { fetchPressContacts } from '../../redux/actions/citiesActions'
import { BASEURL } from '../../utils/constants'
import axios from 'axios'
const Shows = props => {
  const { route, loading, fetchPressContacts, totalPressContacts, navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [office, setOffice] = useState(false);
  const [contact, setContact] = useState(false);
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const [alphaPos, setAlphaPos] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [presscontact, setPresscontact] = useState([]);
  const [pressoffice, setPressoffice] = useState([]);
  const scrollRef = useRef();
  const id = route?.params?.cityEvent?.fashionweek_id;
  useEffect(async () => {
      fetchPressContacts(0, id);
   const res=await axios.get(`${BASEURL}/fashion_weeks_press_contacts_api.php?id=${id}&type=${1}`, {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const resp = await axios.get(`${BASEURL}/fashion_weeks_press_contacts_api.php?id=${id}&type=${0}`, {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      setOffice(Array.isArray(resp.data[0].indexes))
      setContact(Array.isArray(res.data[0].indexes))
      setPresscontact(res.data)
      if(Array.isArray(totalPressContacts[0].indexes) && Array.isArray(res.data[0].indexes)){
        console.log('1')
        return setSelectedIndex(0);
      }
      if(!Array.isArray(totalPressContacts[0].indexes)){
        console.log('2')
        setSelectedIndex(0);
        console.log('totalPressContacts',totalPressContacts)
        return;
      }
      if(Array.isArray(totalPressContacts[0].indexes) && !Array.isArray(res.data[0].indexes)){
        console.log('3')
        setSelectedIndex(1);
        fetchPressContacts(1, id);
        return;
      }
      if(!Array.isArray(res.data[0].indexes)){
        console.log('4')
        setSelectedIndex(1);
        fetchPressContacts(1, id);
        return;
      }
  }, [])
  
  const onRefresh = () => {
    if(selectedIndex)
      fetchPressContacts(1, id);
    else
      fetchPressContacts(0, id);
  }

  const updateIndex = (index) => {
    setSelectedIndex(index);
    if(index)
      fetchPressContacts(1, id);
    else
    if(!Array.isArray(totalPressContacts[0].indexes))
      fetchPressContacts(0, id);
  }
  
  const windowHeight = Dimensions.get('window').height;
  const showLetters = totalPressContacts?.length ? Object.keys(totalPressContacts[0].indexes).map(key => <TouchableOpacity onPress={() => {
    scrollRef.current.scrollTo({
      y: alphaPos[key],
      animated: true
    })
  }} key={key}><Text style={styles.letter}>{key}</Text></TouchableOpacity>) : null

  const renderPressOffices = (totalPressContacts && Object.keys(totalPressContacts[0].indexes).length) ? Object.keys(totalPressContacts[0].indexes).map((index, key) => <PressOffices
    navigation={navigation}
    key={key}
    letter={index}
    pressOffice={totalPressContacts[0].indexes[index]}
    alphaPos={alphaPos}
    setAlphaPos={setAlphaPos}
  />) : <Text style={styles.noEvents}>There are no Events</Text>
  return(
    <View style={{flex: 1, backgroundColor: 'white', elevation: 3}}>
    {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View>
    :
      <View style={{flex: 1}}>
        <View
          onLayout={(event) => {
            setLettersViewHeight(event.nativeEvent.layout.height)
          }}
          style={{position: 'absolute', zIndex: 1, right: 5, elevation: 99, flex: 1, top: (((windowHeight - 118) - lettersViewHeight) / 2) || 0}}
        >
          {showLetters}
        </View>

        <View style={{flex: 1}}>
          <StatusBar barStyle="dark-content"/>
          <View style={styles.rootContainer}>
            <View style={styles.cityDetailsBtn}>
              <Text style={styles.cityName}>{route?.params?.cityEvent?.city}</Text>
              <Text style={styles.date}>{route?.params?.cityEvent?.dates_collection}</Text>
            </View>
            <ScrollView style={styles.headingMainContainer} horizontal={true} contentContainerStyle={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() =>office?'':updateIndex(0)}>
                <Text style={selectedIndex === 0 && !office ? styles.pressTabBtnActive : styles.pressTabBtn}>press offices</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>presscontact.length && !contact? updateIndex(1):''}>
                <Text style={selectedIndex === 1 &&!contact ? styles.pressTabBtnActive : styles.pressTabBtn}>press contacts</Text>
              </TouchableOpacity>
            </ScrollView>
            <ScrollView style={{flex: 1, paddingHorizontal: 8}} contentContainerStyle={{flexGrow: 1}} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <Text style={styles.gernalHeading}>{totalPressContacts && totalPressContacts[0]?.title}</Text>
              <TextInput editable={false} style={styles.categorySubheading}>{selectedIndex ? 'Press Contacts' : 'Press Offices'} </TextInput>
              {renderPressOffices}
            </ScrollView>
          </View>
        </View>
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
    totalPressContacts: state.cities.pressContacts,
    loading: state.cities.loading,
  }
}

export default connect(mapStateToProps, {
  fetchPressContacts
})(Shows)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
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
  headingMainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1,
    flexDirection: 'row',
    marginHorizontal: 8,
    maxHeight: 65
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
    paddingHorizontal: 10,
    paddingVertical: 50,
    flexWrap: 'wrap'
  },
  categorySubheading: {
    color: '#0000ff',
    fontSize: 26,
    paddingTop: 8,
    borderTopColor: '#000000',
    borderTopWidth: 1,
  },
  noEvents: {
    fontSize: 20,
    color: '#B8B8B8',
    paddingVertical: 20,
    textAlign: 'center'
  },
})
