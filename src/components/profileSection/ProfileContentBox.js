import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import styles from './profileContentBox.module.css';

const ProfileContentBox = ({ children, isVisible, initialVisible = false }) => {
  const container = useRef();
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
      container.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [isVisible]);

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      initial={initialVisible ? 'visible' : 'hidden'}
      variants={animation}
      style={{ height: 'auto' }}
    >
      <div ref={container} className={styles.container}>
        <div className={styles.box}>{children}</div>
      </div>
    </motion.div>
  );
};

ProfileContentBox.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  initialVisible: PropTypes.bool,
};

export default ProfileContentBox;
