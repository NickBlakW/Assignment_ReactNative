import { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { FlatList } from "react-native-web";
import API_KEY from "../Config";

export default function HomeScreen({ navigation }) {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  // Function to fetch movie list
  function getMovies() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }

  const renderMovie = ({ item }) => (
    <Movie navigation={navigation} movieID={item.id} title={item.title} />
  );

  return (
    <View style={styles.movieList}>
      <FlatList
        data={data}
        renderItem={renderMovie}
        keyExtractor={(movie) => movie.id}
      />
    </View>
  );
}

const Movie = ({ navigation, title, movieID }) => (
  <View style={styles.movie}>
    <Button
      onPress={() =>
        navigation.navigate("Details", 
        { movieID }
        )
      }
      style={styles.title}
      title={title}
    />
  </View>
);

const styles = StyleSheet.create({
    movie: {
        flex: 1,
        justifyContent: "center",
        marginBottom: '5px',
        borderWidth: '0.5px',
        borderRadius: '10px',
        width: '100%',
        alignContent: 'center',
    },
    movieList: {
        justifyContent: 'center',
        width: '50%',
    },
    title: {
        fontSize: 28,
    },
});