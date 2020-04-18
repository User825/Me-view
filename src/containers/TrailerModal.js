import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';
import VideoBox from 'components/videoBox/';

function TrailerModal({ isOpen, onClose, site, id, title }) {
  return (
    <>
      {id && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          hasCloseButton={false}
          contentLabel={`Трейлер фильма ${title}`}
        >
          <VideoBox id={id} site={site} />
        </Modal>
      )}
    </>
  );
}

TrailerModal.propTypes = {};

export default TrailerModal;
