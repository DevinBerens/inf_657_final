import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../navBar";

let Popular = (props) => {
  return (
    <View style={styles.wrapper}>
      <NavBar {...props} />
      <Text>Popular page</Text>
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
  },
});
