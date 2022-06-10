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
import I from "../../assets/icons/i.png";
import insta from "../../assets/icons/insta.png";
import website from "../../assets/icons/website.png";
import twitter from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/fb.png";
import AlertModal from "../../components/alertModal";
import AutoHeightWebView from "react-native-autoheight-webview";
import WebViewModal from "../../components/webViewModal";
import { fonts } from "../../theme";
const ShowroomByAlphabet = (props) => {
  const { singleShowroom, setOpenedShowroom, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
    setOpenedShowroom(singleShowroom?.contact1_email);
  };
  // console.log('singleShowroom',singleShowroom)
  let datess =
    singleShowroom?.dates.charAt(0).toUpperCase() +
    singleShowroom?.dates.slice(1);
  let dates = datess.replace("<br />", "\n");
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
  console.log("singleShowroom", singleShowroom);
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
       
        {singleShowroom?.path_image_advertising1 ? (
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() =>
              singleShowroom?.link_path_image_advertising1
                ? Linking.openURL(singleShowroom?.link_path_image_advertising1)
                : {}
            }
          >
            <Image
              source={
                singleShowroom?.path_image_advertising1
                  ? { uri: singleShowroom.path_image_advertising1 }
                  : require("../../assets/img/post2.png")
              }
              resizeMode="contain"
              style={styles.showroomImg}
            />
          </TouchableOpacity>
        ) : null}
        {singleShowroom?.path_image_advertising2 ? (
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() =>
              singleShowroom?.link_path_image_advertising2
                ? Linking.openURL(singleShowroom?.link_path_image_advertising2)
                : {}
            }
          >
            <Image
              source={
                singleShowroom?.path_image_advertising2
                  ? { uri: singleShowroom.path_image_advertising2 }
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
          onPress={handleShowDetails}
          style={{ maxWidth: "94%", flexDirection: "row" }}
        >
          {singleShowroom?.name ? (
            <Animated.Image
              source={Star}
              style={[styles.star, { transform: [{ rotate: spin }] }]}
            />
          ) : (
            <View style={styles.star}></View>
          )}
          <Text style={styles.contactName}>
            {singleShowroom?.name.replace(/&amp;\s*\/?/gm, " & ")}
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={addContact ? UserAdded : User}
                style={styles.addUser}
              />
            </TouchableOpacity>
          </Text>
        </Pressable>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.alignCenter}>
          {singleShowroom?.miniwebsite_login &&
          singleShowroom?.miniwebsite_type ? (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => setWebModal(true)}
            >
              <Image source={I} style={styles.icon} />
            </TouchableOpacity>
          ) : null}
          {singleShowroom?.link_gm ? (
            <TouchableOpacity
              style={styles.pinIconContainer}
              onPress={() => Linking.openURL(singleShowroom?.link_gm)}
            >
              <Image source={Pin} style={styles.pinIcon} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* <Text style={styles.eventDuration}>{singleShowroom?.dates.replace(/<br\s*\/?>/gi, "\n")}</Text> */}
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        {singleShowroom?.dates ? (
          <Text style={styles.additionalInfo}>
            {dates}
            {"\n"}
          </Text>
        ) : null}
      </View>
      {showDetails && (
        <View style={styles.showroomDetails}>
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            {singleShowroom?.time ? (
              <Text style={styles.additionalInfo}>
                {singleShowroom?.time}
                {"\n"}
              </Text>
            ) : null}
            {/* <Text style={styles.additionalInfo}>{singleShowroom?.name.replace(/&amp;\s*\/?/mg, ' & ')}</Text> */}
            <Text style={styles.additionalInfo}>
              {singleShowroom?.address.replace(/<br\s*\/?>/gi, "\n")}
            </Text>
          </View>

          <View style={{ paddingVertical: 10 }}>
            {singleShowroom?.contact1_email ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${singleShowroom.contact1_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {singleShowroom?.contact1_name}
                </Text>
                <Image source={Mail} style={styles.mail} />
                {/* <Text style={styles.additionalInfo}>{singleShowroom?.contact1_email}</Text> */}
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.contact2_email ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${singleShowroom.contact2_email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {singleShowroom?.contact2_name}
                </Text>
                <Image source={Mail} style={styles.mail} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.email ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${singleShowroom.email}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {singleShowroom?.name}
                </Text>
                <Image source={Mail} style={styles.mail} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.email2 ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${singleShowroom.email2}?subject=Modem&body=We are your Fashion, Art and Design International Magazine`
                  )
                }
              >
                <Text style={styles.additionalInfo}>
                  {singleShowroom?.name}
                </Text>
                <Image source={Mail} style={styles.mail} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.mobile ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.local_mobile ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.local_mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.local_mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.contact1_mobile ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.contact1_mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.contact1_mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.contact1_phone ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.contact1_phone}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.contact1_phone}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.contact2_mobile ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.contact2_mobile}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.contact2_mobile}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.contact2_phone ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() =>
                  Linking.openURL(`tel://${singleShowroom.contact2_phone}`)
                }
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.contact2_phone}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.tel1 ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => Linking.openURL(`tel://${singleShowroom.tel1}`)}
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.tel1}
                </Text>
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.tel2 ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => Linking.openURL(`tel://${singleShowroom.tel2}`)}
              >
                <Text style={styles.additionalInfo}>
                  Mobile: {singleShowroom?.tel2}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.padding10}>
            {singleShowroom?.website ? (
              <TouchableOpacity
                style={styles.infoIconContainer}
                onPress={() =>
                  singleShowroom?.website &&
                  Linking.openURL(singleShowroom?.website)
                }
              >
                <Image source={website} style={[styles.icon, { width: 16 }]} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.facebook ? (
              <TouchableOpacity
                style={styles.infoIconContainer}
                onPress={() =>
                  singleShowroom?.facebook &&
                  Linking.openURL(singleShowroom?.facebook)
                }
              >
                <Image source={fb} style={styles.icon} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.instagram ? (
              <TouchableOpacity
                style={styles.infoIconContainer}
                onPress={() =>
                  singleShowroom?.instagram &&
                  Linking.openURL(singleShowroom?.instagram)
                }
              >
                <Image source={insta} style={[styles.icon, { width: 16 }]} />
              </TouchableOpacity>
            ) : null}
            {singleShowroom?.twitter ? (
              <TouchableOpacity
                style={styles.infoIconContainer}
                onPress={() =>
                  singleShowroom?.twitter &&
                  Linking.openURL(singleShowroom?.twitter)
                }
              >
                <Image source={twitter} style={[styles.icon, { width: 16 }]} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* {singleShowroom?.comments ? <View style={{borderTopColor: '#b2b2b2', borderTopWidth: 1, padding: 10}}>
          <AutoHeightWebView
            automaticallyAdjustContentInsets={false}
            source={{html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 18px; padding: 0; font-family: 'Roboto' !important;
            ">${singleShowroom?.comments}</p></body></html>`}}
          />
        </View>: null} */}
          {singleShowroom?.comments ? (
            <View
              style={{
                borderTopColor: "#b2b2b2",
                borderTopWidth: 1,
                padding: 10,
              }}
            >
              <Text style={styles.additionalInfo}>
                {singleShowroom.comments.replace(/<[^>]+>/g, "")}
              </Text>
            </View>
          ) : null}
        </View>
      )}
      <AlertModal
        body={`"My Modem – the personal concierge" will be launched soon.You will be able to create your personalized APP here by selecting information according to your interests.`}
        title="My Modem"
        button="OK"
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WebViewModal
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={singleShowroom?.miniwebsite_login}
        miniWebsiteType={singleShowroom?.miniwebsite_type}
      />
    </View>
  );
};
export default ShowroomByAlphabet;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingTop: 7,
    paddingBottom: 13,
    marginBottom: -0.8,
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
    marginHorizontal: "6%",
  },
  showroomImg: {
    height: 200,
    width: 200,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "95%",
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
    paddingTop: 4,
  },
  icon: {
    height: 16,
    width: 6,
  },
  showroomDetails: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginVertical: 10,
  },
  additionalInfo: {
    color: "#000000",
    fontSize: 18,
    flexWrap: "wrap",
    fontFamily: fonts.interMedium,
  },
  padding10: {
    padding: 10,
    flexDirection: "row",
  },
  mail: {
    height: 11,
    width: 16,
    marginHorizontal: 8,
  },
  icon: {
    height: 16,
    width: 6,
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
});
