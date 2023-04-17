import { Button } from './Button/Button';
import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGallery/Movies';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    movies: movies,
  };
  componentDidMount() {
    const data = localStorage.getItem("movies")
    if  (data !== null) {
      this.setState({movies: JSON.parse(data)})
    }
    console.log(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.movies !== prevState.movies) {
      localStorage.setItem("movies", JSON.stringify(this.state.movies))
    }
  }

  handleDelete = id => {
    this.setState(prevState => {
      return {
        movies: prevState.movies.filter(movie => movie.id !== id),
      };
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <MoviesGallery movies={movies} onDelete={this.handleDelete} />
      </>
    );
  }
}
