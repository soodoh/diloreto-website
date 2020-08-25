import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from './Header';

interface LayoutProps {
  children: ReactElement | ReactElement[];
  location: {
    pathname: string;
  };
}

const Layout = (props: LayoutProps): ReactElement => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Helmet>
      <html lang="en" />
    </Helmet>

    <div>
      <Header location={location} />
      {props.children}
    </div>
  </ThemeProvider>
);

export default Layout;
