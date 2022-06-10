import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { fetchHomeData } from "../../redux/actions/homeActions";
import Carousel from "react-native-snap-carousel";

const compaignList = {
  "multilabel-showrooms": {
    text: "Multi Label Showrooms",
    link: "AgendaMultiLabelShowrooms",
  },
  "designer-showrooms": {
    text: "Brands Showroom",
    link: "AgendaBrandsShowrooms",
  },
  tradeshows: {
    text: "Trade Shows",
    link: "AgendaTradeShows",
  },
};

const Home = (props) => {
 
  return (
    <View style={styles.rootContainer}>
       <Image style={{ padding:0,width: '100%', height: '100%' , resizeMode: 'cover'}}
        source={require('../../assets/img/home.png')}
      />
      
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    homeData: state.home.homeData,
    loading: state.home.loading,
  };
};

export default connect(mapStateToProps, {
  fetchHomeData,
})(Home);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // paddingHorizontal: 8,
    backgroundColor: "white",
    // marginTop:15
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  postImage: {
    width: 350,
    // marginRight: 12,
    height: 230,
  },
  modalMainContainer: {
    paddingHorizontal: 10,
    marginTop: 60,
  },
  closeBtn: {
    fontSize: 14,
    position: "absolute",
  },
  modal__header: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 4,
  },
  centerMe: {
    marginTop: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContentContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  bottomScrollViewContentContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  horizontalBanners: {
    height: 230,
    maxHeight: 230,
    // backgroundColor: '#f2f2f2'
  },
  bottomHorizontalBanners: {
    height: 230,
    maxHeight: 230,
    marginLeft: Platform.OS === "ios" ? "-1%" : 0,
    // backgroundColor: '#f2f2f2'
  },
  eventDuration: {
    color: "#646464",
    fontSize: 18,
    paddingTop: 4,
  },
  eventName: {
    color: "black",
    fontSize: 26,
  },
  eventOverview: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 25,
    marginBottom: 40,
  },
  mt30: {
    marginTop: 30,
  },
  monthWiseContainer: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginBottom: 40,
  },
  showTitle: {
    color: "black",
    fontSize: 26,
    marginBottom: 30,
  },
  monthTitle: {
    padding: "4%",
    textTransform: "capitalize",
  },
  showsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  singleShow: {
    borderTopColor: "#b2b2b2",
    borderTopWidth: 1,
    width: "44%",
    paddingTop: 10,
  },
  durationDate: {
    color: "#b2b2b2",
    fontSize: 18,
  },
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
  carouselContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginLeft: Platform.OS === "ios" ? "-2%" : 0,
    // marginHorizontal: 12,
    paddingBottom: 25,
  },
});
