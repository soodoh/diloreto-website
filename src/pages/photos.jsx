import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Metadata from '../components/Layout/Metadata';

class PhotosCore extends React.Component {
  constructor(props) {
    super(props);

    this.state = { galleryActive: false };
  }

  render() {
    const { classes, albums } = this.props;
    const { galleryActive } = this.state;
    console.log(galleryActive, albums);

    return (
      <React.Fragment>
        <Metadata
          title="DiLoreto Photos"
          description="The DiLoreto Family's photo gallery with images of John, Donna, Paul and Carolyn. View various photo albums from past holidays and family events."
        />

        <div className={classes.container}>
          <Typography variant="h2" align="center" gutterBottom>
          Photos Page is still in progress!
          </Typography>
          <Typography variant="h3" align="center">
          Coming soon!
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

PhotosCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      photos: PropTypes.array.isRequired,
    }),
  ).isRequired,
};

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    width: '100%',
  },
});

const PhotosWithStyles = withStyles(styles)(PhotosCore);

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
                thumbnail: fluid(maxWidth: 600) {
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
    render={data => (
      <PhotosWithStyles
        albums={data.allContentfulPhotoAlbums.edges.map(item => (
          item.node
        ))}
      />
    )}
  />
);
