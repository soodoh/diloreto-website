import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Modal from '../common/Modal';

const PersonModal = props => {
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

PersonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    link: PropTypes.string,
    bio: PropTypes.object.isRequired,
  }),
};
PersonModal.defaultProps = {
  data: null,
};

export default PersonModal;
