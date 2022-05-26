import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Modalize } from "react-native-modalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import City from "../../components/city";
import { fetchCitiesEvents } from "../../redux/actions/citiesActions";
import HomeView from "../../components/home";
// import { StatusBar } from 'expo-status-bar';

const Home = (props) => {
  const { navigation, fetchCitiesEvents, citiesEvents, loading, route } = props;
  const [openedCity, setOpenedCity] = useState(null);
  const modalizeRef = useRef(null);
  const homeScreenEventId = route?.params?.fashionweekId;
  useEffect(() => {
    fetchCitiesEvents();
  }, []);

  const handleClose = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };

  const handleOpen = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.open(dest);
    }
  };
  const iosStatusBarHeight = Constants.statusBarHeight;
  const iosCalc = iosStatusBarHeight + 108;
  const windowHeight = Dimensions.get("window").height;
  const modalHeight = windowHeight - (Platform.OS === "ios" ? iosCalc : 121);

  const renderHeader = () => (
    <TouchableOpacity
      style={styles.modal__header}
      activeOpacity={0.75}
      onPress={async () => {
        let route = await AsyncStorage.getItem("lastPage");
        route = route
          ? JSON.parse(route)
          : {
              name: null,
              params: {},
            };
        const pages = ["Home", "Agenda"];
        navigation.navigate(
          route.name && !pages.includes(route.name)
            ? route.name
            : "FirstScreen",
          route.params || {}
        );
      }}
      hitSlop={{ top: 0, right: 15, bottom: 15, left: 15 }}
    >
      <Image
        source={require("../../assets/icons/closewhite.png")}
        style={{ tintColor: "#fff", width: "40%", height: "40%" }}
      />
    </TouchableOpacity>
  );

  const renderCity = citiesEvents ? (
    citiesEvents.map((cityEvent, key) => (
      <City
        setOpenedCity={setOpenedCity}
        homeScreenEventId={homeScreenEventId}
        openedCity={openedCity}
        navigation={navigation}
        key={key}
        cityEvent={cityEvent}
      />
    ))
  ) : (
    <Text style={styles.noEvents}>There are no cities currently right now</Text>
  );
  const renderContent = () => (
    <View style={styles.modalMainContainer}>
      {loading ? (
        <View style={styles.centerMe}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        renderCity
      )}
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="dark" />
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.modal}
        alwaysOpen={modalHeight}
        withOverlay={false}
        disableScrollIfPossible={false}
        handlePosition="outside"
        withHandle={false}
        HeaderComponent={renderHeader}
      >
        {renderContent()}
      </Modalize>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {/* <StatusBar barStyle="dark-content" />    */}
        <HomeView handleOpen={handleOpen} navigation={navigation} />
      </ScrollView>
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Home.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    citiesEvents: state.cities.citiesEvents,
    loading: state.cities.loading,
  };
};

export default connect(mapStateToProps, {
  fetchCitiesEvents,
})(Home);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // paddingHorizontal: 8,
    backgroundColor: "white",
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    paddingTop: Platform.OS == "ios" ? 30 : 0,
  },
  postImage: {
    width: 350,
    marginRight: 12,
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
    top: 0,
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
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
});
