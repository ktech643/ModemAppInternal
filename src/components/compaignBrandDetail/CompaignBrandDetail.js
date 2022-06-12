import React, { useState } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity, Image, Linking
} from 'react-native'
import User from '../../assets/icons/addContact.png'
import UserAdded from '../../assets/icons/contact.png'
import Location from '../../assets/icons/location.png'
import I from '../../assets/icons/i.png'
import AutoHeightWebView from 'react-native-autoheight-webview'
import AlertModal from '../../components/alertModal'
import WebViewModal from '../../components/webViewModal'

const CompaignBrandDetail = props => {
  const { brand, index, length, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  const renderBrandDetails = showDetails && <View style={styles.showroomDetails}>
    <Text style={styles.additionalInfo}>Sales {brand?.address.replace(/<br\s*\/?>/mg,"\n", '\n')+' '+brand?.dates.replace(/<br\s*\/?>/mg,"\n", '\n')}</Text>
    <View style={{paddingBottom: 10, paddingTop: 20}}>
      <Text style={styles.additionalInfo}>{brand?.name.replace(/&amp;\s*\/?/mg, '& ')}</Text>
      <Text style={styles.additionalInfo}>{brand?.address.replace(/<br\s*\/?>/mg,"\n", '\n').replace(/&amp;\s*\/?/mg, '& ')}</Text>
    </View>
    <AutoHeightWebView
      automaticallyAdjustContentInsets={false}
      source={{html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 18px; padding: 0;">${brand?.comments.replace(/&amp;\s*\/?/mg, '& ')}</p></body></html>`}}
    />
    {/* <View style={{paddingBottom: 10, paddingTop: 20}}>
      <Text style={styles.additionalInfo}>Women’s RTW, Men’s RTW</Text>
      <Text style={styles.additionalInfo}>Men’s Accessories : Scarves</Text>
      <Text style={styles.additionalInfo}>Women’s Accessories : Scarves</Text>
    </View> */}
  </View>

  return(
    <View style={[styles.container, {borderBottomWidth: (index === (length-1)) ? 0 : 1}]}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={{maxWidth: '85%'}}>
          <Text style={styles.contactName}>{brand?.name.replace(/&amp;\s*\/?/mg, '& ')}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image source={addContact ? UserAdded : User} style={styles.addUser} /> 
        </TouchableOpacity> */}
      </View>
      <View style={styles.alignCenter}>
        {brand?.miniwebsite_login && brand?.miniwebsite_type ?
        <TouchableOpacity style={styles.infoIconContainer} onPress={() => setWebModal(true)}>
          <Image source={I} style={styles.icon} />
        </TouchableOpacity> : null }
        {brand?.link_gm ?
        <TouchableOpacity style={styles.locationIconContainer} onPress={() => Linking.openURL(brand?.link_gm)}>
          <Image source={Location} style={styles.location} />
        </TouchableOpacity> : null}
      </View>
      {renderBrandDetails}
      <AlertModal
        body={`"My Modem – the personal concierge" will be launched soon.You will be able to create your personalized APP here by selecting information according to your interests.`}
        title='My Modem'
        button='OK'
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WebViewModal 
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={brand?.miniwebsite_login}
        miniWebsiteType={brand?.miniwebsite_type}
      />
    </View>
  );
}

export default CompaignBrandDetail

const styles = StyleSheet.create({

  container: {
    borderBottomColor: 'black',
    paddingTop: 7,
    paddingBottom: 13,
    // backgroundColor: 'grey'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  contactName: {
    color: 'black',
    fontSize: 26,
  },
  addUser: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  icon: {
    height: 16,
    width: 6
  },
  infoIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 5
  },
  locationIconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 8
  },
  location: {
    height: 18,
    width: 11
  },
  addUser: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  showroomDetails: {
    borderColor: '#b2b2b2',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    marginLeft: '-24%'
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
    marginRight: 8
  },
})

