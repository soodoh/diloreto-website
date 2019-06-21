import React from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Photo from './Photo';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(2),
  },
  title: {
    gridColumn: '1 / 4',
  },
}));

const HistoryGallery = (props) => {
  const { data, openPhoto, className } = props;
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${className}`}>
      <Typography className={classes.title} variant="caption" align="center">
        Click any photo to view full gallery
      </Typography>

      {data.photos.slice(0, 3).map(photo => (
        <Photo
          key={uid(photo)}
          data={photo}
          link={data.link}
          openPhoto={openPhoto}
        />
      ))}
    </div>
  );
};

HistoryGallery.propTypes = {
  className: PropTypes.string,
  openPhoto: PropTypes.func.isRequired,
  data: PropTypes.shape({
    link: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};
HistoryGallery.defaultProps = {
  className: '',
};

export default HistoryGallery;
