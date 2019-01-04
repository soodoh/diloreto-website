import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';

const PhotoCore = (props) => {
  const {
    classes, data, link, openPhoto,
  } = props;

  const Photo = (
    <div
      className={classes.container}
      role="button"
      aria-label={`Open Photo: ${data.title}`}
      tabIndex={0}
      onKeyPress={(event) => {
        if (event.charCode === 13) {
          openPhoto(data.id);
        }
      }}
      onClick={() => {
        if (!link) {
          openPhoto(data.id);
        }
      }}
    >
      <Typography variant="caption" align="center">
        {data.description}
      </Typography>
      {/* <div style={{ maxWidth: 300 }}> */}
      <Img
        fluid={data.thumbnail}
        alt={data.title}
        style={{ maxWidth: 300, margin: '0 auto' }}
      />
      {/* </div> */}
    </div>
  );

  if (link) {
    return (
      <a href={link} className={classes.link}>
        {Photo}
      </a>
    );
  }
  return Photo;
};

PhotoCore.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  openPhoto: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  link: PropTypes.string,
};
PhotoCore.defaultProps = {
  link: null,
};

const styles = theme => ({
  container: {
    cursor: 'pointer',
    marginTop: theme.spacing.unit * 3,
  },
  link: {
    textDecoration: 'none',
    fontStyle: 'italic',
  },
});

export default withStyles(styles)(PhotoCore);
