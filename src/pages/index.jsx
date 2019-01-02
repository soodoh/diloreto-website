import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { withStyles } from '@material-ui/core/styles';
import { StaticQuery, graphql, navigate } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Metadata from '../components/Layout/Metadata';
import PersonModal from '../components/Home/PersonModal';
import Tile from '../components/Home/Tile';
import ContactModal from '../components/Home/ContactModal';

class HomePageCore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactActive: false,
      personActive: false,
      currentPerson: null,
    };
  }

  render() {
    const { classes, people, data } = this.props;
    const { contactActive, personActive, currentPerson } = this.state;

    return (
      <React.Fragment>
        <Metadata
          title="The DiLoreto Family"
          description="The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul."
        />

        <div className={classes.container}>
          <Grid
            container
            className={classes.grid}
          >
            {people.map(person => (
              <Tile
                key={uid(person)}
                image={person.portrait}
                label={person.firstName}
                onClick={() => this.setState({
                  personActive: true,
                  currentPerson: person,
                })}
              />
            ))}

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
            <Tile
              image={data.contactThumbnail}
              label="Contact"
              onClick={() => this.setState({ contactActive: true })}
            />
          </Grid>
        </div>

        <ContactModal
          open={contactActive}
          onClose={() => this.setState({ contactActive: false })}
          people={people}
        />
        <PersonModal
          open={personActive}
          onClose={() => this.setState({ personActive: false, currentPerson: null })}
          data={currentPerson}
        />
      </React.Fragment>
    );
  }
}

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
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    maxWidth: 1200,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 10,
  },
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    grid: {
      padding: theme.spacing.unit,
    },
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
                fluid(maxWidth: 1200) {
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
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          familyHistoryThumbnail {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          photosThumbnail {
            title
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
