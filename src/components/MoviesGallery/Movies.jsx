import React, { Component } from 'react';

export const MoviesGallery = ({ movies, onDelete, openModal }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Votes: {movie.vote_count}</p>
          <button
            onClick={() => {
              onDelete(movie.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              openModal({ src: movie.poster_path, alt: movie.title });
            }}
          >
            Show poster
          </button>
        </li>
      ))}
    </ul>
  );
};
