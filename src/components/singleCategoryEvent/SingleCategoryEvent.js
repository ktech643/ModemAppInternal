import React, { useState,useEffect } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Image, Pressable, Linking ,Animated,Easing
} from 'react-native'
import Pin from '../../assets/icons/pin.png'
import User from '../../assets/icons/addContact.png'
import UserAdded from '../../assets/icons/contact.png'
import dummyimg from '../../assets/img/post2.png'
import Star from '../../assets/icons/star.png'
import Mail from '../../assets/icons/mail.png'
import insta from '../../assets/icons/insta.png'
import website from '../../assets/icons/website.png'
import twitter from '../../assets/icons/twitter.png'
import fb from '../../assets/icons/fb.png'
import AlertModal from '../../components/alertModal'
import AutoHeightWebView from 'react-native-autoheight-webview'

const SingleCategoryEvent = props => {
  const { brandEventData } = props
  const [addContact, setAddContact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0))
  brandEventData.dates = brandEventData?.dates?.replace("->", "\n");
  brandEventData.description = brandEventData?.description?.replace("<br />", "\n");
  const img = brandEventData.path_image ? { uri: brandEventData.path_image } : dummyimg
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }, [])
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })
  return(
    <View style={styles.container}>
      {brandEventData.path_image ? <TouchableOpacity style={{marginHorizontal: '6%'}} onPress={() => setShowDetails(!showDetails)}>
        <Image source={img} resizeMode="contain" style={styles.showroomImg} />
      </TouchableOpacity> : null }
      <View style={styles.user}>
        <Pressable onPress={() => setShowDetails(!showDetails)} style={{width: '94%', flexDirection: 'row'}}>
          {brandEventData?.name ? <Animated.Image source={Star} style={[styles.star,{transform: [{ rotate: spin }]}]}/> : <View style={styles.star}></View>}
          <Text style={styles.contactName}>
            { brandEventData?.name.replace(/&amp;\s*\/?/mg, '& ').replace(/&quot;\s*\/?/mg, '"') }
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image source={addContact ? UserAdded : User} style={styles.addUser} /> 
            </TouchableOpacity>
          </Text>
        </Pressable>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.alignCenter}>
          {brandEventData?.link_gm ? <TouchableOpacity style={styles.pinIconContainer} onPress={() => Linking.openURL(brandEventData?.link_gm)}>
            <Image source={Pin} style={styles.pinIcon} />
          </TouchableOpacity> : <></>}
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.eventDuration}>{brandEventData?.type}</Text>
        <Text style={styles.eventDuration}>{brandEventData?.dates.replace(/<br\s*\/?>/gi, "\n")}</Text>
      </View>
      {showDetails && 
      <View style={styles.showroomDetails}>
        <View style={{borderTopColor: '#b2b2b2', borderTopWidth: 1, padding: 10}}>
          
        </View>
        <View style={{padding: 10}}>
          <Text style={styles.additionalInfo}>{brandEventData?.name}</Text>
          <Text style={styles.additionalInfo}>{brandEventData?.address.replace(/<br\s*\/?>/gi, "\n")}</Text>
          {brandEventData?.contact1_email ? 
          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`mailto:${brandEventData.contact1_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`)}>
            <Text style={styles.additionalInfo}>{brandEventData.name}</Text>
            <Image source={Mail} style={styles.mail} />
          </TouchableOpacity> : null}
          {brandEventData?.contact2_email ? 
          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`mailto:${brandEventData.contact2_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`)}>
            <Text style={styles.additionalInfo}>{brandEventData.contact2_email}</Text>
            <Image source={Mail} style={styles.mail} />
          </TouchableOpacity> : null}
          {brandEventData?.phone ? 
          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`tel://${brandEventData.phone}`)}>
            <Text style={styles.additionalInfo}>mobile: </Text>
            <Text style={styles.additionalInfo}>{brandEventData.phone}</Text>
          </TouchableOpacity> : null }
          {brandEventData?.contact2_phone ? 
          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`tel://${brandEventData.contact2_phone}`)}>
            <Text style={styles.additionalInfo}>mobile: </Text>
            <Text style={styles.additionalInfo}>{brandEventData.contact2_phone}</Text>
          </TouchableOpacity> : null }
          {brandEventData?.contact1_phone ? 
          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`tel://${brandEventData.contact1_phone}`)}>
            <Text style={styles.additionalInfo}>mobile: </Text>
            <Text style={styles.additionalInfo}>{brandEventData.contact1_phone}</Text>
          </TouchableOpacity> : null }
          <View style={styles.padding10}>
            {brandEventData?.website ? <TouchableOpacity style={styles.infoIconContainer} onPress={() => brandEventData?.website && Linking.openURL(brandEventData?.website)}>
              <Image source={website} style={[styles.icon,{width:16}]} />
            </TouchableOpacity>: null}
            {brandEventData?.facebook ? <TouchableOpacity style={styles.infoIconContainer} onPress={() => brandEventData?.facebook && Linking.openURL(brandEventData?.facebook)}>
              <Image source={fb} style={styles.icon} />
            </TouchableOpacity>: null}
            {brandEventData?.instagram ? <TouchableOpacity style={styles.infoIconContainer} onPress={() => brandEventData?.instagram && Linking.openURL(brandEventData?.instagram)}>
              <Image source={insta} style={[styles.icon,{width:16}]} /> 
            </TouchableOpacity> : null}
            {brandEventData?.twitter ? <TouchableOpacity style={styles.infoIconContainer} onPress={() => brandEventData?.twitter && Linking.openURL(brandEventData?.twitter)}>
              <Image source={twitter} style={[styles.icon,{width:16}]} />
            </TouchableOpacity> : null}
          </View>
          <AutoHeightWebView
            automaticallyAdjustContentInsets={false}
            source={{html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 20px; padding-right: 50px;">${brandEventData.description.replace(/<br\s*\/?>/gi, "\n")}</p></body></html>`}}
          />
        </View>
      </View>}
      <AlertModal
        body={`"My Modem – the personal concierge" will be launched soon. You will be able to create your personalized APP here by selecting information according to your interests.`}
        title='My Modem'
        button='OK'
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </View>
  );
}

export default SingleCategoryEvent


const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 7,
    paddingBottom: 13,
    marginBottom: -0.8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10
  },
  contactName: {
    color: 'black',
    fontSize: 26,
  },
  infoIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 0
  },
  icon: {
    height: 16,
    width: 6
  },
  addUser: {
    height: 18,
    width: 18,
    marginLeft: 6,
    marginBottom: 3
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  playIcon: {
    height: 10,
    width: 10 
  },
  playIconContainer: {
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  pinIconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 6,
    width: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 0,
    marginVertical: 5
  },
  pinIcon: {
    height: 18,
    width: 12
  },
  innerContainer: {
    marginLeft: 24,
    marginRight: 10
  },
  showroomImg: {
    height: 200,
    width: '100%',
    marginVertical: 15
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  star: {
    height: 14,
    width: 14,
    marginRight: 5,
    marginTop: 9
  },
  www: {
    color: 'black',
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 16,
    marginRight: 4
  },
  eventDuration: {
    color: '#646464',
    fontSize: 18
  },
  showroomDetails: {
    borderColor: '#b2b2b2',
    borderWidth: 1,
    marginVertical: 10
  },
  additionalInfo: {
    color: '#000000',
    fontSize: 18,
  },
  padding10: {
    padding: 10,
    flexDirection:'row'
  },
  mail: {
    height: 12,
    width: 17,
    marginHorizontal: 8
  },
  customWwwBtn: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
})

