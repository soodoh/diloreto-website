import React from 'react';
import PropTypes from 'prop-types';

class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.state = { galleryActive: false };
  }

  render() {
    const { albums } = this.props;
    const { galleryActive } = this.state;

    return (
      <div>Photos Page</div>
    );
  }
}

export default Photos;
