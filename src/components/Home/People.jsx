import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tile from './Tile';
import PersonModal from './Modal';

class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personActive: false,
      currentPerson: null,
    };
  }

  render() {
    const { data } = this.props;
    const { personActive, currentPerson } = this.state;

    return (
      <React.Fragment>
        <PersonModal
          open={personActive}
          title={currentPerson && currentPerson.fullName}
          onClose={() => this.setState({
            personActive: false,
            currentPerson: null,
          })}
        >
          {currentPerson && currentPerson.link && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              window.location.href = currentPerson.link;
            }}
          >
            View Portfolio
          </Button>
          )}

          <DialogContentText
          // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: currentPerson && currentPerson.bio.childMarkdownRemark.html }}
          />
        </PersonModal>

        {data.map(person => (
          <Tile
            key={uid(person)}
            image={person.portrait}
            label={person.firstName}
            onClick={() => this.setState({
              personActive: true,
              currentPerson: person,
            })}
          />
        ))}
      </React.Fragment>
    );
  }
}

People.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      portrait: PropTypes.object.isRequired,
      bio: PropTypes.object.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default People;
