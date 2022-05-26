import React from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native'
import { connect,useSelector } from 'react-redux'
import { reload } from '../../redux/actions/citiesActions'
const compaignList = {
  'multilabel-showrooms': {
    text: 'Multi Label Showrooms',
    link: 'AgendaMultiLabelShowrooms'
  },
  'designer-showrooms': {
    text: 'Brands Showroom',
    link: 'AgendaBrandsShowrooms'
  },
  'tradeshows': {
    text: 'Trade Shows',
    link: 'AgendaTradeShows'
  }
}

const MonthWiseFashionWeekAgenda = props => {
  const { fashionWeekAgenda, month,statedata, navigation } = props;
  const reloaded = useSelector((state)=>state.app.reloaddata)
  reload(true);
console.log('reloaded',statedata)
  return(
    <>
      {fashionWeekAgenda.length && month === 'digital' ? <View style={styles.monthWiseContainer}>
        { month !== 'digital' ? <Text style={[styles.showTitle, styles.monthTitle]}>{month}</Text> : null }
        <View style={{padding: 15}}>
          {fashionWeekAgenda.map((e, key) => <View key={key} style={{
            ...styles.digitalInnerContainer,
            borderTopWidth: month === 'digital' ? 0 : 1
          }}>
              {e?.dates ? <Text style={styles.durationDate}>{e.dates}</Text> : null}
              <Text style={styles.showTitle}>{e?.name}</Text>
              {e.content.map((c, key) => <TouchableOpacity key={key} onPress={() => {
              navigation.navigate(compaignList[c].link, {other: true})
            }}>
                  <Text style={styles.eventName}>{compaignList[c].text}</Text>
                </TouchableOpacity>)}
            </View>)}
        </View>
      </View> : null}
      {fashionWeekAgenda.length && month !== 'digital' ? <View style={styles.monthWiseContainer}>
        {/* <Text style={[styles.showTitle, styles.monthTitle]}>{month}</Text> */}
        <View style={[styles.showsContainer, {justifyContent: fashionWeekAgenda.length > 1 ? 'space-evenly' : 'flex-start', paddingHorizontal: fashionWeekAgenda.length > 1 ? 0 : 15}]}>
          {fashionWeekAgenda.length ? fashionWeekAgenda.map((agenda, key) => <View key={key} style={styles.singleShow}>
            <Text style={styles.durationDate}>{agenda?.dates ?  agenda.dates : 'no date available'}</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("Cities", {screen: 'Shows', params: {fashionweekId: agenda?.fashionweek_id}}); reload(!reloaded)}}>
              <Text style={styles.showTitle}>{agenda?.name.replace(/&amp;\s*\/?/mg, '& ')}</Text>
            </TouchableOpacity>
          </View>) : null}
        </View>
      </View> : null}
    </>
  );
}


const mapStateToProps = state => {
  return {
    statedata: state.cities.statedata
  }
}

export default connect(mapStateToProps, {
  
})(MonthWiseFashionWeekAgenda)


const styles = StyleSheet.create({
  monthWiseContainer: {
    borderColor: '#b2b2b2',
    borderWidth: 1,
    marginBottom: 40,
  },
  showTitle: {
    color: 'black',
    fontSize: 26,
    marginBottom: 30
  },
  monthTitle: {
    padding: '4%',
    textTransform: 'capitalize'
  },
  showsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  mt30: {
    marginTop: 30
  },
  eventName: {
    color: 'black',
    fontSize: 26,
  },
  digitalInnerContainer: {
    borderTopColor: '#b2b2b2',
    borderTopWidth: 1,
    paddingTop: 10
  }
})


