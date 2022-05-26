import React from 'react'
import {
  StyleSheet, Text, View
} from 'react-native'
import { connect } from 'react-redux'
import Event from '../event'
import moment from 'moment'

const BrowseByDate = props => {
  const { show, date, navigation } = props;
  const renderShows = show.map((event, key) => <Event navigation={navigation} event={event} key={key}/>)
  return(
    <View>
      <View style={styles.row}>
        <Text style={styles.day}>{moment(date).format('dddd')}</Text>
        <Text style={styles.blueDate}>{date}</Text>
      </View>
      {renderShows}
    </View>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(BrowseByDate)


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    borderTopWidth: 1,
    marginTop: -1,
    paddingVertical: 15,
  },
  day: {
    color: '#0000ff',
    fontSize: 26,
    minWidth: '35%',
    maxWidth: '35%',
    overflow: 'hidden'
  },
  blueDate: {
    color: '#0000ff',
    fontSize: 26,
  },
})


