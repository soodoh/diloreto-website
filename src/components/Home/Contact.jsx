import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '../common/Modal';
import Tile from './Tile';

class ContactCore extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contactActive: false };
  }

  render() {
    const { classes, thumbnail, people } = this.props;
    const { contactActive } = this.state;

    return (
      <React.Fragment>
        <Modal
          open={contactActive}
          title="Contact Us"
          onClose={() => this.setState({ contactActive: false })}
        >
          <Grid container>
            {people.map(person => (
              <React.Fragment key={uid(person)}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="h5">
                    {`${person.firstName}:`}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <Typography variant="h5" align="right">
                    {person.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.personInfo}>
                  {person.firstName === 'John' && (
                    <i>For any questions regarding DiLoreto genealogy.</i>
                  )}
                  {person.link && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.location.href = person.link;
                      }}
                    >
                    View Portfolio
                    </Button>
                  )}

                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Modal>

        <Tile
          image={thumbnail}
          label="Contact"
          onClick={() => this.setState({ contactActive: true })}
        />
      </React.Fragment>
    );
  }
}

ContactCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  thumbnail: PropTypes.shape({}).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

const styles = theme => ({
  personInfo: {
    marginBottom: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(ContactCore);
