import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SingleContact from "../singleContact";

const BrowseByAlphabet = (props) => {
  const { show, letter, setAlphaPos, alphaPos, navigation } = props;
  const renderContact = show.map((contact, key) => (
    <SingleContact navigation={navigation} contact={contact} key={key} />
  ));
  return (
    <>
      <View
        style={styles.row}
        onLayout={(event) => {
          const { y } = event.nativeEvent.layout;
          setAlphaPos({
            ...alphaPos,
            [letter]: y,
          });
        }}
      >
        <Text style={styles.time}>{letter}</Text>
        {renderContact}
      </View>
    </>
  );
};

export default BrowseByAlphabet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  time: {
    color: "#0000ff",
    fontSize: 26,
    width: "30%",
    maxWidth: "30%",
    overflow: "hidden",
    marginTop: 6,
  },
  contactName: {
    color: "black",
    fontSize: 26,
  },
  addUser: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
});
