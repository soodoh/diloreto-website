import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
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
    textDecoration: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    logo: {
      fontSize: '2rem',
    },
  },
}));

interface HeaderProps {
  location: {
    pathname: string;
  };
}

const Header = (props: HeaderProps): ReactElement => {
  const classes = useStyles();
  const { location } = props;
  const appBarClasses = [];
  if (location.pathname === '/') {
    appBarClasses.push(classes.bottomAppBar);
  } else {
    appBarClasses.push(classes.appBar);
  }

  return (
    <AppBar position="fixed" color="primary" className={appBarClasses.join(' ')}>
      <Toolbar className={classes.content}>
        <Typography variant="h1" align="center" className={classes.logo} component={Link} to="/">
          The DiLoreto Family
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
