import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { StaticQuery, graphql } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Metadata from '../components/Layout/Metadata';
import Gallery from '../components/Photos/Gallery';

class PhotosCore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAlbum: 0,
    };
  }

  render() {
    const { classes, albums } = this.props;
    const { currentAlbum } = this.state;

    return (
      <React.Fragment>
        <Metadata
          title="DiLoreto Photos"
          description="The DiLoreto Family's photo gallery with images of John, Donna, Paul and Carolyn. View various photo albums from past holidays and family events."
        />

        <div className={classes.container}>
          <div className={classes.filters}>
            <Tabs
              value={currentAlbum}
              onChange={(event, value) => this.setState({ currentAlbum: value })}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {albums.map(album => (
                <Tab
                  key={uid(album)}
                  label={album.title}
                />
              ))}
            </Tabs>
          </div>

          <Gallery photos={albums[currentAlbum].photos} />
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
  filters: {
    marginBottom: theme.spacing.unit,
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
