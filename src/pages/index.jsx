import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/styles';
import { StaticQuery, graphql } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Metadata from '../components/Layout/Metadata';
import PersonModal from '../components/Home/PersonModal';
import Tile from '../components/Home/Tile';
import ContactModal from '../components/Home/ContactModal';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    maxWidth: 1200,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down('sm')]: {
    grid: {
      padding: theme.spacing(1),
    },
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const [contactActive, activateContact] = useState(false);
  const [personActive, activatePerson] = useState(false);
  const [currentPerson, setPerson] = useState(null);
  const { people, data } = props;

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
              onClick={() => {
                setPerson(person);
                activatePerson(true);
              }}
            />
          ))}

          <Tile
            image={data.photosThumbnail}
            label="Photos"
            link="/photos"
          />
          <Tile
            image={data.familyHistoryThumbnail}
            label="Family History"
            link="/areyou"
          />
          <Tile
            image={data.contactThumbnail}
            label="Contact"
            onClick={() => activateContact(true)}
          />
        </Grid>
      </div>

      <ContactModal
        open={contactActive}
        onClose={() => activateContact(false)}
        people={people}
      />
      <PersonModal
        open={personActive}
        onClose={() => {
          activatePerson(false);
          setPerson(null);
        }}
        data={currentPerson}
      />
    </React.Fragment>
  );
};

HomePage.propTypes = {
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
