import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import NavBar from "../navBar";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { imagePath, colors } from "../globals/utils";
import { findIndex } from "lodash";
import MoviePopover from "./moviePopover";
import SearchPopover from "../search/searchPopover";

let Home = (props) => {
  const {
    popularMovies,
    favoriteMovies,
    upcomingMovies,
    movieClick,
    moviePopover,
    clickedMovie,
    toggleFavorite,
    closePopover,
    getMore,
    route,
    showSearch,
  } = props;

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <NavBar {...props} />
        {[
          ["Favorite Movies", ...(favoriteMovies || [])],
          ["Popular Movies", ...(popularMovies || [])],
          ["Upcoming Movies", ...(upcomingMovies || [])],
        ].map((category, index) => (
          <View
            key={index}
            style={[
              styles.categoryWrapper,
              { minHeight: route.name === "Favorite Movies" && 1200 },
            ]}
          >
            {category[0] === "Favorite Movies" &&
            ["Popular", "Upcoming"].includes(route.name)
              ? null
              : (category.length > 1 || category[0] === "Favorite Movies") && (
                  <Text style={styles.categoryTitle}>{category[0]}</Text>
                )}
            {category[0] === "Favorite Movies" &&
            ["Popular", "Upcoming"].includes(
              route.name
            ) ? null : category.length > 1 ? (
              <View style={styles.movieWrapper}>
                {category.map(
                  (movie, i) =>
                    i !== 0 && (
                      <TouchableOpacity
                        style={styles.movieBody}
                        onPress={movieClick.bind(this, movie)}
                        key={i}
                      >
                        <Image
                          style={styles.moviePoster}
                          source={{ uri: `${imagePath}${movie.poster_path}` }}
                        />
                        <FontAwesomeIcon
                          style={styles.favoritesButton}
                          name={
                            findIndex(
                              favoriteMovies,
                              (m) => m.id === movie.id
                            ) > -1
                              ? "heart"
                              : "heart-o"
                          }
                          onPress={toggleFavorite.bind(this, movie)}
                        />
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text>
                          <FontAwesomeIcon
                            style={styles.movieRatingIcon}
                            name="star"
                          />
                          {movie.vote_average}
                        </Text>
                      </TouchableOpacity>
                    )
                )}
                {category[0] !== "Favorite Movies" && (
                  <Text
                    style={styles.showMore}
                    onPress={getMore.bind(this, category[0])}
                  >
                    Show More...
                  </Text>
                )}
              </View>
            ) : category[0] === "Favorite Movies" &&
              !["Popular", "Upcoming"].includes(route.name) ? (
              <Text style={styles.noneFound}>No movies found</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
      {moviePopover && (
        <MoviePopover
          closePopover={closePopover}
          clickedMovie={clickedMovie}
          toggleFavorite={toggleFavorite}
          favoriteMovies={favoriteMovies}
        />
      )}
      {showSearch && <SearchPopover {...props} />}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
  categoryWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  categoryTitle: {
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  movieWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  movieBody: {
    margin: 15,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minWidth: 100,
    maxWidth: 100,
    minHeight: 100 * 2,
  },
  moviePoster: {
    width: 100,
    maxWidth: 100,
    height: 100 * 1.25,
  },
  favoritesButton: {
    position: "absolute",
    color: "skyblue",
    top: 10,
    right: 5,
    fontSize: 28,
  },
  movieTitle: {
    flexWrap: "wrap",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  movieRatingIcon: {
    color: colors.yellow,
    marginRight: 5,
  },
  showMore: {
    alignSelf: "flex-end",
    marginBottom: 100,
  },
  noneFound: {
    marginLeft: 15,
    marginTop: 15,
  },
});
