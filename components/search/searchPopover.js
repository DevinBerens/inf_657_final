import React, { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import { apiKey, colors, imagePath, moviePath } from "../globals/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

let SearchPopover = (props) => {
  const {
    movieClick,
    setShowSearch,
    isSearch,
    setIsSearch,
    searchResults,
    setSearchResults,
  } = props;
  let [searchValue, setSearchValue] = useState("");

  let handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchValue) {
        fetch(
          `${moviePath}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchValue}`
        )
          .then((response) => response.json())
          .then((data) => {
            setSearchResults(data.results);
            setIsSearch(true);
          })
          .catch((err) => console.log(err));
      } else {
        setSearchResults([]);
        setIsSearch(true);
      }
    },
    [searchValue]
  );

  let changeSearch = useCallback(
    (val) => {
      setSearchValue(val);
    },
    [searchValue]
  );

  let clickMovie = useCallback(
    (movie) => {
      movieClick(movie);
      setShowSearch(false);
      setIsSearch(false);
      setSearchResults([]);
    },
    [movieClick]
  );

  return (
    <ScrollView style={styles.searchPopover}>
      <View style={styles.formWrapper}>
        <TextInput
          placeholder="Find a Movie"
          placeholderTextColor="black"
          style={styles.searchInput}
          defaultValue={searchValue}
          onChangeText={changeSearch}
        />
        <Text style={styles.searchTitle} onPress={handleSubmit}>
          Search
        </Text>
      </View>
      {searchResults.length ? (
        <View style={styles.searchResults}>
          {searchResults.map((movie, i) => (
            <TouchableOpacity
              key={i}
              style={styles.searchResult}
              onPress={clickMovie.bind(this, movie)}
            >
              <Image
                style={styles.moviePoster}
                source={{ uri: `${imagePath}${movie.poster_path}` }}
              />
              <View>
                <Text style={styles.resultTitle}>{movie.title}</Text>
                <Text style={styles.resultRating}>
                  <FontAwesomeIcon style={styles.movieRatingIcon} name="star" />
                  {movie.vote_average}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : isSearch ? (
        <Text style={styles.searchResults}>No Movies Found</Text>
      ) : null}
    </ScrollView>
  );
};

export default SearchPopover;

const styles = StyleSheet.create({
  searchPopover: {
    backgroundColor: colors.primary,
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
    minHeight: 300,
    maxHeight: 900,
    position: "absolute",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.background,
    height: 40,
    marginRight: 10,
    padding: 10,
  },
  searchTitle: {
    width: 75,
    backgroundColor: colors.background,
    padding: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  searchResults: {
    marginTop: 10,
    marginLeft: 15,
    color: colors.background,
  },
  searchResult: {
    margin: 15,
    display: "flex",
  },
  moviePoster: {
    width: 100,
    maxWidth: 100,
    height: 100 * 1.25,
  },
  resultTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    color: colors.background,
  },
  movieRatingIcon: {
    color: colors.yellow,
    marginRight: 5,
  },
  resultRating: {
    marginLeft: 10,
    marginTop: 10,
    textAlign: "left",
    color: colors.background,
  },
});
