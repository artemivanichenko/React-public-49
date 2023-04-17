import React, {Component} from "react";

export const MoviesGallery = ({movies, onDelete}) => {
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>Votes: {movie.vote_count}</p>
                    <button onClick={() => {onDelete(movie.id)}}>Delete</button>
                </li>
            ))}
        </ul>
    )
} 