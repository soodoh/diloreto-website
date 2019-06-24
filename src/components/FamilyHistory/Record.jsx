import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import Photo from './Photo';
import HistoryGallery from './HistoryGallery';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: ({ isEven }) => (
      isEven ? theme.palette.background.default : theme.palette.background.dark
    ),
    padding: theme.spacing(2),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(1),
  },
  markdownContainer: {
    gridRow: 1,
    gridColumn: ({ data, isEven }) => {
      const isFullRow = !data.photos || (Array.isArray(data.photos) && data.photos.length > 1);

      if (isFullRow) return '1 / 4';
      if (isEven) return '2 / 4';
      return '1 / 3';
    },

    [theme.breakpoints.down('xs')]: {
      gridRow: 2,
      gridColumn: () => '1 / 4',
    },
  },
  markdown: {
    ...theme.typography.body1,
  },
  photo: {
    gridRow: 1,
    gridColumn: ({ isEven }) => (isEven ? '1 / 2' : '3 / 4'),

    [theme.breakpoints.down('xs')]: {
      gridColumn: () => '1 / 4',
    },
  },
  gallery: {
    gridColumn: '1 / 4',
    gridRow: 2,

    [theme.breakpoints.down('xs')]: {
      gridRow: 3,
    },
  },
}));

const Record = (props) => {
  const {
    data, openPhoto, isEven,
  } = props;
  const classes = useStyles({ data, isEven });
  const hasGallery = Array.isArray(data.photos) && data.photos.length > 1;
  const transitionDelay = 500;

  return (
    <div className={classes.container}>
      <Fade top opposite>
        <Typography variant="h1" color="primary" align="center">{data.title}</Typography>
      </Fade>

      <div className={classes.grid}>
        {data.photos && !hasGallery
            && (
              <div className={`${classes.photo} ${classes.mobileRow}`}>
                <Fade right opposite delay={transitionDelay}>
                  <Photo
                    data={data.photos[0]}
                    link={data.link}
                    openPhoto={openPhoto}
                  />
                </Fade>
              </div>
            )
          }

        <div className={`${classes.markdownContainer} ${classes.mobileRow}`}>
          <Fade left opposite delay={transitionDelay * 2}>
            <div
              className={classes.markdown}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }}
            />
          </Fade>
        </div>

        {data.photos && hasGallery
          && (
            <HistoryGallery
              className={classes.gallery}
              data={data}
              openPhoto={openPhoto}
            />
          )
        }
      </div>
    </div>
  );
};

Record.propTypes = {
  isEven: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  openPhoto: PropTypes.func.isRequired,
};

export default Record;
