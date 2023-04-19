import { Button } from './Button/Button';
import { MoviesGallery } from './MoviesGallery/Movies';
import { Modal } from './Modal/Modal';
import { fetchMovies } from '../services/movies-api';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPoster, setCurrentPoster] = useState(null);
  const [isListShown, setIsListShown] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isListShown) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevState => [...prevState, ...results]);
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
    if (!isListShown) {
      setMovies([]);
      setPage(1);
    }
  }, [page, isListShown]);

  const handleDelete = id => {
    setMovies(prevState => {
      return prevState.filter(movie => movie.id !== id);
    });
  };

  const openModal = data => {
    setCurrentPoster(data);
  };

  const closeModal = () => {
    setCurrentPoster(null);
  };

  const toggleList = () => {
    setIsListShown(prevState => !prevState);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <>
      <Button
        text={isListShown ? 'Hide movies list' : 'Show movies list'}
        clickHandler={toggleList}
      />
      {isLoading && <Loader />}
      {isListShown && (
        <div>
          <MoviesGallery
            movies={movies}
            onDelete={handleDelete}
            openModal={openModal}
          />
          <Button text="Load more" clickHandler={loadMore} />
        </div>
      )}

      {currentPoster && <Modal poster={currentPoster} onClose={closeModal} />}
    </>
  );
};

// import { Button } from './Button/Button';

// import { MoviesGallery } from './MoviesGallery/Movies';
// import React, { Component } from 'react';
// import { Modal } from './Modal/Modal';
// import { fetchMovies } from '../services/movies-api';
// import { Loader } from './Loader/Loader';

// export class App extends Component {
//   state = {
//     movies: [],
//     currentPoster: null,
//     isListShown: false,
//     page: 1,
//     isLoading: false,
//     error: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, isListShown } = this.state;
//     if (
//       (prevState.isListShown !== isListShown || prevState.page !== page) &&
//       isListShown === true
//     ) {
//       this.getMovies();
//     }
//     if (prevState.isListShown !== isListShown && isListShown === false) {
//       this.setState({
//         movies: [],
//         page: 1,
//       });
//     }
//   }

//   handleDelete = id => {
//     this.setState(prevState => {
//       return {
//         movies: prevState.movies.filter(movie => movie.id !== id),
//       };
//     });
//   };

//   openModal = data => {
//     this.setState({ currentPoster: data });
//   };

//   closeModal = () => {
//     this.setState({ currentPoster: null });
//   };

//   toggleList = () => {
//     this.setState(prevState => ({ isListShown: !prevState.isListShown }));
//   };

//   getMovies = () => {
//     this.setState({ isLoading: true });
//     fetchMovies(this.state.page)
//       .then(({ data: { results } }) => {
//         this.setState(prevState => ({
//           movies: [...prevState.movies, ...results],
//         }));
//       })
//       .catch(error => this.setState({ error: error.message }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { movies, currentPoster, isListShown } = this.state;
//     return (
//       <>
//         <Button
//           text={isListShown ? 'Hide movies list' : 'Show movies list'}
//           clickHandler={this.toggleList}
//         />
//         {this.state.isLoading && <Loader />}
//         {isListShown && (
//           <div>
//             <MoviesGallery
//               movies={movies}
//               onDelete={this.handleDelete}
//               openModal={this.openModal}
//             />
//             <Button text="Load more" clickHandler={this.loadMore} />
//           </div>
//         )}

//         {currentPoster && (
//           <Modal poster={currentPoster} onClose={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }
