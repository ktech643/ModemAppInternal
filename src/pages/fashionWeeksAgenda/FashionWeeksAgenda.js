import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Linking,ScrollView, ActivityIndicator, RefreshControl,Dimensions,TouchableOpacity,Image
} from 'react-native'
import { connect } from 'react-redux'
import { fetchFashionWeeksAgenda } from '../../redux/actions/agendasActions'
import MonthWiseFashionWeekAgenda from '../../components/monthWiseFashionWeekAgenda'
import Carousel from 'react-native-snap-carousel'
const FashionWeeksAgenda = props => {
  const { loading, fetchFashionWeeksAgenda, allFashionWeeksAgendas, navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [season, setSeason] = useState('');
  const [year, setYear] = useState(2022);
  const scrollRef = useRef();
  const [carouselItems , setCarouselItems] = useState(allFashionWeeksAgendas.length && allFashionWeeksAgendas[0]?.banners);
  const windowWidth = Dimensions.get('window').width;
  const ref = useRef(null);
    useEffect(() => {
      fetchFashionWeeksAgenda('');
    }, [])
    // const Apicall = (text) => {
    //   if(text=='next'){
    //     if(season==''){
    //       const param='s=ss&y='+year;
    //       setSeason('summer')
    //       fetchFashionWeeksAgenda(param);
    //     }
    //     if(season=='summer'){
    //       const param='s=fw&y='+year;
    //       setSeason('fall')
    //       fetchFashionWeeksAgenda(param);
    //     }
    //     if(season=='fall'){
    //       const years=year+1;
    //       const param='s=ss&y='+years;
    //       setSeason('summer')
    //       setYear(years)
    //       fetchFashionWeeksAgenda(param);
    //     }
    //   }
    //   if(text=='pre'){
    //     if(season==''){
    //       const param='s=fw&y='+year;
    //       setSeason('fall')
    //       fetchFashionWeeksAgenda(param);
    //     }
    //     if(season=='fall'){
    //       const param='s=ss&y='+year;
    //       setSeason('summer')
    //       fetchFashionWeeksAgenda(param);
    //     }
    //     if(season=='summer'){
    //       const years=year-1;
    //       const param='s=fw&y='+years;
    //       setSeason('fall')
    //       setYear(years)
    //       fetchFashionWeeksAgenda(param);
    //     }
    //   }
    // }
  const onRefresh = () => {
    fetchFashionWeeksAgenda();
  }
  const renderBannerCarousel = useCallback(({ item, key }) => (
    <View style={styles.bottomHorizontalBanners}>
      <TouchableOpacity 
          onPress={() => item?.link && Linking.openURL(item.link)}
        > 
        <Image resizeMode='contain' source={item?.path_image ? {uri: item.path_image} : require('../../assets/img/home-v2-dummy1.png')} style={[styles.postImage, {minWidth: '100%', width: windowWidth > 385 ? 350 : 320 }]}/>
      </TouchableOpacity>
    </View>
  ), []);

  const renderMonthWiseFashionAgendas = (allFashionWeeksAgendas.length && Object.keys(allFashionWeeksAgendas[0].indexes).length) ? Object.keys(allFashionWeeksAgendas[0].indexes).map((index, key) => <MonthWiseFashionWeekAgenda 
    key={key}
    fashionWeekAgenda={allFashionWeeksAgendas[0].indexes[index]}
    month={index}
    navigation={navigation}
  />) : <Text style={styles.noEvents}>There are no agendas in this category.</Text> 
    
  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
    {loading ? <View style={styles.centerMe}><ActivityIndicator size="large" color= "black"/></View>
      :
      <View style={{flex: 1}}>
        {/* <StatusBar barStyle="dark-content"/> */}
        <View style={styles.rootContainer}>
          <View style={styles.cityDetailsBtn}>
            <Text style={styles.cityName}>Fashion Weeks Agenda</Text>
          </View>
          
          <ScrollView style={{flex: 1, paddingHorizontal: 8}} contentContainerStyle={{flexGrow: 1}} ref={scrollRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{paddingVertical: 60}}>
              <Text style={styles.gernalHeading}>{allFashionWeeksAgendas && allFashionWeeksAgendas[0]?.title}</Text>
            </View>
            {/* <View style={{flexDirection:'row',marginBottom:5,justifyContent:'space-around'}}>
              <View style={{flex:.5,paddingLeft:5,flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{fetchFashionWeeksAgenda(allFashionWeeksAgendas[0].previous_season_url);}} style={{padding:10,borderRadius:5,backgroundColor:'grey',width:80}}>
                  <Text style={{color:'white'}}>Previous</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:.5,paddingRight:5,justifyContent:'flex-end',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{fetchFashionWeeksAgenda(allFashionWeeksAgendas[0].next_season_url);}} style={{padding:10,borderRadius:5,backgroundColor:'grey',width:80,alignItems:'center'}}>
                  <Text style={{color:'white'}}>Next</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={()=>{fetchFashionWeeksAgenda(allFashionWeeksAgendas[0].previous_season_url);}} style={styles.btn}>
                <Image source={require('../../assets/icons/arrowleft.png')} style={styles.leftArrow}/>
                <Text style={styles.btnText}>Previous Season</Text>
              </TouchableOpacity>
              <View style={{backgroundColor: 'grey', width: 1}}></View>
              <TouchableOpacity onPress={()=>{fetchFashionWeeksAgenda(allFashionWeeksAgendas[0].next_season_url);}} style={styles.btn}>
                <Text style={styles.btnText}>Next Season</Text>
                <Image source={require('../../assets/icons/rightarrow.png')} style={styles.arrow}/>
              </TouchableOpacity>
            </View>
            {renderMonthWiseFashionAgendas}
            {/*
            <View style={styles.borderlessMonthContainer}>
              <Text style={[styles.showTitle, styles.monthTitle]}>March 2022</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                <View style={styles.singleShow}>
                  <Text style={styles.durationDate}>Mar. 18–Mar. 31</Text>
                  <TouchableOpacity>
                    <Text style={styles.showTitle}>Rakuten Fashion Week Tokyo</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleShow}>
                  <Text style={styles.durationDate}>Mar. 14–18</Text>
                  <TouchableOpacity>
                    <Text style={styles.showTitle}>Berlin Fashion Week</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleShow}>
                  <Text style={styles.durationDate}>Mar. 17–21</Text>
                  <TouchableOpacity>
                    <Text style={styles.showTitle}>Seoul Fashion Week</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleShow}>
                  <Text style={styles.durationDate}>Mar. 18–23</Text>
                  <TouchableOpacity>
                    <Text style={styles.showTitle}>Shanghai Fashion Week</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={require('../../assets/img/event.png')} style={styles.eventImg} />
                  <Image source={require('../../assets/img/event.png')} style={styles.eventImg} />
                </View>
              </View>
            </View> */}
            <View style={{backgroundColor: '#f2f2f2'}}>
              <Carousel
                hasParallaxImages={true}
                layout={'default'}
                loop
                autoplayInterval={7000}
                useNativeDriver
                autoplay={true}
                ref={ref}
                data={carouselItems || []}
                sliderWidth={windowWidth}
                itemWidth={windowWidth - 50}
                renderItem={renderBannerCarousel}
              />
            </View>
          </ScrollView>
        </View>
      </View> 
      }
    </View>
  );
}


FashionWeeksAgenda.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

FashionWeeksAgenda.defaultProps = {
  navigation: { navigate: () => null },
}

const mapStateToProps = state => {
  return {
    loading: state.agendas.loading,
    allFashionWeeksAgendas: state.agendas.fashionWeeksAgendas
  }
}

export default connect(mapStateToProps, {
  fetchFashionWeeksAgenda
})(FashionWeeksAgenda)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  postImage: {
    width: 350,
    // marginRight: 12,
    height: 230,
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
  bottomHorizontalBanners: {
    height: 230,
    maxHeight: 230,
    marginLeft: Platform.OS === 'ios' ? '-1%' : 0,
    // backgroundColor: '#f2f2f2'
  },
  cityName: {
    fontSize: 26,
    textTransform: 'uppercase',
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
    marginHorizontal: 8
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
  },
  closeBtn: {
    top: 135,
    right: 12,
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    zIndex:2,
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 16,
    width: 16
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
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    marginBottom: 40
  },
  showsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  monthWiseContainer: {
    borderColor: '#b2b2b2',
    borderWidth: 1,
    marginBottom: 40,
  },
  borderlessMonthContainer: {
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 40,
  },
  singleShow: {
    borderTopColor: '#b2b2b2',
    borderTopWidth: 1,
    width: '44%',
    paddingTop: 10,
  },
  durationDate: {
    color: '#b2b2b2',
    fontSize: 18,
  },
  showTitle: {
    color: 'black',
    fontSize: 26,
    marginBottom: 30
  },
  monthTitle: {
    padding: '4%'
  },
  eventImg: {
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40
  },
  noEvents: {
    fontSize: 20,
    color: '#B8B8B8',
    paddingVertical: 20,
    textAlign: 'center'
  },
})
