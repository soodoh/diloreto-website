import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Grid from '@material-ui/core/Grid';

const HomePageCore = (props) => {
  const { classes } = props;

  return (
    <Grid className={classes.container} container>
      <Grid item xs={6} md={4}>1</Grid>
      <Grid item xs={6} md={4}>2</Grid>
      <Grid item xs={6} md={4}>3</Grid>
      <Grid item xs={6} md={4}>4</Grid>
      <Grid item xs={6} md={4}>5</Grid>
      <Grid item xs={6} md={4}>6</Grid>
    </Grid>
  );
};

HomePageCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const styles = theme => ({
  container: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
  },
});
const HomePage = withStyles(styles)(HomePageCore);

export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulPeople(order: {fields: [order], sort: ASC}) {
          edges {
            node {
              id
              order
              portrait {
                fluid(maxWidth: 1000) {
                  src
                }
              }
              bio {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <HomePage
        people={data.allContentfulPeople.edges.map(item => (
          item.node
        ))}
      />
    )}
  />
);
