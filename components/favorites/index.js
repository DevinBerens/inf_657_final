import React from "react";
import { StyleSheet, Text, View } from "react-native";

let Favorites = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text>Home page</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
  },
});
