import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';
import VideoBox from 'components/videoBox/';
import Preloader from 'components/preloader';

function TrailerModal({ isOpen, onClose, site, id, title }) {
  const [videoReady, setVideoReady] = useState(false);

  const onVideoReady = () => {
    setVideoReady(true);
  };

  return (
    <>
      {id && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          hasCloseButton={false}
          contentLabel={`Трейлер фильма ${title}`}
        >
          {!videoReady && <Preloader isAbsolutePosition/>}
          <VideoBox id={id} site={site} onReady={onVideoReady} />
        </Modal>
      )}
    </>
  );
}

TrailerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  site: PropTypes.oneOf(['YouTube', 'Vimeo']).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TrailerModal;
