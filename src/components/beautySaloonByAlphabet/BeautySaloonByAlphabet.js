import React, { useState } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Image, Linking
} from 'react-native'
import User from '../../assets/icons/addContact.png'
import UserAdded from '../../assets/icons/contact.png'
import Pin from '../../assets/icons/pin.png'
import Mail from '../../assets/icons/mail.png'
import I from '../../assets/icons/i.png'
import website from '../../assets/icons/website.png'
import AlertModal from '../../components/alertModal'
import WebViewModal from '../../components/webViewModal'
// import Star from '../../assets/icons/star.png'

const BeautySaloonByAlphabet = props => {
  const { saloon, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  
  return(
    <View style={styles.container}>
      <View style={styles.user}>
        {/* <Image source={Star} style={styles.star}/> */}
        <TouchableOpacity style={{maxWidth: '80%'}}>
          <Text style={styles.contactName}>{saloon?.name.replace(/&amp;\s*\/?/mg, '& ')}
            {/* <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image source={addContact ? UserAdded : User} style={styles.addUser} /> 
            </TouchableOpacity> */}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.alignCenter}>
            {saloon?.miniwebsite_login && saloon?.miniwebsite_type ?
            <TouchableOpacity style={styles.infoIconContainer} onPress={() => setWebModal(true)}>
              <Image source={I} style={styles.icon} />
            </TouchableOpacity> : null}
            {saloon?.link_gm ? 
            <TouchableOpacity style={styles.saloon} onPress={() => Linking.openURL(saloon?.link_gm)}>
              <Image source={Pin} style={styles.pinIcon} />
            </TouchableOpacity> : null }
          {/* <Text style={styles.eventDuration}>{singleShowroom?.dates.replace(/<br\s*\/?>/gi, "\n")}</Text> */}
        </View>
        <Text style={styles.eventDuration}>{saloon?.address}</Text>
        {saloon?.phone ? 
        <TouchableOpacity onPress={() => Linking.openURL(`tel://${saloon.phone}`)}>
          <Text style={styles.eventDuration}>P: {saloon.phone}</Text>
        </TouchableOpacity>: null }
        {saloon?.email ? 
        <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`mailto:${saloon.email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`)}>
          <Text style={styles.eventDuration}>{saloon.name}</Text>
          <Image source={Mail} style={styles.mail} />
        </TouchableOpacity>: null }
        {saloon?.website ?
        <TouchableOpacity style={styles.infoIconContainer} onPress={() => Linking.openURL(saloon.website)}>
          <Image source={website} style={[styles.icon,{width:16}]} />
        </TouchableOpacity> : null}
      </View>
        
      <AlertModal
        body={`"My Modem – the personal concierge" will be launched soon.You will be able to create your personalized APP here by selecting information
  according to your interests.`}
        title='My Modem'
        button='OK'
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WebViewModal 
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={saloon?.miniwebsite_login}
        miniWebsiteType={saloon?.miniwebsite_type}
      />
    </View>
  );
}

export default BeautySaloonByAlphabet


const styles = StyleSheet.create({
  container: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    paddingTop: 7,
    paddingBottom: 13,
    marginTop: -1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10
  },
  contactName: {
    color: 'black',
    fontSize: 26,
    flexDirection: 'row',
    marginTop: 5
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
    marginVertical: 6
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
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 4
  },
  pinIcon: {
    height: 16,
    width: 9
  },
  innerContainer: {
    marginLeft: 24,
    marginRight: 10
  },
  showroomImg: {
    height: 200,
    width: '100%',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 14,
    width: 14,
    marginRight: 10
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
    padding: 10
  },
  mail: {
    height: 12,
    width: 17,
    marginHorizontal: 8
  },
  infoIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 5,
    marginTop: 5
  },
  icon: {
    height: 16,
    width: 6
  },
})

