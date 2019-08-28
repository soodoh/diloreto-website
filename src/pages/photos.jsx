import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Metadata from '../components/Layout/Metadata';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    width: '100%',
  },
}));

const Photos = () => {
  const classes = useStyles();

  return (
    <>
      <Metadata
        title="DiLoreto Photos"
        description="The DiLoreto Family's photo gallery with images of John, Donna, Paul and Carolyn. View various photo albums from past holidays and family events."
      />

      <div className={classes.container}>
        <Typography variant="h3" align="center" color="primary">
          Under Construction
        </Typography>
      </div>
    </>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query PhotosQuery {
        allContentfulPhotoAlbums(sort: {fields: [order], order: ASC}) {
          edges {
            node {
              order
              title
              photos {
                title
                description
                thumbnail: fluid(maxHeight: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
                fullSize: fluid(maxWidth: 1920) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <Photos
        albums={data.allContentfulPhotoAlbums.edges.map((item) => (
          item.node
        ))}
      />
    )}
  />
);
