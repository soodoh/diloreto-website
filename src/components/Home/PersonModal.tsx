import React, { ReactElement } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Modal from '../common/Modal';
import { Markdown } from '../../types';

interface PersonProps {
  open: boolean;
  data: {
    fullName: string;
    link?: string;
    bio: Markdown;
  };
  onClose: () => void;
}

const PersonModal = (props: PersonProps): ReactElement => {
  const { open, data, onClose } = props;

  return (
    <Modal open={open} title={data && data.fullName} onClose={onClose}>
      {data && data.link && (
        <Button variant="outlined" color="primary" component="a" href={data.link}>
          View Portfolio
        </Button>
      )}

      <DialogContentText
        variant="body1"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: data && data.bio.childMarkdownRemark.html }}
      />
    </Modal>
  );
};

export default PersonModal;
