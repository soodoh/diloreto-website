import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/styles';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Img from 'gatsby-image';

const View = ({ data }) => <Img fluid={data.srcSet} alt={data.title} />;
View.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
View.propTypes = {
  data: PropTypes.shape({
    srcSet: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const ImageModal = (props) => {
  const { onClose, images, currentPhoto } = props;
  const theme = useTheme();

  const modalStyles = {
    positioner: base => ({
      ...base,
      zIndex: theme.zIndex.appBar + 1,
    }),
    blanket: base => ({
      ...base,
      zIndex: theme.zIndex.appBar + 1,
    }),
  };

  return (
    <ModalGateway>
      {Number.isInteger(currentPhoto) && (
      <Modal
        allowFullscreen={false}
        onClose={onClose}
        styles={modalStyles}
      >
        <Carousel
          currentIndex={currentPhoto}
          views={images}
        />
      </Modal>
      )}
    </ModalGateway>
  );
};

ImageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
  })).isRequired,
  currentPhoto: PropTypes.number,
};
ImageModal.defaultProps = {
  currentPhoto: null,
};

export default ImageModal;
