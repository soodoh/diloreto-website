import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const HeaderCore = (props) => {
  const { classes, location } = props;

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

HeaderCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = theme => ({
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
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  logo: {
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    logo: {
      fontSize: '2rem',
    },
  },
});

export default withStyles(styles)(HeaderCore);
