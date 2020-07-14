import React from 'react';
import PropTypes from 'prop-types';

import { AnimatePresence, motion } from 'framer-motion';

function AnimationPageLoad({ children }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'anticipate' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

AnimationPageLoad.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimationPageLoad;
