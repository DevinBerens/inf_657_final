import React from "react";
import { StyleSheet, Text, View } from "react-native";

let Upcoming = (props) => {
  return (
    <View style={styles.wrapper}>
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
