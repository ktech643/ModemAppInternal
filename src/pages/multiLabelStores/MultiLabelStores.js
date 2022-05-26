import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import StoreByAlphabet from "../../components/storeByAlphabet";
import MultiLabelStoreByCity from "../../components/multiLabelStoreByCity";
import {
  fetchMultiLabelStores,
  fetchCitiesEvents,
} from "../../redux/actions/citiesActions";

const MultiLabelStores = (props) => {
  const {
    route,
    loading,
    fetchMultiLabelStores,
    totalMultiLabelStores,
    allCities,
    fetchCitiesEvents,
  } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [alphaPos, setAlphaPos] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCitites, setSelectedCities] = useState([]);
  const [removedCity, setremovedCity] = useState(null);
  const scrollRef = useRef();
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const [filteredStores, setFilteredStores] = useState(
    (totalMultiLabelStores.length && totalMultiLabelStores) || []
  );
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const id = route?.params?.cityEvent?.fashionweek_id;
  const filteredCityNames = (city) => {
    setSelectedCities(selectedCitites.filter((c) => c !== city));
  };
  //  console.log('totalMultiLabelStores',totalMultiLabelStores)
  useEffect(() => {
    const cityName = allCities.find((city) => city.fashionweek_id === id)?.city;
    fetchMultiLabelStores(id, cityName);
    fetchCitiesEvents();
  }, [id]);

  useEffect(() => {
    setFilteredStores(
      (totalMultiLabelStores.length && totalMultiLabelStores) || []
    );
  }, [totalMultiLabelStores]);

  useEffect(() => {
    const data = [
      {
        indexes: [],
      },
    ];
    if (!selectedCitites.length)
      return setFilteredStores(totalMultiLabelStores);
    totalMultiLabelStores?.length &&
      Object.keys(totalMultiLabelStores[0].indexes).map((key) => {
        const arr = [];
        totalMultiLabelStores[0].indexes[key].forEach((d) => {
          selectedCitites.forEach((b) => {
            if (d.city === b) arr.push(d);
          });
        });
        data[0].indexes[key] = arr;
      });
    setFilteredStores(data);
  }, [selectedCitites]);

  const onRefresh = () => {
    fetchMultiLabelStores(id);
    fetchCitiesEvents();
  };

  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index);
  };

  const windowHeight = Dimensions.get("window").height;
  const showLetters = filteredStores?.length
    ? Object.keys(filteredStores[0]?.indexes).map((key) => (
        <TouchableOpacity
          onPress={() => {
            scrollRef.current.scrollTo({
              y: alphaPos[key],
              animated: true,
            });
          }}
          key={key}
        >
          <Text style={styles.alphaCharacter}>{key}</Text>
        </TouchableOpacity>
      ))
    : null;

  const renderMultiLabelStores =
    filteredStores?.length && Object.keys(filteredStores[0].indexes).length ? (
      Object.keys(filteredStores[0].indexes).map((index, key) => (
        <View
          key={key}
          // onLayout={(event) => {
          //   const { y } = event.nativeEvent.layout;
          //   setAlphaPos({
          //     ...alphaPos,
          //     [index]: y,
          //   });
          // }}
        >
          {filteredStores[0]?.indexes[index]?.length ? (
            <TextInput editable={false} style={styles.letter}>
              {index}
            </TextInput>
          ) : null}
          {filteredStores[0]?.indexes[index]?.map((store, key) => (
            <StoreByAlphabet store={store} key={key} />
          ))}
        </View>
      ))
    ) : (
      <Text style={styles.noEvents}>There are no Events</Text>
    );

  const renderMultiLabelStoreByCity = allCities.length ? (
    allCities.map((city) => (
      <MultiLabelStoreByCity
        city={city}
        key={city.fashionweek_id}
        selectedCitites={selectedCitites}
        setSelectedCities={setSelectedCities}
        removedCity={removedCity}
      />
    ))
  ) : (
    <Text style={styles.noEvents}>There are no cites</Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View style={styles.centerMe}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          {!selectedIndex && (
            <View
              onLayout={(event) => {
                setLettersViewHeight(event.nativeEvent.layout.height);
              }}
              style={{
                position: "absolute",
                zIndex: 1,
                right: 5,
                elevation: 99,
                flex: 1,
                top: (windowHeight - 118 - lettersViewHeight) / 2 || 0,
              }}
            >
              {showLetters}
            </View>
          )}
          <View style={styles.rootContainer}>
            <View
              style={styles.cityDetailsBtn}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setShowDetailViewHeight(height);
              }}
            >
              <Text style={styles.cityName}>
                {route?.params?.cityEvent?.city}
              </Text>
              <Text style={styles.date}>
                {route?.params?.cityEvent?.dates_collection}
              </Text>
            </View>
            {/* <ScrollView style={styles.headingMainContainer} horizontal={true} contentContainerStyle={{alignItems: 'center', paddingRight: 30}}>
            <TouchableOpacity onPress={() => updateIndex(1)}>
              <Text style={selectedIndex === 1 ? styles.pressTabBtnActive : styles.pressTabBtn}>by City</Text>
            </TouchableOpacity>
            {selectedCitites && selectedCitites.map((city, i) => <View style={styles.filteredView} key={i}>
              <Text style={styles.brandName}>{city}</Text>
              <Pressable style={styles.closeBtnContainer} hitSlop={{top: 5, left: 5, bottom: 5, right: 5}} onPress={() => {
                filteredCityNames(city)
                setremovedCity(city)
              }}>
                <Image style={{height: 8, width: 8}} source={require('../../assets/icons/closewhite.png')} />
              </Pressable>
            </View>)}
          </ScrollView> */}
            {selectedIndex ? (
              <Pressable
                style={[
                  styles.closeBtn,
                  { top: showDetailViewHeight + 20 || 0 },
                ]}
                onPress={() => updateIndex(0)}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <Image
                  style={styles.closeImg}
                  source={require("../../assets/icons/closewhite.png")}
                />
              </Pressable>
            ) : null}
            <ScrollView
              style={{ flex: 1, paddingHorizontal: 8 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ref={scrollRef}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {!selectedIndex ? (
                <>
                  <Text style={styles.gernalHeading}>
                    {totalMultiLabelStores && totalMultiLabelStores[0]?.title}
                  </Text>
                  {renderMultiLabelStores}
                </>
              ) : (
                renderMultiLabelStoreByCity
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

MultiLabelStores.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

MultiLabelStores.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    totalMultiLabelStores: state.cities.multiLabelStores,
    loading: state.cities.loading,
    allCities: state.cities.citiesEvents,
  };
};

export default connect(mapStateToProps, {
  fetchMultiLabelStores,
  fetchCitiesEvents,
})(MultiLabelStores);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  cityDetailsBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderTopColor: "#000000",
    borderTopWidth: 1,
    flexWrap: "wrap",
    marginHorizontal: 8,
  },
  cityName: {
    fontSize: 25,
    textTransform: "uppercase",
    maxWidth: "40%",
  },
  date: {
    fontSize: 20,
    maxWidth: "60%",
    textAlign: "right",
  },
  headingMainContainer: {
    height: 65,
    maxHeight: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderTopColor: "#000000",
    borderTopWidth: 1,
    marginTop: -1,
    flexDirection: "row",
    marginHorizontal: 8,
  },
  letter: {
    color: "#0000ff",
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginTop: 40,
    marginBottom: 10,
  },
  centerMe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressTabBtn: {
    color: "#646464",
    fontSize: 25,
    textTransform: "capitalize",
    backgroundColor: "#e6e6e6",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  pressTabBtnActive: {
    color: "white",
    fontSize: 25,
    textTransform: "capitalize",
    backgroundColor: "#646464",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  gernalHeading: {
    color: "#0000ff",
    fontSize: 26,
    textAlign: "center",
    paddingHorizontal: "10%",
    paddingTop: 60,
  },
  closeBtn: {
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
    elevation: 100,
    backgroundColor: "black",
    padding: 5,
    borderRadius: 4,
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 12,
    width: 12,
    tintColor: "#fff",
  },
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
  alphaCharacter: {
    color: "#999696",
    fontSize: 16,
  },
  filteredView: {
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 10,
  },
  brandName: {
    color: "#646464",
    fontSize: 25,
    textTransform: "capitalize",
  },
  closeBtnContainer: {
    backgroundColor: "#646464",
    padding: 3,
    borderRadius: 9,
    marginLeft: 4,
  },
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
});
