import { Button } from './Button/Button';

import { MoviesGallery } from './MoviesGallery/Movies';
import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
import { fetchMovies } from '../services/movies-api';

export class App extends Component {
  state = {
    movies: [],
    currentPoster: null,
    isListShown: false,
    page: 1,
    isLoading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isListShown !== this.state.isListShown) {
    }
  }

  handleDelete = id => {
    this.setState(prevState => {
      return {
        movies: prevState.movies.filter(movie => movie.id !== id),
      };
    });
  };

  openModal = data => {
    this.setState({ currentPoster: data });
  };

  closeModal = () => {
    this.setState({ currentPoster: null });
  };

  toggleList = () => {
    this.setState(prevState => ({ isListShown: !prevState.isListShown }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { movies, currentPoster, isListShown } = this.state;
    return (
      <>
        <Button
          text={isListShown ? 'Hide movies list' : 'Show movies list'}
          clickHandler={this.toggleList}
        />
        {isListShown && (
          <MoviesGallery
            movies={movies}
            onDelete={this.handleDelete}
            openModal={this.openModal}
          />
        )}
        {currentPoster && (
          <Modal poster={currentPoster} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
