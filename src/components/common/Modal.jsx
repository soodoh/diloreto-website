import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ModalCore = (props) => {
  const {
    classes, open, title, onClose, children,
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="person-modal"
    >
      <Typography
        variant="h1"
        color="primary"
        id="person-modal"
        className={classes.title}
      >
        {title}
      </Typography>

      <IconButton className={classes.close} onClick={onClose}>
        <Close />
      </IconButton>

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

ModalCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
};
ModalCore.defaultProps = {
  title: '',
  open: false,
};

const styles = theme => ({
  title: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-between',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(ModalCore);
