import React, { ReactElement } from 'react';
import { useTheme } from '@material-ui/styles';
import Carousel, { Modal, ModalGateway } from 'react-images';
// import Img from 'gatsby-image';
import { Image } from '../../types';

// interface ViewProps {
//   data: Image;
// }
// const View = (props: ViewProps): ReactElement => <Img fluid={props.data.srcSet} alt={props.data.title} />;

interface ModalProps {
  onClose: () => void;
  images: Image[];
  currentPhoto: number;
}

const ImageModal = (props: ModalProps): ReactElement => {
  const { onClose, images, currentPhoto } = props;
  const theme = useTheme();

  const modalStyles = {
    positioner: (base: any) => ({
      ...base,
      zIndex: theme.zIndex.appBar + 1,
    }),
    blanket: (base: any) => ({
      ...base,
      zIndex: theme.zIndex.appBar + 1,
    }),
  };

  return (
    <ModalGateway>
      {Number.isInteger(currentPhoto) && (
        <Modal allowFullscreen={false} onClose={onClose} styles={modalStyles}>
          <Carousel currentIndex={currentPhoto || 0} views={images} />
        </Modal>
      )}
    </ModalGateway>
  );
};

export default ImageModal;
