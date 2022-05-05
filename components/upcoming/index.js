import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../navBar";

let Upcoming = (props) => {
  return (
    <View style={styles.wrapper}>
      <NavBar {...props} />
      <Text>Upcoming page</Text>
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
  },
});
