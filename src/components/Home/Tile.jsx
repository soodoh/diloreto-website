import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import detectIt from 'detect-it';
import { makeStyles } from '@material-ui/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    filter: 'grayscale(100%)',
    transition: 'filter .5s ease-out',
  },
  active: {
    filter: 'none',
    transition: 'filter .5s ease-out',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    height: '33%',
  },
  label: {
    color: theme.palette.primary.contrastText,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  [theme.breakpoints.down('sm')]: {
    labelContainer: {
      height: 'auto',
    },
    label: {
      fontSize: '1.5rem',
    },
  },
}));

const Tile = props => {
  const classes = useStyles();
  const [labelActive, setActive] = useState(detectIt.deviceType === 'touchOnly');
  const { image, label, onClick, link, delay } = props;
  const Wrapper = link ? Link : 'div';

  return (
    <Wrapper to={link}>
      <div
        role="button"
        aria-label={`"${image.title}" Action`}
        tabIndex={0}
        className={classNames({
          [classes.imageContainer]: true,
          [classes.active]: labelActive,
        })}
        onClick={onClick}
        onKeyPress={event => {
          if (event.charCode === 13) {
            onClick();
          }
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(detectIt.deviceType === 'touchOnly')}
      >
        <Fade opposite delay={delay}>
          <Img fluid={image.fluid} alt={image.title} />

          <>
            {label && (
              <Zoom in={labelActive}>
                <GridListTileBar
                  className={classes.labelContainer}
                  title={
                    <Typography variant="h3" align="center" className={classes.label}>
                      {label}
                    </Typography>
                  }
                />
              </Zoom>
            )}
          </>
        </Fade>
      </div>
    </Wrapper>
  );
};

Tile.propTypes = {
  link: PropTypes.string,
  delay: PropTypes.number.isRequired,
  image: PropTypes.shape({
    fluid: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
Tile.defaultProps = {
  label: null,
  link: null,
  onClick: null,
};

export default Tile;
