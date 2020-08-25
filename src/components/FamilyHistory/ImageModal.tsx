import React, { ReactElement } from 'react';
import { useTheme } from '@material-ui/styles';
import Carousel, { Modal, ModalGateway, ViewType } from 'react-images';
// import Img from 'gatsby-image';
import { Image } from '../../types';

interface ModalProps {
  onClose: () => void;
  images: Image[];
  currentPhoto: number;
}

const ImageModal = (props: ModalProps): ReactElement => {
  const { onClose, images, currentPhoto } = props;
  const theme = useTheme();
  const formattedImages: any[] = images.map(photo => ({
    src: photo.fullSize.src,
    srcSet: photo.fullSize,
    caption: photo.description,
    alt: photo.title,
  }));

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
          <Carousel currentIndex={currentPhoto || 0} views={formattedImages} />
        </Modal>
      )}
    </ModalGateway>
  );
};

export default ImageModal;
