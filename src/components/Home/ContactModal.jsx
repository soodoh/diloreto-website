import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '../common/Modal';

const ContactModalCore = (props) => {
  const {
    classes, open, onClose, people,
  } = props;

  return (
    <Modal
      open={open}
      title="Contact Us"
      onClose={onClose}
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
  );
};

ContactModalCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

const styles = theme => ({
  personInfo: {
    marginBottom: theme.spacing.unit * 4,
  },
});

export default withStyles(styles)(ContactModalCore);
