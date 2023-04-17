import { Button } from './Button/Button';
import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGallery/Movies';
import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    movies: movies,
    currentPoster: null,
  };
  componentDidMount() {
    const data = localStorage.getItem('movies');
    if (data !== null) {
      this.setState({ movies: JSON.parse(data) });
    }
    console.log(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movies !== prevState.movies) {
      localStorage.setItem('movies', JSON.stringify(this.state.movies));
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

  render() {
    const { movies, currentPoster } = this.state;
    return (
      <>
        <MoviesGallery
          movies={movies}
          onDelete={this.handleDelete}
          openModal={this.openModal}
        />
        {currentPoster && (
          <Modal poster={this.state.currentPoster} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
