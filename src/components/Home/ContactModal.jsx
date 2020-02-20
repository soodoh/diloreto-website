import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '../common/Modal';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '30% 1fr',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  personInfo: {
    marginBottom: theme.spacing(4),
    gridColumn: '1 / 3',

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 2',
    },
  },
  email: {
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      fontSize: '1rem',
      marginBottom: theme.spacing(2),
    },
  },
}));

const ContactModal = (props) => {
  const classes = useStyles();
  const {
    open, onClose, people,
  } = props;

  return (
    <Modal
      open={open}
      title="Contact Us"
      onClose={onClose}
    >
      <div className={classes.container}>
        {people.map((person) => (
          <React.Fragment key={uid(person)}>
            <Typography variant="h5">
              {`${person.firstName}:`}
            </Typography>

            <Typography variant="h5" className={classes.email}>
              {person.email}
            </Typography>

            <div className={classes.personInfo}>
              {person.firstName === 'John' && (
                <i>For any questions regarding DiLoreto genealogy.</i>
              )}
              {person.link && (
                <Button
                  variant="outlined"
                  color="primary"
                  component="a"
                  href={person.link}
                >
                  View Portfolio
                </Button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Modal>
  );
};

ContactModal.propTypes = {
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

export default ContactModal;
