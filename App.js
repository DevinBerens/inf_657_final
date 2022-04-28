import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "./components/globals/utils";
import Home from "./components/home";
import Favorites from "./components/favorites";
import Popular from "./components/popular";
import Upcoming from "./components/upcoming";
import Icon from "./components/globals/icon";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const myTheme = {
  ...DefaultTheme,
  colors: colors,
};

export default function App() {
  return (
    <NavigationContainer theme={myTheme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            borderColor: colors.border,
          },
          title: "Movie List",
          headerLeft: () => (
            <Icon
              name="home"
              onPress={() => navigationRef.current?.navigate("Home")}
              backgroundColor={colors.primary}
              styles={{ borderRadius: null }}
            />
          ),
          headerRight: () => (
            <Icon
              name="magnify"
              backgroundColor={colors.primary}
              styles={{
                borderRadius: null,
              }}
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Popular" component={Popular} />
        <Stack.Screen name="Upcoming" component={Upcoming} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
