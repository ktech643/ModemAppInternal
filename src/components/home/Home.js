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
  const { handleOpen, fetchHomeData, homeData, navigation, loading } = props;
  const [carouselItems, setCarouselItems] = useState(
    homeData.length && homeData[0]?.articles
  );
  const [bottomCarouselItems, setBottomCarouselItems] = useState(
    homeData.length && homeData[0]?.banners
  );
  const ref = useRef(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    setBottomCarouselItems(homeData.length && homeData[0]?.banners);
    setCarouselItems(homeData.length && homeData[0]?.articles);
  }, [homeData]);

  const windowWidth = Dimensions.get("window").width;

  const renderNewsCarousel = useCallback(
    ({ item, key }) => (
      <View key={key} style={styles.carouselContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ArticleScreen", { id: item?.id })}
        >
          <Image
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
        <Text style={[styles.eventDuration, { paddingTop: 20 }]}>
          {item?.date ? item.date : "No date available"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ArticleScreen", { id: item?.id })}
        >
          <Text style={styles.eventName}>
            {item?.name
              ? item.name.replace(/&amp;\s*\/?/gm, "& ")
              : "Title not available"}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    []
  );

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

  const renderEvents =
    homeData.length && Object.keys(homeData[0].calendar).length ? (
      Object.keys(homeData[0].calendar).map((index, key) => {
        const event = homeData[0].calendar[index];
        return (
          <View style={{ paddingHorizontal: 12 }} key={key}>
            {index === "digital" ? (
              event.map((e) => (
                <View style={styles.eventOverview} key={e.fashionweek_id}>
                  <Text style={styles.eventDuration}>
                    {e?.dates ? e.dates : "No date available"}
                  </Text>
                  <Text style={styles.eventName}>
                    {e?.name
                      ? e.name.replace(/&amp;\s*\/?/gm, "& ")
                      : "Name not available"}
                  </Text>
                  <View style={styles.mt30}>
                    {e.content.map((type, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          navigation.navigate("Agenda", {
                            screen: compaignList[type].link,
                            params: { other: true },
                          });
                        }}
                      >
                        <Text style={styles.eventName}>
                          {compaignList[type].text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <>
                {event.length ? (
                  <View>
                    <View style={styles.monthWiseContainer}>
                      <Text style={[styles.showTitle, styles.monthTitle]}>
                        {index}
                      </Text>
                      <View
                        style={[
                          styles.showsContainer,
                          {
                            justifyContent:
                              event.length > 1 ? "space-evenly" : "flex-start",
                            paddingHorizontal: event.length > 1 ? 0 : 15,
                          },
                        ]}
                      >
                        {event.map((e) => (
                          <View
                            key={e.fashionweek_id}
                            style={styles.singleShow}
                          >
                            <Text style={styles.durationDate}>
                              {e?.dates ? e.dates : "No date available"}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Cities", {
                                  screen: "Home",
                                  params: { fashionweekId: e?.fashionweek_id },
                                })
                              }
                            >
                              <Text style={styles.showTitle}>
                                {e?.name
                                  ? e.name.replace(/&amp;\s*\/?/gm, "& ")
                                  : "Name not available"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ) : null}
              </>
            )}
          </View>
        );
      })
    ) : (
      <Text style={styles.noEvents}>There are no Events</Text>
    );

  const renderBanners =
    homeData.length && Object.keys(homeData[0].banners).length
      ? Object.keys(homeData[0].banners).map((index, key) => {
          const article = homeData[0].banners[index];
          return (
            <TouchableOpacity
              key={key}
              onPress={() =>
                article.link &&
                Linking.openURL(
                  `https://www.modemonline.com/modem-mag/article/${article.link}`
                )
              }
            >
              <Image
                resizeMode="contain"
                source={
                  article?.path_image
                    ? { uri: `https:${article.path_image}` }
                    : require("../../assets/img/home-v2-dummy1.png")
                }
                style={[styles.postImage, { minHeight: 230 }]}
              />
            </TouchableOpacity>
          );
        })
      : null;

  return (
    <View style={styles.rootContainer}>
      {loading ? (
        <View style={styles.centerMe}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          {/* <ScrollView horizontal={true} pagingEnabled={true} style={styles.horizontalBanners} contentContainerStyle={styles.scrollViewContentContainerStyle}>
          {renderArticles}
        </ScrollView> */}
          <Carousel
            hasParallaxImages={true}
            layout={"default"}
            loop
            autoplayInterval={7000}
            useNativeDriver
            autoplay={true}
            ref={ref}
            data={carouselItems || []}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 50}
            renderItem={renderNewsCarousel}
          />
          {renderEvents}
          {/* <ScrollView horizontal={true} pagingEnabled={true} style={styles.bottomHorizontalBanners} contentContainerStyle={styles.bottomScrollViewContentContainerStyle}>
          {renderBanners}
        </ScrollView> */}
          <View style={{ backgroundColor: "#f2f2f2" }}>
            <Carousel
              hasParallaxImages={true}
              layout={"default"}
              loop
              useNativeDriver
              autoplay={true}
              autoplayInterval={7000}
              ref={ref}
              data={bottomCarouselItems || []}
              sliderWidth={windowWidth}
              itemWidth={windowWidth - (Platform.OS === "ios" ? 45 : 60)}
              renderItem={renderBannerCarousel}
            />
          </View>
        </>
      )}
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
