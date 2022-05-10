import React, { useState, useEffect, useCallback } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors, apiKey, moviePath } from "./components/globals/utils";
import Home from "./components/home";
import Search from "./components/search";
import Icon from "./components/globals/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { find, findIndex } from "lodash";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const myTheme = {
  ...DefaultTheme,
  colors: colors,
};

export default function App() {
  let [popularMovies, setPopularMovies] = useState([]);
  let [favoriteMovies, setFavoriteMovies] = useState([]);
  let [upcomingMovies, setUpcomingMovies] = useState([]);
  let [moviePopover, setMoviePopover] = useState(false);
  let [clickedMovie, setClickedMovie] = useState({});
  let [showSearch, setShowSearch] = useState(false);
  let [isSearch, setIsSearch] = useState(false);
  let [searchResults, setSearchResults] = useState([]);

  let toggleSearch = useCallback(() => {
    setShowSearch(!showSearch);
    setSearchResults([]);
    setIsSearch(false);
  }, [showSearch]);

  let movieClick = useCallback((movie) => {
    let urls = [
      `${moviePath}movie/${movie.id}?api_key=${apiKey}&language=en-US`,
      `${moviePath}movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`,
      `${moviePath}movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`,
    ];
    Promise.all(urls.map((url) => fetch(url)))
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        console.log("movie click data");
        let trailers = [];
        find(data[2].results, (item) => {
          if (item.type === "Trailer") {
            trailers.push(item);
          }
        });
        let director = find(data[1].crew, (item) => {
          return item.job === "Director";
        });
        let movieDetails = {
          ...data[0],
          director: director,
          trailer: trailers[0],
        };
        setClickedMovie(movieDetails);
        setMoviePopover(true);
      })
      .catch((err) => {
        console.log(err, "error calling backend API");
      });
  }, []);

  let getMovies = useCallback(() => {
    let urls = [
      `${moviePath}movie/popular?api_key=${apiKey}&language=en-US&page=1`,
      `${moviePath}movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    ];
    Promise.all(urls.map((url) => fetch(url)))
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(async (data) => {
        await AsyncStorage.removeItem("popularMovies");
        await AsyncStorage.removeItem("upcomingMovies");
        await AsyncStorage.setItem(
          "popularMovies",
          JSON.stringify(data[0].results)
        );
        await AsyncStorage.setItem(
          "upcomingMovies",
          JSON.stringify(data[1].results)
        );
        setPopularMovies(data[0].results);
        setUpcomingMovies(data[1].results);
      })
      .catch((err) => console.log(err, "error calling getMovies API"));
  }, []);

  let getMore = useCallback(
    (title) => {
      let movieCategory = title.split(" ")[0].toLowerCase();
      let page = 2;
      if (movieCategory === "popular") {
        page = popularMovies.length / 20 + 1;
      } else if (movieCategory === "upcoming") {
        page = upcomingMovies.length / 20 + 1;
      }
      fetch(
        `${moviePath}movie/${movieCategory}?api_key=${apiKey}&language=en-US&page=${page}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (movieCategory === "popular") {
            await AsyncStorage.removeItem("popularMovies");
            await AsyncStorage.setItem(
              "popularMovies",
              JSON.stringify([...popularMovies, ...data.results])
            );
            setPopularMovies([...popularMovies, ...data.results]);
          } else if (movieCategory === "upcoming") {
            await AsyncStorage.removeItem("upcomingMovies");
            await AsyncStorage.setItem(
              "upcomingMovies",
              JSON.stringify([...upcomingMovies, ...data.results])
            );
            setUpcomingMovies([...upcomingMovies, ...data.results]);
          }
        })
        .catch((err) => console.log(err, "error calling showMore API"));
    },
    [popularMovies, upcomingMovies]
  );

  let toggleFavorite = useCallback(
    async (movie, e) => {
      e.stopPropagation();
      let i = findIndex(favoriteMovies, (m) => {
        return m.id === movie.id;
      });
      await AsyncStorage.removeItem("favoriteMovies");
      if (i > -1) {
        let favList = [
          ...favoriteMovies.slice(0, i),
          ...favoriteMovies.slice(i + 1),
        ];
        await AsyncStorage.setItem("favoriteMovies", JSON.stringify(favList));
        setFavoriteMovies(favList);
      } else {
        let favList = [...favoriteMovies.slice(), movie];
        await AsyncStorage.setItem("favoriteMovies", JSON.stringify(favList));
        setFavoriteMovies(favList);
      }
    },
    [favoriteMovies, setFavoriteMovies]
  );

  let closePopover = useCallback(() => {
    setMoviePopover(false);
    setClickedMovie({});
  }, [setMoviePopover, setClickedMovie]);

  useEffect(async () => {
    let popMovies = await AsyncStorage.getItem("popularMovies");
    let favMovies = await AsyncStorage.getItem("favoriteMovies");
    let upcMovies = await AsyncStorage.getItem("upcomingMovies");
    popMovies = JSON.parse(popMovies);
    favMovies = JSON.parse(favMovies);
    upcMovies = JSON.parse(upcMovies);
    (favMovies || []).length && setFavoriteMovies(favMovies);
    (popMovies || []).length && setPopularMovies(popMovies);
    (upcMovies || []).length && setUpcomingMovies(upcMovies);
    if (!(popMovies || upcMovies || []).length) {
      getMovies();
    }
  }, [getMovies]);

  let body = {
    favoriteMovies,
    movieClick,
    moviePopover,
    clickedMovie,
    toggleFavorite,
    closePopover,
    getMore,
    showSearch,
    setShowSearch,
    isSearch,
    setIsSearch,
    searchResults,
    setSearchResults,
  };

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
          headerRight: () => <Search toggleSearch={toggleSearch} />,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              popularMovies={popularMovies}
              upcomingMovies={upcomingMovies}
              {...body}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Favorites">
          {(props) => <Home {...body} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Popular">
          {(props) => (
            <Home popularMovies={popularMovies} {...body} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Upcoming">
          {(props) => (
            <Home upcomingMovies={upcomingMovies} {...body} {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
