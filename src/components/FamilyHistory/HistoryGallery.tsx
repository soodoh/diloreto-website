import React, { ReactElement } from 'react';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import Photo from './Photo';
import { GalleryPhoto } from '../../types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    gridColumn: '1 / 4',
  },
}));

interface HistoryGalleryProps {
  data: {
    link: string;
    photos: GalleryPhoto[];
  };
  openPhoto: (id: string) => void;
  className?: string;
}

const HistoryGallery = (props: HistoryGalleryProps): ReactElement => {
  const { data, openPhoto, className } = props;
  const classes = useStyles();
  const transitionDelay = 300;

  return (
    <div className={`${classes.container} ${className || ''}`}>
      <div className={classes.title}>
        <Fade opposite>
          <Typography variant="caption">Click any photo to view full gallery</Typography>
        </Fade>
      </div>

      {data.photos.slice(0, 3).map((photo, index) => (
        <Fade opposite delay={transitionDelay * (index + 1)} key={uid(photo)}>
          <Photo data={photo} link={data.link} openPhoto={openPhoto} />
        </Fade>
      ))}
    </div>
  );
};

export default HistoryGallery;
