import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
    },
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
  },
}));

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactElement;
  onClose: () => void;
}

const Modal = (props: ModalProps): ReactElement => {
  const { open, title, onClose, children } = props;
  const classes = useStyles();

  return (
    <Dialog TransitionComponent={Slide} fullWidth maxWidth="sm" open={open} onClose={onClose} aria-labelledby="person-modal">
      <Typography variant="h1" color="primary" id="person-modal" className={classes.title}>
        {title}
      </Typography>

      <IconButton className={classes.close} onClick={onClose}>
        <Close />
      </IconButton>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
