import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavBar from "../navBar";
import { imagePath } from "../globals/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { findIndex } from "lodash";

let Favorites = (props) => {
  return (
    <View style={styles.wrapper}>
      <NavBar {...props} />
      {[
        ["Favorite Movies", ...(favoriteMovies || [])],
        ["Upcoming Movies", ...(upcomingMovies || [])],
      ].map((category, index) => (
        <ScrollView key={index} style={styles.categoryWrapper}>
          {(category[0] === "Favorite Movies" || category.length > 1) && (
            <Text style={styles.categoryTitle}>{category[0]}</Text>
          )}
          {category.length > 1 && (
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
                          findIndex(favoriteMovies, (m) => m.id === movie.id) >
                          -1
                            ? "heart"
                            : "heart-o"
                        }
                        onPress={toggleFavorite.bind(this, movie)}
                      />
                      <Text style={styles.movieTitle}>{movie.title}</Text>
                    </TouchableOpacity>
                  )
              )}
            </View>
          )}
        </ScrollView>
      ))}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
  },
});
