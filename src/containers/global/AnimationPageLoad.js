import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

function AnimationPageLoad({ children }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'anticipate' }}
    >
      {children}
    </motion.div>
  );
}

AnimationPageLoad.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimationPageLoad;
