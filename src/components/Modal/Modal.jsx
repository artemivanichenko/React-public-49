import { Component } from 'react';

export class Modal extends Component {
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
