import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes, { object } from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import AgendaByCountry from "../../components/agendaBycountry";
import { fetchInternationAgenda } from "../../redux/actions/agendasActions";
import MonthWiseFashionWeekAgenda from "../../components/monthWiseFashionWeekAgenda";
import Carousel from "react-native-snap-carousel";

const InternationalAgenda = (props) => {
  const { loading, fetchInternationAgenda, internationAgendadata, navigation } =
    props;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();
  const ref = useRef(null);
  const [showDetailViewHeight, setShowDetailViewHeight] = useState();
  const [carouselItems, setCarouselItems] = useState(
    internationAgendadata && internationAgendadata[0].banners
  );
  useEffect(() => {
    fetchInternationAgenda("");
  }, []);

  const onRefresh = () => {
    fetchInternationAgenda("");
  };
  console.log("internationAgendadata", internationAgendadata);
  const updateIndex = (index) => {
    if (selectedIndex === index) setSelectedIndex(0);
    else setSelectedIndex(index);
  };
  const renderCountryView = (
    <View>
      <AgendaByCountry />
    </View>
  );

  const renderMonthWiseFashionAgendas =
    internationAgendadata?.length &&
    Object.keys(internationAgendadata[0].indexes).length ? (
      Object.keys(internationAgendadata[0].indexes).map((index, key) => (
        <MonthWiseFashionWeekAgenda
          key={key}
          fashionWeekAgenda={internationAgendadata[0].indexes[index]}
          month={index}
          navigation={navigation}
        />
      ))
    ) : (
      <Text style={styles.noEvents}>
        There are no agendas in this category.
      </Text>
    );

  const windowWidth = Dimensions.get("window").width;
  const renderBannerCarousel = useCallback(
    ({ item, key }) => (
      <View style={styles.bottomHorizontalBanners}>
        <TouchableOpacity
          onPress={() => item?.link && Linking.openURL(item.link)}
        >
          <Image
            resizeMode="contain"
            source={
              item?.path_image
                ? { uri: item.path_image }
                : require("../../assets/img/home-v2-dummy1.png")
            }
            style={[
              styles.postImage,
              { minWidth: "100%", width: windowWidth > 385 ? 350 : 320 },
            ]}
          />
        </TouchableOpacity>
      </View>
    ),
    []
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
          <View style={styles.rootContainer}>
            <View
              style={styles.cityDetailsBtn}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setShowDetailViewHeight(height);
              }}
            >
              <Text style={styles.cityName}>International Agenda</Text>
            </View>
            {/* <View style={styles.headingMainContainer}>
            <TouchableOpacity onPress={() => updateIndex(1)}>
              <Text style={selectedIndex === 1 ? styles.pressTabBtnActive : styles.pressTabBtn}>by Country</Text>
            </TouchableOpacity>
          </View> */}
            {selectedIndex ? (
              <Pressable
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                style={[
                  styles.closeBtn,
                  { top: showDetailViewHeight + 75 || 0 },
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
              {selectedIndex ? (
                renderCountryView
              ) : (
                <View>
                  <View style={{ paddingVertical: 60 }}>
                    <Text style={styles.gernalHeading}>
                      International Agenda
                    </Text>
                    <Text style={styles.gernalHeading}>
                      {internationAgendadata && internationAgendadata[0]?.title}
                    </Text>
                  </View>

                  <View style={styles.btnGroup}>
                    <TouchableOpacity
                      onPress={() => {
                        fetchInternationAgenda(
                          internationAgendadata[0].previous_month
                        );
                      }}
                      style={styles.btn}
                    >
                      <Image
                        source={require("../../assets/icons/arrowleft.png")}
                        style={styles.leftArrow}
                      />
                      <Text style={styles.btnText}>Previous Month</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "grey", width: 1 }}></View>
                    <TouchableOpacity
                      onPress={() => {
                        fetchInternationAgenda(
                          internationAgendadata[0].next_month
                        );
                      }}
                      style={styles.btn}
                    >
                      <Text style={styles.btnText}>Next Month</Text>
                      <Image
                        source={require("../../assets/icons/rightarrow.png")}
                        style={styles.arrow}
                      />
                    </TouchableOpacity>
                  </View>
                  {renderMonthWiseFashionAgendas}
                  {/* { (internationAgendadata?.length && Object.keys(internationAgendadata[0].indexes).length) ? Object.keys(internationAgendadata[0].indexes).map((index, key) => <View 
                key={key}
              >
                <View>
                  {internationAgendadata[0]?.indexes[index]?.length ? <View style={styles.monthWiseContainer}>
                    <Text style={[styles.showTitle, styles.monthTitle]}>{index}</Text>
                    <View style={[styles.showsContainer, {justifyContent: internationAgendadata[0]?.indexes[index]?.length > 1 ? 'space-evenly' : 'flex-start', paddingHorizontal: internationAgendadata[0]?.indexes[index]?.length > 1 ? 0 : 15}]}>
                      {internationAgendadata[0]?.indexes[index]?.length ? internationAgendadata[0].indexes[index].map((agenda, key) => <View key={key} style={styles.singleShow}>
                        <Text style={styles.durationDate}>{agenda?.dates ?  agenda.dates : 'no date available'}</Text>
                        <TouchableOpacity>
                          <Text style={styles.showTitle}>{agenda?.name.replace(/&amp;\s*\/?/mg, '& ')}</Text>
                        </TouchableOpacity>
                      </View>) : null}
                    </View>
                  </View> : null}
                </View>
              </View>) : <Text style={styles.noEvents}>No data available</Text>} */}
                </View>
              )}
              <View style={{ backgroundColor: "#f2f2f2" }}>
                <Carousel
                  hasParallaxImages={true}
                  layout={"default"}
                  loop
                  autoplayInterval={7000}
                  useNativeDriver
                  autoplay={true}
                  ref={ref}
                  data={carouselItems}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth - 50}
                  renderItem={renderBannerCarousel}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

InternationalAgenda.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

InternationalAgenda.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    internationAgendadata: state.agendas.internationAgenda,
    loading: state.agendas.loading,
  };
};

export default connect(mapStateToProps, {
  fetchInternationAgenda,
})(InternationalAgenda);

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
  bottomHorizontalBanners: {
    height: 230,
    maxHeight: 230,
    marginLeft: Platform.OS === "ios" ? "-1%" : 0,
    // backgroundColor: '#f2f2f2'
  },
  postImage: {
    width: 350,
    // marginRight: 12,
    height: 230,
  },
  cityName: {
    fontSize: 26,
    textTransform: "uppercase",
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
    marginHorizontal: 8,
  },
  letter: {
    color: "#0000ff",
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 8,
    marginTop: 40,
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
  },
  closeBtn: {
    top: 135,
    right: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
    backgroundColor: "grey",
    // transform: [{ scale: 1.1 }]
  },
  closeImg: {
    height: 16,
    width: 16,
    tintColor: "#fff",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: "50%",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    color: "#646464",
  },
  leftArrow: {
    width: 17,
    height: 12,
    marginRight: 4,
  },
  arrow: {
    width: 16,
    height: 10,
    marginLeft: 4,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    marginBottom: 40,
  },
  showsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  monthWiseContainer: {
    borderColor: "#b2b2b2",
    borderWidth: 1,
    marginBottom: 40,
  },
  borderlessMonthContainer: {
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 40,
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
  showTitle: {
    color: "black",
    fontSize: 26,
    marginBottom: 30,
  },
  monthTitle: {
    padding: "4%",
  },
  eventImg: {
    height: 150,
    resizeMode: "contain",
    marginBottom: 40,
  },
  //all thi is on the view
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
  showTitle: {
    color: "black",
    fontSize: 26,
    marginBottom: 30,
  },
  noEvents: {
    fontSize: 20,
    color: "#B8B8B8",
    paddingVertical: 20,
    textAlign: "center",
  },
});
