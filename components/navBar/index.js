import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../globals/utils";

let NavBar = (props) => {
  const { navigation, route } = props;
  return (
    <View style={styles.navBarWrapper}>
      <Text
        style={[
          {
            textDecorationLine: route.name === "Home" ? `underline` : "none",
          },
          styles.item,
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        Home
      </Text>
      <Text
        style={[
          {
            textDecorationLine:
              route.name === "Favorites" ? `underline` : "none",
          },
          styles.item,
        ]}
        onPress={() => navigation.navigate("Favorites")}
      >
        Favorites
      </Text>
      <Text
        style={[
          {
            textDecorationLine: route.name === "Popular" ? `underline` : "none",
          },
          styles.item,
        ]}
        onPress={() => navigation.navigate("Popular")}
      >
        Popular
      </Text>
      <Text
        style={[
          {
            textDecorationLine:
              route.name === "Upcoming" ? `underline` : "none",
          },
          styles.item,
        ]}
        onPress={() => navigation.navigate("Upcoming")}
      >
        Upcoming
      </Text>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  item: {
    flex: 1,
    textAlign: "center",
    margin: 5,
    paddingBottom: 10,
    fontSize: 16,
    color: colors.primary,
  },
});
