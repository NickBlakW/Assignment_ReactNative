import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import API_KEY from '../Config';

export default function Details({ route }) {

    // Set var for holding movie info
    const [info, setInfo] = useState({});

    // Get the id from the movie route
    const { movieID } = route.params;

    useEffect(() => {
        renderMovieDetails();
    }, []);

    function renderMovieDetails() {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
        )
        .then((response) => response.json())
        .then((info) => setInfo(info));
    }

    return (
        <View style={styles.detailedView}>
            <Image 
                style={styles.movieImg}
                source={{ uri: `https://image.tmdb.org/t/p/original${info.poster_path}` }}
            />
            <Text style={styles.title}>
                { info.title }
            </Text>
            <Text>
                { info.overview }
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    // Styles
    movieImg: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    detailedView: {
        flex: 1,
    },
    title: {

    },

});