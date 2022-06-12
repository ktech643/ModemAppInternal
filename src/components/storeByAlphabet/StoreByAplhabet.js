import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import User from "../../assets/icons/addContact.png";
import UserAdded from "../../assets/icons/contact.png";
import Pin from "../../assets/icons/pin.png";
import Star from "../../assets/icons/star.png";
import Mail from "../../assets/icons/mail.png";
import AlertModal from "../../components/alertModal";
import insta from "../../assets/icons/insta.png";
import website from "../../assets/icons/website.png";
import twitter from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/fb.png";
import WebViewModal from "../../components/webViewModal";
import I from "../../assets/icons/i.png";

const StoreByAplhabet = (props) => {
  const { store, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [storeDetails, setstoreDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  console.log("storeDetails", store);
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const renderStoreDetails = store.boutique.map((shop, key) => (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        {store?.miniwebsite_login && store?.miniwebsite_type ? (
          <TouchableOpacity
            style={styles.infoIconContainer}
            onPress={() => setWebModal(true)}
          >
            <Image source={I} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
        {shop?.link_gm ? (
          <TouchableOpacity
            style={styles.pinIconContainer}
            onPress={() => Linking.openURL(shop?.link_gm)}
          >
            <Image source={Pin} style={styles.pinIcon} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.additionalInfo}>
        {shop.address.replace(/&amp;\s*\/?/gm, "& ")}
      </Text>
      {shop.opening_hours_en ? (
        <View style={{ paddingTop: 5 }}>
          <Text style={styles.additionalInfo}>
            {shop.opening_hours_en.replace("<br />", "\n")}
          </Text>
        </View>
      ) : null}
      <View>
        {shop?.phone ? (
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`tel://${shop.phone}`)}
          >
            <Text style={styles.additionalInfo}>T: {shop.phone}</Text>
          </TouchableOpacity>
        ) : null}
        {shop?.email ? (
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              Linking.openURL(
                `mailto:${shop.email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
              )
            }
          >
            <Text style={styles.additionalInfo}>{shop.name}</Text>
            <Image source={Mail} style={styles.mail} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.padding10}>
          {shop?.website ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => shop?.website && Linking.openURL(shop?.website)}
            >
              <Image source={website} style={[styles.icon, { width: 16 }]} />
            </TouchableOpacity>
          ) : null}
          {shop?.facebook ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => shop?.facebook && Linking.openURL(shop?.facebook)}
            >
              <Image source={fb} style={styles.icon} />
            </TouchableOpacity>
          ) : null}
          {shop?.instagram ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() =>
                shop?.instagram && Linking.openURL(shop?.instagram)
              }
            >
              <Image source={insta} style={[styles.icon, { width: 16 }]} />
            </TouchableOpacity>
          ) : null}
          {shop?.twitter ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => shop?.twitter && Linking.openURL(shop?.twitter)}
            >
              <Image source={twitter} style={[styles.icon, { width: 16 }]} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        {store?.name ? (
          <Animated.Image
            source={Star}
            style={[styles.star, { transform: [{ rotate: spin }] }]}
          />
        ) : (
          <View style={styles.star}></View>
        )}
        <Pressable
          onPress={() => setstoreDetails(!storeDetails)}
          style={styles.rowCenter}
        >
          <Text style={styles.contactName}>
            {store?.name.replace(/&amp;\s*\/?/gm, " & ")}
          </Text>
          <Text style={[styles.contactName,styles.cityFont]}>
             {store?.city.replace(/&amp;\s*\/?/gm, " & ")}
          </Text>
          {/* <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={addContact ? UserAdded : User}
              style={styles.addUser}
            />
          </TouchableOpacity> */}
        </Pressable>
      </View>
      {storeDetails && (
        <View style={styles.showroomDetails}>
          {storeDetails && renderStoreDetails}
        </View>
      )}
      <AlertModal
        body={`"My Modem – the personal concierge" will be launched soon.You will be able to create your personalized APP here by selecting information
  according to your interests.`}
        title="My Modem"
        button="OK"
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/* <WebViewModal 
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={store?.miniwebsite_login}
        miniWebsiteType={store?.miniwebsite_type}
      /> */}
    </View>
  );
};

export default StoreByAplhabet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityFont: {
    fontSize: 16,
    paddingLeft:6,
    paddingTop:4,
  },
  contactName: {
    color: "black",
    fontSize: 26,
  },
  addUser: {
    height: 18,
    width: 18,
    marginLeft: 6,
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  playIcon: {
    height: 10,
    width: 10,
  },
  playIconContainer: {
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  pinIconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 6,
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  pinIcon: {
    height: 18,
    width: 12,
  },
  innerContainer: {
    marginHorizontal: "6%",
  },
  showroomImg: {
    height: 200,
    width: "100%",
  },
  user: {
    flexDirection: "row",
  },
  star: {
    height: 14,
    width: 14,
    marginRight: 9,
    marginTop: 9,
  },
  www: {
    color: "black",
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 16,
    marginRight: 4,
  },
  eventDuration: {
    color: "#646464",
    fontSize: 18,
  },
  showroomDetails: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  additionalInfo: {
    color: "#000000",
    fontSize: 18,
    marginTop: 5,
  },
  padding10: {
    padding: 10,
    flexDirection: "row",
  },
  mail: {
    height: 12,
    width: 17,
    marginRight: 8,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 5,
  },
  icon: {
    height: 16,
    width: 6,
  },
});
