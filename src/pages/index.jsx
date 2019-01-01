import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StaticQuery, graphql, navigate } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Metadata from '../components/Layout/Metadata';
import People from '../components/Home/People';
import Contact from '../components/Home/Contact';
import Tile from '../components/Home/Tile';

const HomePageCore = (props) => {
  const { classes, people, data } = props;

  return (
    <React.Fragment>
      <Metadata
        title="The DiLoreto Family"
        description="The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul."
      />

      <Grid className={classes.container} container>
        <People data={people} />

        <Tile
          image={data.photosThumbnail}
          label="Photos"
          onClick={() => navigate('/photos')}
        />
        <Tile
          image={data.familyHistoryThumbnail}
          label="Family History"
          onClick={() => navigate('/areyou')}
        />
        <Contact
          thumbnail={data.contactThumbnail}
          people={people}
        />
      </Grid>
    </React.Fragment>
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
  data: PropTypes.shape({
    contactThumbnail: PropTypes.object.isRequired,
    familyHistoryThumbnail: PropTypes.object.isRequired,
    photosThumbnail: PropTypes.object.isRequired,
  }).isRequired,
};

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10,
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
              email
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
        contentfulHomePage {
          contactThumbnail {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          familyHistoryThumbnail {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          photosThumbnail {
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <HomePage
        data={data.contentfulHomePage}
        people={data.allContentfulPeople.edges.map(item => (
          item.node
        ))}
      />
    )}
  />
);
