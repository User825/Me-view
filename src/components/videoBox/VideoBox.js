import React from 'react';
import PropTypes from 'prop-types';

import styles from './videoBox.module.css';

import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';

function VideoBox({ id, site, onReady }) {
  const getVideoPlayer = () => {
    switch (site) {
      case 'YouTube':
        return (
          <YouTube
            onReady={onReady}
            containerClassName={styles.videoBox}
            videoId={id}
          />
        );

      case 'Vimeo':
        return (
          <div className={styles.videoBox}>
            <Vimeo video={id} />
          </div>
        );

      default:
        return <strong>No player</strong>;
    }
  };

  return <>{getVideoPlayer()}</>;
}

VideoBox.propTypes = {
  id: PropTypes.string.isRequired,
  site:PropTypes.oneOf(['YouTube', 'Vimeo']).isRequired,
  onReady: PropTypes.func,
};

export default VideoBox;
