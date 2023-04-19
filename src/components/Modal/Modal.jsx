import { click } from '@testing-library/user-event/dist/click';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(this.props);
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props.poster;
    return (
      <div>
        <div>
          <button onClick={this.props.onClose}>Close</button>
          <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
        </div>
      </div>
    );
  }
}
