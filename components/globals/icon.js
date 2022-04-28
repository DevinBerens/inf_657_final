import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let Icon = (props) => {
  const {
    name,
    size = 40,
    backgroundColor = "#000",
    iconColor = "#fff",
    styles,
    onPress,
  } = props;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        styles,
      ]}
    >
      <MaterialCommunityIcons
        onPress={onPress}
        name={name}
        color={iconColor}
        size={size * 0.5}
      />
    </View>
  );
};

export default Icon;
