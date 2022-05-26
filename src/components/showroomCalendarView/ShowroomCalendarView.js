import React, { useState } from 'react'
import {
  StyleSheet, View
} from 'react-native'
import { connect } from 'react-redux'
import { Calendar } from "react-native-calendars";

const ShowroomCalendarView = ({ setSelectedDate, selectedDate,setSelectedIndex }) => {
  // const [markedDates, setMarkedDates] = useState({});

  return(
    <View style={styles.row}>
      <Calendar
        style={{
          marginTop: 40
        }}
        
        onDayPress={(day) => {
          setSelectedIndex(0);
          setSelectedDate(day.dateString);
          
        }}
        monthFormat={"yyyy MMM"}
        hideDayNames={false}
        markingType={'period'}
        markedDates={{[selectedDate]: {
          marked: true,
          color: 'black',
          textColor: 'white',
          startingDay: true,
          endingDay: true
        }}}
        theme={{
          selectedDayBackgroundColor: '#646464',
          selectedDayTextColor: 'white',
          monthTextColor: 'blue',
          dayTextColor: 'black',
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
          arrowColor: '#e6e6e6',
          dotColor: 'black'
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(ShowroomCalendarView)


const styles = StyleSheet.create({

})
