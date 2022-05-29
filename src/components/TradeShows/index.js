import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { connect, useSelector } from "react-redux";
import { reload } from "../../redux/actions/citiesActions";
import website from "../../assets/icons/website.png";
import Location from "../../assets/icons/location.png";
import WebViewModal from "../webViewModal";

const TradShows = (props) => {
  const [expand, setExpand] = useState(false);
  const { tradeShow, length, navigation } = props;
  const [webModal, setWebModal] = useState(false);
  return (
    <>
      <View
        style={[
          styles.singleShow,
          {
            width: expand ? "100%" : "40%",
            paddingHorizontal: expand ? 15 : 0,
          },
        ]}
      >
        <Text style={styles.durationDate}>
          {tradeShow?.dates ? tradeShow.dates : "no date available"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setExpand(!expand);
          }}
        >
          <Text style={styles.showTitle}>
            {tradeShow?.name.replace(/&amp;\s*\/?/gm, "& ")}
          </Text>
          <Text style={styles.city}>
            {tradeShow?.city.replace(/&amp;\s*\/?/gm, "& ")}
          </Text>
        </TouchableOpacity>
        {expand && (
          <View style={{ marginBottom: 40 }}>
            <View style={styles.expandedView}>
              {tradeShow?.dates ? (
                <Text style={styles.mb10}>{`${tradeShow?.dates}`}</Text>
              ) : null}
              {tradeShow?.time ? <Text>{tradeShow?.time}</Text> : null}
              {tradeShow?.comments ? (
                // <Text style={styles.mb10}>{tradeShow?.comments}</Text>
                <AutoHeightWebView
                  automaticallyAdjustContentInsets={false}
                  style={styles.mb10}
                  source={{
                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 18px; padding: 0;">${tradeShow?.comments}</p></body></html>`,
                  }}
                />
              ) : null}
              {tradeShow?.location ? (
                <AutoHeightWebView
                  automaticallyAdjustContentInsets={false}
                  source={{
                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style="font-size: 18px; padding: 0;">${tradeShow?.location}</p></body></html>`,
                  }}
                />
              ) : null}
              <Text style={styles.mV10}>{`See on Map`}</Text>

              <View style={[styles.row, styles.mb10]}>
                {tradeShow?.website ? (
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setWebModal(true)}
                  >
                    <Image source={website} style={styles.icon} />
                  </TouchableOpacity>
                ) : null}
                {tradeShow?.link_gm ? (
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => Linking.openURL(tradeShow?.link_gm)}
                  >
                    <Image source={Location} style={styles.icon} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            {tradeShow?.description ? (
              <View style={styles.expandedView}>
                <Text style={styles.mb10}>{tradeShow?.description}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
      <WebViewModal
        setWebModal={setWebModal}
        webModal={webModal}
        navigation={navigation}
        miniwebsiteLogin={tradeShow?.website}
        miniWebsiteType={tradeShow?.miniwebsite_type}
      />
    </>
  );
};

export default TradShows;

const styles = StyleSheet.create({
  container: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginBottom: 40,
  },
  monthTitle: {
    padding: "4%",
    textTransform: "capitalize",
  },
  singleShow: {
    borderTopColor: "#b2b2b2",
    borderTopWidth: 1,
    // width: "44%",
    paddingTop: 10,
  },
  durationDate: {
    color: "#b2b2b2",
    fontSize: 18,
  },
  showTitle: {
    color: "black",
    fontSize: 26,
  },
  mt30: {
    marginTop: 30,
  },
  mV10: {
    marginVertical: 10,
  },
  expandedView: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    // marginBottom: 40,
    padding: 5,
    // width: 380,
  },
  city: {
    color: "black",
    opacity: 0.7,
    fontSize: 20,
    marginBottom: 30,
  },
  mb10: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 8,
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  desView: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginBottom: 40,
    padding: 5,
    // width: 380,
  },
});
