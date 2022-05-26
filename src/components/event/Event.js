import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import User from "../../assets/icons/addContact.png";
import UserAdded from "../../assets/icons/contact.png";
import Play from "../../assets/icons/play.png";
import Pin from "../../assets/icons/pin.png";
import AlertModal from "../../components/alertModal";
import WebViewModal from "../../components/webViewModal";
import I from "../../assets/icons/i.png";

const Event = (props) => {
  const { event, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);

  return (
    <View style={styles.row}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{event?.date_month}</Text>
        <Text style={styles.date}>
          {event?.time ? event?.time : "No time available"}
        </Text>
      </View>
      {/* <Text style={styles.time}>{event?.time ? event?.time : 'No time available'}</Text> */}
      <View style={{ width: "64%" }}>
        <View style={styles.alignCenter}>
          {/* {event?.title.length > 12 ? <Text style={styles.contactName}>{event?.title.substring(0, 12) + ('...')}</Text> : <Text style={styles.contactName}>{event?.title}</Text>} */}
          <Text style={styles.contactName}>
            {event?.title.replace(/&amp;\s*\/?/gm, "& ")}
          </Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{ marginBottom: Platform.OS === "ios" ? 3 : 0 }}
          >
            <Image
              source={addContact ? UserAdded : User}
              style={styles.addUser}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.alignCenter}>
          {event?.minisite_login && event?.minisite_type && (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => setWebModal(true)}
            >
              <Image source={I} style={styles.icon} />
            </TouchableOpacity>
          )}
          {event?.link_video ? (
            <TouchableOpacity
              style={styles.playIconContainer}
              onPress={() => Linking.openURL(event?.link_video)}
            >
              <Image source={Play} style={styles.playIcon} />
            </TouchableOpacity>
          ) : null}
          {event?.link_gm ? (
            <TouchableOpacity
              style={styles.pinIconContainer}
              onPress={() => Linking.openURL(event?.link_gm)}
            >
              <Image source={Pin} style={styles.pinIcon} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.eventDescription}>
          {event?.address_comments.replace(/&amp;\s*\/?/gm, "& ")}
        </Text>
      </View>
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
        miniwebsiteLogin={event?.minisite_login}
        miniWebsiteType={event?.minisite_type}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Event);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  dateTimeContainer: {
    width: "35%",
    maxWidth: "35%",
    overflow: "hidden",
    marginTop: 6,
  },
  date: {
    fontSize: 16,
    color: "#646464",
    overflow: "hidden",
  },
  time: {
    fontSize: 18,
    color: "#646464",
    width: "35%",
    maxWidth: "35%",
    overflow: "hidden",
    flexWrap: "wrap",
    marginTop: 6,
  },
  alignCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  contactName: {
    color: "black",
    fontSize: 26,
    maxWidth: "93%",
    flexWrap: "wrap",
  },
  addUser: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  www: {
    color: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 18,
    marginRight: 4,
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
    marginHorizontal: 4,
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  pinIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 4,
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  pinIcon: {
    height: 18,
    width: 12,
  },
  eventDescription: {
    color: "#646464",
    fontSize: 18,
    marginTop: 4,
  },
  icon: {
    height: 16,
    width: 6,
  },
  infoIconContainer: {
    width: 40,
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 5,
  },
});
