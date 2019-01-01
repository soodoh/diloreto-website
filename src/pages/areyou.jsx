import React from 'react';
import PropTypes from 'prop-types';

class FamilyHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imagesActive: false };
  }

  render() {
    const { historyRecords } = this.props;
    const { imagesActive } = this.state;

    return (
      <div>Family History page</div>
    );
  }
}

FamilyHistory.propTypes = {
  historyRecords: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default FamilyHistory;
