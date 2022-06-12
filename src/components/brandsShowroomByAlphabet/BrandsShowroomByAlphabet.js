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
import { connect } from "react-redux";
import I from "../../assets/icons/i.png";
import insta from "../../assets/icons/insta.png";
import website from "../../assets/icons/website.png";
import twitter from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/fb.png";
import AlertModal from "../../components/alertModal";
import AutoHeightWebView from "react-native-autoheight-webview";
import WebViewModal from "../../components/webViewModal";

const BrandsShowroomByAlphabet = (props) => {
  const { brandShowroomData, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "60%",
          alignSelf: "center",
        }}
      >
        
        {brandShowroomData?.path_image_advertising1 ? (
          <TouchableOpacity
            style={styles.innerContainerImg}
            onPress={() =>
              brandShowroomData?.link_path_image_advertising1
                ? Linking.openURL(
                    brandShowroomData?.link_path_image_advertising1
                  )
                : {}
            }
          >
            <Image
              source={
                brandShowroomData?.path_image_advertising1
                  ? { uri: brandShowroomData.path_image_advertising1 }
                  : require("../../assets/img/post2.png")
              }
              resizeMode="contain"
              style={styles.showroomImg}
            />
          </TouchableOpacity>
        ) : null}
        {brandShowroomData?.path_image_advertising2 ? (
          <TouchableOpacity
            style={styles.innerContainerImg}
            onPress={() =>
              brandShowroomData?.link_path_image_advertising2
                ? Linking.openURL(
                    brandShowroomData?.link_path_image_advertising2
                  )
                : {}
            }
          >
            <Image
              source={
                brandShowroomData?.path_image_advertising2
                  ? { uri: brandShowroomData.path_image_advertising2 }
                  : require("../../assets/img/post2.png")
              }
              resizeMode="contain"
              style={styles.showroomImg}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.user}>
        <Pressable
          onPress={() => setShowDetails(!showDetails)}
          style={styles.nameContainer}
        >
          {brandShowroomData?.name ? (
            <Animated.Image
              source={Star}
              style={[styles.star, { transform: [{ rotate: spin }] }]}
            />
          ) : (
            <View style={styles.star}></View>
          )}
          <Text style={styles.contactName}>
            {brandShowroomData?.name.replace(/&amp;\s*\/?/gm, "& ")}
            {/* <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={addContact ? UserAdded : User}
                style={styles.addUser}
              />
            </TouchableOpacity> */}
          </Text>
        </Pressable>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.alignCenter}>
          {brandShowroomData?.miniwebsite_login ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => setWebModal(true)}
            >
              <Image source={I} style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {brandShowroomData?.link_gm ? (
            <TouchableOpacity
              style={styles.pinIconContainer}
              onPress={() => Linking.openURL(brandShowroomData?.link_gm)}
            >
              <Image source={Pin} style={styles.pinIcon} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.eventDuration}>
          {brandShowroomData?.dates?.replace(/<br\s*\/?>/gi, "\n")}
        </Text>
      </View>
      {showDetails && (
        <View style={styles.showroomDetails}>
          {brandShowroomData?.parent_name ?
          <Text style={[styles.additionalInfo, styles.customPadding]}>
          {brandShowroomData.parent_name}
        </Text> : <></>  
        }
          
          <Text style={[styles.additionalInfo, styles.customPadding]}>
            {brandShowroomData.address}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            {brandShowroomData?.contact1_email ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${brandShowroomData.contact1_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact1_name}{" "}
                </Text>
                {/* <Text style={styles.additionalInfo}>{brandShowroomData.contact1_email}</Text> */}
                <Image source={Mail} style={styles.mail} />
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.contact2_email ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${brandShowroomData.contact2_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact2_name}{" "}
                </Text>
                {/* <Text style={styles.additionalInfo}>{brandShowroomData.contact2_email}</Text> */}
                <Image source={Mail} style={styles.mail} />
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.contact1_mobile ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.contact1_mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact1_mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.contact2_mobile ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.contact2_mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact2_mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.contact1_phone ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.contact1_phone}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact1_phone}
                </Text>
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.contact2_phone ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.contact2_phone}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.contact2_phone}
                </Text>
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.mobile ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {brandShowroomData?.phone ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(`tel://${brandShowroomData.phone}`)
                }
              >
                <Text style={styles.additionalInfo}>mobile: </Text>
                <Text style={styles.additionalInfo}>
                  {brandShowroomData.phone}
                </Text>
              </TouchableOpacity>
            ) : null}
            <View style={styles.padding10}>
              {brandShowroomData?.website ? (
                <TouchableOpacity
                  style={styles.infoIconContainer}
                  onPress={() => Linking.openURL(brandShowroomData?.website)}
                >
                  <Image
                    source={website}
                    style={[styles.icon, { width: 16 }]}
                  />
                </TouchableOpacity>
              ) : null}
              {brandShowroomData?.instagram ? (
                <TouchableOpacity
                  style={styles.infoIconContainer}
                  onPress={() => Linking.openURL(brandShowroomData?.instagram)}
                >
                  <Image source={insta} style={[styles.icon, { width: 16 }]} />
                </TouchableOpacity>
              ) : null}
              {brandShowroomData?.facebook ? (
                <TouchableOpacity
                  style={styles.infoIconContainer}
                  onPress={() => Linking.openURL(brandShowroomData?.facebook)}
                >
                  <Image source={fb} style={styles.icon} />
                </TouchableOpacity>
              ) : null}
              {brandShowroomData?.twitter ? (
                <TouchableOpacity
                  style={styles.infoIconContainer}
                  onPress={() => Linking.openURL(brandShowroomData?.twitter)}
                >
                  <Image
                    source={twitter}
                    style={[styles.icon, { width: 16 }]}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {brandShowroomData?.collection ? (
            <View
              style={{
                borderTopColor: "#b2b2b2",
                borderTopWidth: 1,
                padding: 10,
              }}
            >
              <AutoHeightWebView
                automaticallyAdjustContentInsets={false}
                source={{
                  html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 18px; padding: 0;">${brandShowroomData?.collection}</p></body></html>`,
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      <AlertModal
        body='"My Modem – the personal concierge" will be launched soon.You will be able to create your personalized APP here by selecting information
  according to your interests.'
        title="My Modem"
        button="OK"
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WebViewModal
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={brandShowroomData?.miniwebsite_login}
        miniWebsiteType={brandShowroomData?.miniwebsite_type}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    // loading: state.cities.loading,
  };
};

export default connect(mapStateToProps, {})(BrandsShowroomByAlphabet);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingTop: 7,
    paddingBottom: 13,
    marginBottom: -0.8,
  },
  innerContainerImg: {
    marginHorizontal: "6%",
    width: "100%",
  },
  showroomImg: {
    height: 200,
    width: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  contactName: {
    color: "black",
    fontSize: 26,
    flexDirection: "row",
  },
  addUser: {
    height: 18,
    width: 18,
    marginLeft: 6,
    marginBottom: 3,
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
    marginLeft: 24,
    marginRight: 10,
  },
  showroomImg: {
    height: 200,
    width: "100%",
    // backgroundColor:'yellow'
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  additionalInfo: {
    color: "#000000",
    fontSize: 18,
  },
  padding10: {
    padding: 10,
    flexDirection: "row",
  },
  mail: {
    height: 12,
    width: 17,
    marginHorizontal: 8,
  },
  customWwwBtn: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  customPadding: {
    paddingHorizontal: 10,
    paddingBottom: 6,
    paddingTop: 10,
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
  nameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "94%",
  },
});
