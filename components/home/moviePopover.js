import React from "react";
import { View, Image, Button, Text, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { findIndex } from "lodash";
import { colors, imagePath } from "../globals/utils";
import { TouchableOpacity } from "react-native-web";
import Feather from "react-native-vector-icons/Feather";

let MoviePopover = (props) => {
  const { closePopover, clickedMovie, toggleFavorite, favoriteMovies } = props;
  console.log(clickedMovie);

  return (
    <View style={styles.moviePopover}>
      <View style={styles.popoverWrapper}>
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
            <TouchableOpacity style={styles.footerButton}>
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
              <a
                style={{ textDecorationLine: "none" }}
                href={`https://www.youtube.com/watch?v=${clickedMovie.trailer?.key}`}
                target="_blank"
                rel="noreferrer"
              >
                <Text
                  style={{
                    color: colors.background,
                  }}
                >
                  Watch Trailer
                </Text>
              </a>
            </TouchableOpacity>
          </View>
          <Text style={styles.ft18}>
            <b>Directed By:</b> {clickedMovie.director?.name}
          </Text>
          <Text style={styles.ft18}>
            <b>Genre:</b>{" "}
            {(clickedMovie.genres || []).map(
              (genre, i) =>
                `${genre.name}${i + 1 < clickedMovie.genres.length ? ", " : ""}`
            )}
          </Text>
          <Text style={styles.ft18}>
            <b>Rating:</b> {clickedMovie.vote_average}
          </Text>
          <Text style={styles.ft18}>
            <b>Release Date:</b> {clickedMovie.release_date}
          </Text>
          <Text style={styles.ft18}>
            <b>Overview:</b> {clickedMovie.overview}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MoviePopover;

const styles = StyleSheet.create({
  moviePopover: {
    backgroundColor: colors.background,
    //width: window.innerWidth,
    //height: window.innerHeight,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    position: "fixed",
    display: "flex",
    overflow: "auto",
  },
  popoverWrapper: {
    padding: 25,
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
    marginTop: 10,
    paddingBottom: 10,
  },
  movieTitle: {
    flexWrap: "wrap",
    fontSize: 16,
    marginTop: 5,
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
    borderTop: "1px solid black",
  },
});
