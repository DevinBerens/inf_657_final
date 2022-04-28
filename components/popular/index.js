import React from "react";
import { StyleSheet, Text, View } from "react-native";

let Popular = (props) => {
  return (
    <View style={styles.wrapper}>
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
