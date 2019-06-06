import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
  },
}));

const Modal = (props) => {
  const {
    open, title, onClose, children,
  } = props;
  const classes = useStyles();

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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
};
Modal.defaultProps = {
  title: '',
  open: false,
};

export default Modal;
