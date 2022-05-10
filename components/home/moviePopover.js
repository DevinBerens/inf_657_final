import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { findIndex } from "lodash";
import { colors, imagePath } from "../globals/utils";
import Feather from "react-native-vector-icons/Feather";

let MoviePopover = (props) => {
  const { closePopover, clickedMovie, toggleFavorite, favoriteMovies } = props;

  return (
    <SafeAreaView style={styles.moviePopover}>
      <ScrollView style={styles.popoverWrapper}>
        <Feather style={styles.closePopover} onPress={closePopover} name="x" />
        <View style={styles.posterWrapper}>
          <Image
            style={styles.moviePoster}
            source={{ uri: `${imagePath}${clickedMovie.poster_path}` }}
          />
        </View>
        <View style={styles.popoverBody}>
          <Text style={styles.movieTitle}>{clickedMovie.title}</Text>
          <View style={styles.popoverFooter}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={toggleFavorite.bind(this, clickedMovie)}
            >
              <FontAwesomeIcon
                style={styles.favoritesHeart}
                name={
                  findIndex(favoriteMovies, (m) => m.id === clickedMovie.id) >
                  -1
                    ? "heart"
                    : "heart-o"
                }
              />
              <Text style={{ color: colors.background }}>
                {findIndex(favoriteMovies, (m) => m.id === clickedMovie.id) > -1
                  ? "Remove "
                  : "Add "}
                Movie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Text
                style={{ textDecorationLine: "none" }}
                onPress={() =>
                  Linking.openURL(
                    `https://www.youtube.com/watch?v=${clickedMovie.trailer?.key}`,
                    "_blank"
                  )
                }
              >
                <Text
                  style={{
                    color: colors.background,
                  }}
                >
                  Watch Trailer
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.ft18}>
            <Text style={{ fontWeight: "bold" }}>Directed By:</Text>{" "}
            {clickedMovie.director?.name}
          </Text>
          <Text style={styles.ft18}>
            <Text style={{ fontWeight: "bold" }}>Genre:</Text>{" "}
            {(clickedMovie.genres || []).map(
              (genre, i) =>
                `${genre.name}${i + 1 < clickedMovie.genres.length ? ", " : ""}`
            )}
          </Text>
          <Text style={styles.ft18}>
            <Text style={{ fontWeight: "bold" }}>Rating:</Text>{" "}
            {clickedMovie.vote_average}
          </Text>
          <Text style={styles.ft18}>
            <Text style={{ fontWeight: "bold" }}>Release Date:</Text>{" "}
            {clickedMovie.release_date}
          </Text>
          <Text style={styles.ft18}>
            <Text style={{ fontWeight: "bold" }}>Overview:</Text>{" "}
            {clickedMovie.overview}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoviePopover;

const styles = StyleSheet.create({
  moviePopover: {
    backgroundColor: colors.background,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingBottom: 50,
    zIndex: 10,
    minHeight: 800,
    position: "absolute",
    display: "flex",
    overflow: "hidden",
  },
  popoverWrapper: {
    paddingLeft: 25,
    paddingRight: 25,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  closePopover: {
    position: "absolute",
    top: 25,
    right: 25,
    fontSize: 25,
  },
  posterWrapper: {
    flex: 0,
    display: "flex",
    justifyContent: "center",
    minWidth: 100,
    maxWidth: 100,
    minHeight: 100 * 2,
  },
  moviePoster: {
    width: 100,
    maxWidth: 100,
    height: 100 * 1.25,
  },
  popoverBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 10,
  },
  movieTitle: {
    flexWrap: "wrap",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  popoverFooter: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    height: 80,
  },
  footerButton: {
    margin: 10,
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.primary,
    color: colors.background,
    display: "flex",
    flexDirection: "row",
    borderRadius: 6,
  },
  favoritesHeart: {
    marginRight: 10,
    color: "skyblue",
    fontSize: 18,
  },
  trailerLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: colors.background,
  },
  ft18: {
    fontSize: 18,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
});
