import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'sticky',
    top: 0,
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
  logo: {
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.down('sm')]: {
    logo: {
      fontSize: '2rem',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { location } = props;

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classNames({
        [classes.bottomAppBar]: location.pathname === '/',
        [classes.appBar]: location.pathname !== '/',
      })}
    >
      <Toolbar className={classes.content}>
        <Typography
          variant="h1"
          align="center"
          className={classes.logo}
          onClick={() => navigate('/')}
        >
          The DiLoreto Family
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
