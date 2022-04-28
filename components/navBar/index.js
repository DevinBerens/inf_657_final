import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

let NavBar = (props) => {
  const { navigation } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Text>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
