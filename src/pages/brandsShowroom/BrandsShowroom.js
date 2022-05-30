import React, { useState, useEffect, useRef } from "react";
import PropTypes, { object } from "prop-types";
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
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import BrandsShowroomByAlphabet from "../../components/brandsShowroomByAlphabet";
import { fetchBrandShowroom } from "../../redux/actions/citiesActions";
import ShowroomCalendarView from "../../components/showroomCalendarView";

const BrandsShowroom = (props) => {
  const { route, loading, brandShowroomData, fetchBrandShowroom } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lettersViewHeight, setLettersViewHeight] = useState();
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const [alphaPos, setAlphaPos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredShowRooms, setFilteredShowRooms] = useState(
    (brandShowroomData.length && brandShowroomData) || []
  );
  const id = route?.params?.cityEvent?.fashionweek_id;
  const other = route?.params?.other;
  const scrollRef = useRef();
  const windowHeight = Dimensions.get("window").height;
  const showLetters = filteredShowRooms?.length
    ? Object.keys(filteredShowRooms[0].indexes).map((key) => (
        <TouchableOpacity
          onPress={() => {
            scrollRef.current.scrollTo({
              y: alphaPos[key],
              animated: true,
            });
          }}
          key={key}
        >
          <Text style={styles.sidebarletter}>{key}</Text>
        </TouchableOpacity>
      ))
    : null;

  useEffect(() => {
    fetchBrandShowroom(id);
  }, [id, other]);

  useEffect(() => {
    setFilteredShowRooms((brandShowroomData.length && brandShowroomData) || []);
  }, [brandShowroomData]);

  useEffect(() => {
    const data = [
      {
        indexes: [],
      },
    ];

    if (!selectedDate) return setFilteredShowRooms(brandShowroomData);

    brandShowroomData?.length &&
      Object.keys(brandShowroomData[0].indexes).map((key) => {
        const arr = [];
        brandShowroomData[0].indexes[key].forEach((d) => {
          const start = moment(d.start_date).format("YYYY-MM-DD");
          const end = moment(d.end_date).format("YYYY-MM-DD");
          const compare = moment(selectedDate);

          if (
            selectedDate &&
            compare.isSameOrAfter(start) &&
            compare.isSameOrBefore(end)
          )
            arr.push(d);
          // if(selectedDate && compare.isSameOrAfter(start) && compare.isSameOrBefore(end)) arr.push(d);
        });

        data[0].indexes[key] = arr;
      });

    setFilteredShowRooms(data);
  }, [selectedDate]);
  const closeCalenderModal = () => {
    setSelectedIndex(0);
  };
  const onRefresh = () => {
    fetchBrandShowroom(id);
  };

  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index);
  };

  const renderShowrooms =
    filteredShowRooms.length &&
    Object.keys(filteredShowRooms[0]?.indexes).length ? (
      Object.keys(filteredShowRooms[0].indexes).map((index, key) => (
        <View
          key={key}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setAlphaPos({
              ...alphaPos,
              [index]: y,
            });
          }}
        >
          {filteredShowRooms[0].indexes[index].length ? (
            <TextInput editable={false} style={styles.letter}>
              {index}
            </TextInput>
          ) : null}
          {filteredShowRooms[0].indexes[index].map((data, key) => (
            <BrandsShowroomByAlphabet key={key} brandShowroomData={data} />
          ))}
        </View>
      ))
    ) : (
      <Text style={styles.noEvents}>there are no events</Text>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View style={styles.centerMe}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
          <StatusBar barStyle="dark-content" />
          <View style={styles.rootContainer}>
            {!other && (
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
            )}
            <View
              style={[
                styles.headingMainContainer,
                { marginTop: other ? 0 : -1 },
              ]}
            >
              <TouchableOpacity onPress={() => updateIndex(1)}>
                <Text
                  style={
                    selectedIndex === 1
                      ? styles.pressTabBtnActive
                      : styles.pressTabBtn
                  }
                >
                  by Date
                </Text>
              </TouchableOpacity>
              {selectedDate && (
                <View style={styles.filteredView}>
                  <Text style={styles.brandName}>{selectedDate}</Text>
                  <TouchableOpacity
                    style={styles.closeBtnContainer}
                    hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                    onPress={() => setSelectedDate(null)}
                  >
                    <Image
                      style={{ height: 8, width: 8, tintColor: "#fff" }}
                      source={require("../../assets/icons/closewhite.png")}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {selectedIndex ? (
              <Pressable
                hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                style={[
                  styles.closeBtn,
                  { top: showDetailViewHeight + 20 || 0 },
                ]}
                onPress={() => updateIndex(0)}
              >
                <Image
                  style={styles.closeImg}
                  source={require("../../assets/icons/close.png")}
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
                    {brandShowroomData && brandShowroomData[0]?.title}
                  </Text>
                  {renderShowrooms}
                </>
              ) : (
                <ShowroomCalendarView
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

BrandsShowroom.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

BrandsShowroom.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    brandShowroomData: state.cities.brandShowroomData,
    loading: state.cities.loading,
  };
};

export default connect(mapStateToProps, {
  fetchBrandShowroom,
})(BrandsShowroom);

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
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderTopColor: "#000000",
    borderTopWidth: 1,
    marginTop: -1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    height: 65,
    maxHeight: 65,
  },
  letter: {
    color: "#0000ff",
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginTop: 40,
  },
  sidebarletter: {
    color: "#999696",
    fontSize: 16,
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
    padding: 3,
    borderRadius: 4,
    backgroundColor: "black",
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 12,
    width: 12,
    tintColor: "#fff",
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
    padding: 3,
    borderRadius: 9,
    marginLeft: 4,
    backgroundColor: "black",
  },
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
});
