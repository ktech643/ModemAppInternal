import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, Pressable, Image, ImageBackground
} from 'react-native'
import { fonts } from 'theme'
import ProfilePic from '../../assets/img/Screenshot_298.png'
import Calendar from '../../assets/icons/calendar.png'
import HotEvent from '../../assets/icons/fire.png'
import DummyPost from '../../assets/img/dummy.png'
import moment from 'moment';
import EventParticipation from '../EventParticipation/EventParticipation'

const Post = props => {
  const { post, navigation } = props

  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  return(
    <Pressable style={styles.post} onPress={() => navigation.navigate('EventDetail', post)}>
      <View style={styles.postDetailsContainer}>
        <View style={styles.PostDetails}>
          <Image source={post.user?.images? { uri: post.user.images } : ProfilePic} style={styles.profileImg} />
          <View style={styles.eventDetails}>
            <Text style={styles.companyName}>{post.title}</Text>
            <Text style={styles.companySlogan}>{post.description}</Text>
            <View style={styles.eventTimings}>
              <Image source={Calendar} style={styles.calendar} />
              <Text style={styles.eventDay}>{moment(post.date).format('MMMM Do YYYY')} <Text style={styles.eventTime}>{moment('2021/02/01 '+post.time).format('h:mm A')}</Text></Text>
            </View>
          </View>
        </View>
        <View style={styles.shareContainer}>
          <Image source={HotEvent} style={styles.hotEvent}/>
          <Text style={styles.shares}>{kFormatter(post.likes)}</Text>
        </View>
      </View>
      <View>
        <ImageBackground source={post.images ? { uri: post.images } : DummyPost} style={styles.postPreview}>
          <EventParticipation post={post} />
        </ImageBackground>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  post:{
    marginBottom: 44
  },
  postDetailsContainer: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight: 17,
    marginLeft: 22,
  },
  PostDetails: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '83%',
  },
  shareContainer: {
    display: 'flex',
    flexDirection:'row',
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  eventDetails: {
    marginLeft: 14
  },
  companyName: {
    fontSize: 20,
    fontFamily: fonts.interBold,
    color:'white',
    maxHeight: 48,
    overflow: 'hidden'
  },
  companySlogan: {
    color: '#444455',
    fontSize: 12,
    fontFamily: fonts.interSemibold,
    maxHeight: 28
  },
  eventDay: {
    fontSize: 13,
    color: '#4dc591',
    fontFamily: fonts.interSemibold,
    marginLeft: 3
  },
  eventTimings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 5,
    marginBottom: 12
  },
  eventTime: {
    color: 'white',
  },
  calendar: {
    height:20,
    width: 20
  },
  hotEvent: {
    height:25,
    width: 25,
    marginRight: 6
  },
  shares: {
    color: '#a30000',
    fontSize: 18,
    fontFamily: fonts.interSemibold,
  },
  postPreview: {
    width: '100%',
    height: 197,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  eventJoinBtn: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.interSemibold,
    paddingHorizontal: 32,
    paddingVertical: 11,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 145,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  pendingStatus: {
    fontFamily: fonts.interSemibold,
    position: 'absolute',
    right: 20,
    top: 160,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinBtnText: {
    color: 'white',
    fontSize: 18
  },
  waiting: {
    height: 18,
    width: 18,
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.interSemibold,
    color: 'black',
    fontWeight: 'bold'
  },
})

Post.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Post.defaultProps = {
  navigation: { navigate: () => null },
}

export default Post
