import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StaticQuery, graphql, navigate } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import People from '../components/Home/People';
import Tile from '../components/Home/Tile';

const HomePageCore = (props) => {
  const { classes, people } = props;

  return (
    <Grid className={classes.container} container>
      <People data={people} />

      {/* <Tile
        image={{}}
        label="Photos"
        onClick={() => {}}
      />
      <Tile
        image={{}}
        label="Family History"
        onClick={() => navigate('/areyou')}
      />
      <Tile
        image={{}}
        label="Contact"
        onClick={() => {}}
      /> */}
    </Grid>
  );
};

HomePageCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      bio: PropTypes.object.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
});
const HomePage = withStyles(styles)(HomePageCore);

export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulPeople(sort: {fields: [order], order: ASC}) {
          edges {
            node {
              order
              firstName
              fullName
              link
              portrait {
                title
                fluid(maxWidth: 1000) {
                  ...GatsbyContentfulFluid_withWebp
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
