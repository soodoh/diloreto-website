import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    // Using flexbox here breaks Gatsby-image
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    fontStyle: 'italic',
  },
  image: {
    maxWidth: 300,
    margin: '0 auto',
    cursor: 'pointer',
  },
}));

const Photo = props => {
  const { data, link, openPhoto } = props;
  const classes = useStyles();
  const LinkWrapper = link ? 'a' : 'div';

  return (
    <div className={classes.container}>
      <Typography component={link ? 'a' : null} href={link} variant="caption">
        {data.description}
      </Typography>

      <LinkWrapper href={link} onClick={link ? null : () => openPhoto(data.id)}>
        <Img fluid={data.thumbnail} alt={data.title} className={classes.image} />
      </LinkWrapper>
    </div>
  );
};

Photo.propTypes = {
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
Photo.defaultProps = {
  link: null,
};

export default Photo;
