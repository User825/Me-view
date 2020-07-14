import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Scrollbars } from 'react-custom-scrollbars';
import { motion, useMotionValue } from 'framer-motion';

import styles from './profileContentBox.module.css'

const ProfileContentBox = ({ children, isVisible, initialVisible = false }) => {
  const scrollbar = useRef();
  const displayStyles = useMotionValue('block');

  const animation = {
    hidden: {
      x: '-100%',
      transitionEnd: { height: 0 },
    },
    visible: {
      x: '0%',
      transition: { duration: 0.2, ease: 'linear' },

      transitionEnd: { height: 'auto' },
    },
  };

  useEffect(() => {
    if (isVisible) {
      scrollbar.current.scrollToTop();
    }
  }, [scrollbar, isVisible, displayStyles]);

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      initial={initialVisible ? 'visible' : 'hidden'}
      variants={animation}
      style={{ height: 'auto' }}
    >
      <Scrollbars
        ref={scrollbar}
        autoHide
        renderView={(props) => (
          <div {...props} className={styles.scrolledBox} />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className={styles.track} />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className={styles.thumb} />
        )}
      >
        <div className={styles.contentContainer}>{children}</div>
      </Scrollbars>
    </motion.div>
  );
};

ProfileContentBox.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  initialVisible: PropTypes.bool
}

export default ProfileContentBox;

