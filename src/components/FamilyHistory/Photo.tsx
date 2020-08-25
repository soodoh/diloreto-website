import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';
import { GalleryPhoto } from '../../types';

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

interface PhotoProps {
  openPhoto: (id: string) => void;
  data: GalleryPhoto;
  link?: string;
}

const Photo = (props: PhotoProps): ReactElement => {
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

export default Photo;
