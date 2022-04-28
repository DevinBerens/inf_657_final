import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../navBar";

let Home = (props) => {
  return (
    <View style={styles.wrapper}>
      <NavBar {...props} />
      <Text>Home page</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {},
});
