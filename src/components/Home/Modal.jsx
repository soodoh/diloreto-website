import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const PersonModalCore = (props) => {
  const {
    classes, open, title, onClose, children,
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="person-modal"
    >
      <div className={classes.title}>
        <Typography variant="h1" color="primary" id="person-modal">
          {title}
        </Typography>

        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

PersonModalCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
};
PersonModalCore.defaultProps = {
  title: '',
  open: false,
};

const styles = theme => ({
  title: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)(PersonModalCore);
