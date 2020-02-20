import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/styles';
import { StaticQuery, graphql } from 'gatsby';
import Metadata from '../components/Layout/Metadata';
import PersonModal from '../components/Home/PersonModal';
import Tile from '../components/Home/Tile';
import ContactModal from '../components/Home/ContactModal';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    maxWidth: 1200,
    padding: theme.spacing(1),
    margin: 'auto',
    marginBottom: theme.spacing(10),
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const [contactActive, activateContact] = useState(false);
  const [personActive, activatePerson] = useState(false);
  const [currentPerson, setPerson] = useState(null);
  const { people, data } = props;
  const transitionDelay = 300;

  return (
    <>
      <Metadata
        title="The DiLoreto Family"
        description="The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul."
      />

      <div className={classes.container}>
        {people.map((person, index) => (
          <Tile
            key={uid(person)}
            delay={transitionDelay * (index + 1)}
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
          delay={transitionDelay * (people.length + 1)}
        />
        <Tile
          image={data.familyHistoryThumbnail}
          delay={transitionDelay * (people.length + 2)}
          label="Family History"
          link="/areyou"
        />
        <Tile
          image={data.contactThumbnail}
          delay={transitionDelay * (people.length + 3)}
          label="Contact"
          onClick={() => activateContact(true)}
        />
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
    </>
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
    render={(data) => (
      <HomePage
        data={data.contentfulHomePage}
        people={data.allContentfulPeople.edges.map((item) => (
          item.node
        ))}
      />
    )}
  />
);
