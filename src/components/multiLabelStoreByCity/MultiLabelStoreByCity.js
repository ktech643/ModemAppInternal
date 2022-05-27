import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";

const MultiLabelStoreByCity = (props) => {
  const { city, setSelectedCities, selectedCitites } = props;
  const [checked, setChecked] = useState(
    selectedCitites.includes(city?.city) ? true : false
  );

  const handleCities = (name) => {
    if (checked) {
      setSelectedCities(selectedCitites.filter((c) => c !== name));
      setChecked(false);
    } else {
      setSelectedCities([...selectedCitites, name]);
      setChecked(true);
    }
  };

  useEffect(() => {
    const foundName = selectedCitites.find((c) => c === city?.city);
    if (!foundName) setChecked(false);
    else setChecked(true);
  }, [selectedCitites]);

  return (
    <View style={styles.row}>
      <Text style={styles.time}></Text>
      <View style={{ width: "80%" }}>
        <CheckBox
          title={
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxText}>
                {city?.city.replace(/&amp;\s*\/?/gm, "& ")}
              </Text>
            </View>
          }
          checkedIcon={<View style={styles.checkboxChecked}></View>}
          uncheckedIcon={<View style={styles.checkboxUnchecked}></View>}
          uncheckedColor={"black"}
          textStyle={{ marginLeft: 12 }}
          containerStyle={styles.checkBoxMainContainerStyle}
          checked={checked}
          onPress={() => handleCities(city.city)}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(MultiLabelStoreByCity);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  time: {
    color: "#0000ff",
    fontSize: 26,
    width: "20%",
    maxWidth: "20%",
    overflow: "hidden",
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
  checkboxTextContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  checkboxText: {
    fontSize: 22,
    color: "black",
    marginLeft: 15,
  },
  checkboxChecked: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#646464",
    backgroundColor: "#646464",
  },
  checkboxUnchecked: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  checkBoxMainContainerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
});
