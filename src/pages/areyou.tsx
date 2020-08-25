import React, { ReactElement, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Metadata from '../components/Layout/Metadata';
import ContactModal from '../components/Home/ContactModal';
import RecordContainer from '../components/FamilyHistory/Record';
import ImageModal from '../components/FamilyHistory/ImageModal';
import { HistoryRecord, Person } from '../types';

const useStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface FamilyHistoryProps {
  data: HistoryRecord[];
  people: Person[];
}

const FamilyHistory = (props: FamilyHistoryProps): ReactElement => {
  const classes = useStyles();
  const { data, people } = props;
  const allPhotos = data.reduce((photos, album) => {
    // We don't want to add to the photo gallery if its a link thumbnail
    if (album.link) {
      return photos;
    }
    const morePhotos = album?.photos?.filter(photo => !!photo) || [];

    return [...photos, ...morePhotos];
  }, []);
  const [contactActive, setContact] = useState(false);
  const [photoIndex, setPhoto] = useState(null);

  return (
    <>
      <Metadata
        title="Are You a DiLoreto?"
        description="Are you a DiLoreto? View the history of the DiLoretos from Alfadena, Italy to Michigan and California. Extensive historical sources, photos and family tree listed."
      />

      <ContactModal open={contactActive} onClose={() => setContact(false)} people={people} />

      <ImageModal
        onChange={(newIndex: number) => setPhoto(newIndex)}
        onClose={() => setPhoto(null)}
        images={allPhotos}
        photoIndex={photoIndex}
      />

      <div className={classes.info}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          A genealogical record of the DiLoreto lineage is maintained, and we would love to hear from any relatives with updates. An updated
          copy of the complete family tree can be sent as a PDF to family members.
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => setContact(true)}>
          Contact Us
        </Button>
      </div>

      {data.map((historyRecord, index) => (
        <RecordContainer
          key={historyRecord.id}
          data={historyRecord}
          isEven={index % 2 === 0}
          openPhoto={id => {
            const photoIndex = allPhotos.findIndex(photo => photo.id === id);
            setPhoto(photoIndex);
          }}
        />
      ))}
    </>
  );
};

const PageWithData = (): ReactElement => (
  <StaticQuery
    query={graphql`
      query HistoryQuery {
        allContentfulFamilyHistory(sort: { fields: [year], order: ASC }) {
          edges {
            node {
              id
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
        allContentfulPeople(sort: { fields: [order], order: ASC }) {
          edges {
            node {
              id
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
    render={data => (
      <FamilyHistory
        people={data.allContentfulPeople.edges.map((item: { node: Person }) => item.node)}
        data={data.allContentfulFamilyHistory.edges.map((item: { node: HistoryRecord }) => item.node)}
      />
    )}
  />
);

export default PageWithData;
