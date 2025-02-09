import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
    return (
        <Card style={{ width: '18rem' }} className="my-3">
            <Card.Img
                variant="top"
                src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'fallback-image-url.jpg'}
                alt={movie?.title}
            />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    {movie.overview}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=67456ba989bda984bbc528b1ff68d913&language=en-US&page=1');
                setMovies(response.data.results);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="mx-auto px-3">
            <h2 className="text-center my-4">Movie Listing</h2>
            <Row className="g-4">
                {movies.map(movie => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MovieList;
