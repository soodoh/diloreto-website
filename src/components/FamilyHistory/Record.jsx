import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Photo from './Photo';


const RecordCore = (props) => {
  const {
    classes, data, isEven, openPhoto,
  } = props;
  const hasGallery = Array.isArray(data.photos) && data.photos.length > 1;

  return (
    <div
      className={isEven
        ? classes.lightContainer
        : classes.darkContainer
      }
    >
      <Typography variant="h1" color="primary" align="center">{data.title}</Typography>

      <Grid container spacing={16}>
        {isEven && data.photos && !hasGallery
            && (
              <Grid item xs={12} sm={4}>
                <Photo
                  data={data.photos[0]}
                  link={data.link}
                  openPhoto={openPhoto}
                />
              </Grid>
            )
          }

        <Grid item xs={12} sm={hasGallery || !data.photos ? 12 : 8}>
          <Typography
            variant="body1"
              // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }}
          />
        </Grid>

        {!isEven && data.photos && !hasGallery
            && (
              <Grid item xs={12} sm={4}>
                <Photo
                  data={data.photos[0]}
                  link={data.link}
                  openPhoto={openPhoto}
                />
              </Grid>
            )
          }

        {data.photos && hasGallery
            && (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="caption" align="center">
                  Click any photo to view full gallery
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    {data.photos.slice(0, 3).map(photo => (
                      <Grid item xs={6} sm={4} key={uid(photo)}>
                        <Photo
                          data={photo}
                          link={data.link}
                          openPhoto={openPhoto}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </React.Fragment>
            )
          }
      </Grid>
    </div>
  );
};

RecordCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isEven: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    link: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  openPhoto: PropTypes.func.isRequired,
};

const styles = theme => ({
  lightContainer: {
    padding: theme.spacing.unit * 2,
  },
  darkContainer: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(RecordCore);
