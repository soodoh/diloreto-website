import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { StaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Metadata from '../components/Layout/Metadata';
import ContactModal from '../components/Home/ContactModal';
import Record from '../components/FamilyHistory/Record';
import ImageModal from '../components/FamilyHistory/ImageModal';

const useStyles = makeStyles((theme) => ({
  info: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const FamilyHistory = (props) => {
  const classes = useStyles();
  const { data, people } = props;
  const allPhotos = data.reduce((acc, cur) => {
    // We don't want to add to the photo gallery if its a link thumbnail
    if (cur.link) {
      return acc;
    }
    return [...acc, ...cur.photos || []];
  }, []).filter((photo) => photo);
  const [contactActive, setContact] = useState(false);
  const [currentPhoto, setPhoto] = useState(null);
  const formattedPhotos = allPhotos.map((photo) => ({
    src: photo.fullSize.src,
    srcSet: photo.fullSize,
    caption: photo.description,
    alt: photo.title,
  }));

  return (
    <>
      <Metadata
        title="Are You a DiLoreto?"
        description="Are you a DiLoreto? View the history of the DiLoretos from Alfadena, Italy to Michigan and California. Extensive historical sources, photos and family tree listed."
      />

      <ContactModal
        open={contactActive}
        onClose={() => setContact(false)}
        people={people}
      />

      <ImageModal
        onClose={() => setPhoto(null)}
        images={formattedPhotos}
        currentPhoto={currentPhoto}
      />

      <div className={classes.info}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          A genealogical record of the DiLoreto lineage is maintained,
          and we would love to hear from any relatives with updates.
          An updated copy of the complete family tree can be sent as a PDF to family members.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setContact(true)}
        >
          Contact Us
        </Button>
      </div>

      {data.map((record, index) => (
        <Record
          key={uid(record)}
          data={record}
          isEven={index % 2 === 0}
          openPhoto={(id) => {
            const photoIndex = allPhotos.findIndex((photo) => (
              photo.id === id
            ));
            setPhoto(photoIndex);
          }}
        />
      ))}
    </>
  );
};

FamilyHistory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
      link: PropTypes.string,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          thumbnail: PropTypes.object.isRequired,
          fullSize: PropTypes.object.isRequired,
        }),
      ),
    }),
  ).isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default () => (
  <StaticQuery
    query={graphql`
      query HistoryQuery {
        allContentfulFamilyHistory(sort: {fields: [year], order: ASC}) {
          edges {
            node {
              year
              title
              link
              photos {
                id
                title
                description
                thumbnail: fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
                fullSize: fluid(maxWidth: 1920) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              content {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
        allContentfulPeople(sort: {fields: [order], order: ASC}) {
          edges {
            node {
              order
              firstName
              fullName
              link
              email
            }
          }
        }
      }
    `}
    render={(data) => (
      <FamilyHistory
        people={data.allContentfulPeople.edges.map((item) => (
          item.node
        ))}
        data={data.allContentfulFamilyHistory.edges.map((item) => (
          item.node
        ))}
      />
    )}
  />
);
