import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import Logo from "../../../assets/images/modem-logo.png";
import { fetchArticle } from "../../redux/actions/homeActions";
import AutoHeightWebView from "react-native-autoheight-webview";

const Article = (props) => {
  const { route, loading, fetchArticle, articleData, navigation } = props;
  useEffect(() => {
    fetchArticle(route?.params?.id);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.navigate("FirstScreen")}>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("FirstScreen")}
        style={styles.backBtnContainer}
      >
        <Image
          style={styles.img}
          source={require("../../assets/icons/arrowBlack.png")}
        />
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
      {loading || !articleData ? (
        <View style={styles.centerMe}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.containerStyle}
        >
          <ImageBackground
            resizeMode="cover"
            source={
              articleData[0]?.path_image
                ? { uri: `https:${articleData[0]?.path_image}` }
                : require("../../assets/img/article-dummy.png")
            }
            style={styles.bgImageContainer}
          >
            <Text style={styles.articleTitle}>
              {articleData[0]?.name.replace(/&amp;/g, "&")}
            </Text>
            <Text style={styles.articleDate}>{articleData[0]?.date}</Text>
          </ImageBackground>
          <AutoHeightWebView
            automaticallyAdjustContentInsets={false}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p dangerouslySetInnerHTML={"&"} style="font-size: 18px; padding: 0; padding-right: 45px; padding-left: 12px; padding-top: 40px; padding-bottom: 40px">${articleData[0]?.description}</p></body></html>`,
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

Article.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Article.defaultProps = {
  navigation: { navigate: () => null },
};

const mapStateToProps = (state) => {
  return {
    articleData: state.home.articleData,
    loading: state.home.loading,
  };
};

export default connect(mapStateToProps, {
  fetchArticle,
})(Article);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    height: 35,
    alignSelf: "center",
    marginVertical: 16,
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  btnText: {
    fontSize: 26,
    color: "black",
  },
  backBtnContainer: {
    borderBottomColor: "black",
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    paddingVertical: 12,
  },
  containerStyle: {
    flexGrow: 1,
    marginHorizontal: 12,
    marginVertical: 16,
  },
  centerMe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImageContainer: {
    width: "100%",
    height: 400,
    justifyContent: "space-between",
  },
  articleTitle: {
    color: "white",
    fontSize: 38,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  articleDate: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
});
