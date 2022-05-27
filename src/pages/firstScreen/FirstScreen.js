import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import HomeView from "../../components/home";
import Logo from "../../../assets/images/modem-logo.png";

const FirstScreen = (props) => {
  const { navigation } = props;
  const modalizeRef = useRef(null);
  const [pos, setPos] = useState(94);
  const [posheight, setPosheight] = useState(94);
  const handleOpen = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.open(dest);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 25 : 0,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          backgroundColor: "white",
          maxHeight: posheight,
          marginVertical: 20,
        }}
      >
        <Image
          source={Logo}
          resizeMode="contain"
          style={{
            width: `${pos}%`,
            maxHeight: pos,
            alignSelf: "center",
          }}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={(e) => {
          const position = e.nativeEvent.contentOffset.y;
          setPos(94 - position / 4 >= 53 ? 94 - position / 4 : 53);
          setPosheight(74 - position / 2 >= 43 ? 74 - position / 2 : 43);
        }}
      >
        <StatusBar barStyle="dark-content" />
        <HomeView handleOpen={handleOpen} navigation={navigation} />
        {/* <View style={styles.rootContainer}>
          <View style={styles.postsContainer}>
            <Image source={Dummy} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy2} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy} style={styles.postImage} />
          </View>
          <View style={styles.postsContainer}>
            <Image source={Dummy2} style={styles.postImage} />
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

FirstScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FirstScreen.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    citiesEvents: state.cities.citiesEvents,
  };
};

export default connect(mapStateToProps, {})(FirstScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
    paddingHorizontal: 8,
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  postsContainer: {
    paddingVertical: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    marginBottom: -1,
  },
  postImage: {
    width: "100%",
    height: 200,
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
});
