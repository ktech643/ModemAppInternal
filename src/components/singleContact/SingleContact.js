import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  Platform,
} from "react-native";
import User from "../../assets/icons/addContact.png";
import UserAdded from "../../assets/icons/contact.png";
import Play from "../../assets/icons/play.png";
import Pin from "../../assets/icons/pin.png";
import AlertModal from "../../components/alertModal";
import WebViewModal from "../../components/webViewModal";
import I from "../../assets/icons/i.png";

const SingleContact = (props) => {
  const { contact, navigation } = props;
  const [addContact, setAddContact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [webModal, setWebModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{contact?.date}</Text>
        <Text style={styles.date}>{contact?.time}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          {/* <Text style={styles.contactName}>{contact?.title.length > 12 ? contact.title.substring(0, 12) + ('...') : contact.title}</Text> */}
          <Text style={styles.contactName}>
            {contact.title.replace(/&amp;\s*\/?/gm, "& ")}
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
          {contact?.minisite_login && contact?.minisite_type && (
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => setWebModal(true)}
            >
              <Image source={I} style={styles.icon} />
            </TouchableOpacity>
          )}
          {contact?.link_video ? (
            <TouchableOpacity
              style={styles.playIconContainer}
              onPress={() => Linking.openURL(contact?.link_video)}
            >
              <Image source={Play} style={styles.playIcon} />
            </TouchableOpacity>
          ) : null}
          {contact?.link_gm ? (
            <TouchableOpacity
              style={styles.pinIconContainer}
              onPress={() => Linking.openURL(contact?.link_gm)}
            >
              <Image source={Pin} style={styles.pinIcon} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.eventDescription}>
          {contact?.address_comments.replace(/&amp;\s*\/?/gm, "& ")}
        </Text>
        <AlertModal
          body={`"My Modem – the personal concierge" will be launched soon. You will be able to create your personalized APP here by selecting information according to your interests.`}
          title="My Modem"
          button="OK"
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <WebViewModal
          setWebModal={setWebModal}
          webModal={webModal}
          navigation={navigation}
          miniwebsiteLogin={contact?.minisite_login}
          miniWebsiteType={contact?.minisite_type}
        />
      </View>
    </View>
  );
};

export default SingleContact;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  dateTimeContainer: {
    width: "35%",
    maxWidth: "35%",
    overflow: "hidden",
    justifyContent: "center",
  },
  eventDescription: {
    color: "#646464",
    fontSize: 18,
    marginTop: 4,
  },
  date: {
    fontSize: 16,
    color: "#646464",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  detailsContainer: {
    width: "61%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingTop: 13,
    paddingBottom: 13,
    marginBottom: -1,
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
  },
  pinIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 8,
  },
  pinIcon: {
    height: 18,
    width: 12,
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
    marginRight: 5,
  },
});
