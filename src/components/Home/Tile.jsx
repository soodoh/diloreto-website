import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Img from 'gatsby-image';
import detectIt from 'detect-it';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { labelActive: detectIt.deviceType === 'touchOnly' };
  }

  render() {
    const {
      classes, image, label, onClick,
    } = this.props;
    const { labelActive } = this.state;

    return (
      <Grid
        item
        xs={6}
        md={4}
        className={classes.container}
      >
        <div
          role="button"
          aria-label={`"${image.title}" Action`}
          tabIndex={0}
          className={classNames({
            [classes.imageContainer]: true,
            [classes.active]: labelActive,
          })}
          onClick={onClick}
          onKeyPress={(event) => {
            if (event.keyCode === 13) {
              onClick();
            }
          }}
          onMouseEnter={() => this.setState({ labelActive: true })}
          onMouseLeave={() => this.setState({ labelActive: detectIt.deviceType === 'touchOnly' })}
        >
          <Img
            fluid={image.fluid}
            alt={image.title}
          />

          <Zoom in={labelActive}>
            <GridListTileBar
              className={classes.labelContainer}
              title={(
                <Typography variant="h3" align="center" className={classes.label}>
                  {label}
                </Typography>
              )}
            />
          </Zoom>
        </div>
      </Grid>
    );
  }
}

Tile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.shape({
    fluid: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = theme => ({
  container: {
    padding: '.5rem',
  },
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
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    labelContainer: {
      height: 'auto',
    },
    label: {
      fontSize: '2rem',
    },
  },
});

export default withStyles(styles)(Tile);
