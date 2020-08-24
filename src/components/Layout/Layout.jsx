import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from './Header';

const Layout = ({ children, location }) => (
  <ThemeProvider theme={createMuiTheme(theme)}>
    <CssBaseline />
    <Helmet>
      <html lang="en" />
    </Helmet>

    <div>
      <Header location={location} />

      {children}
    </div>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Layout;
