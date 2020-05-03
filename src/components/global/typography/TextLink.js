import React from 'react';
import PropTypes from 'prop-types';

import styles from './textLink.module.css';

function TextLink({ children, href = '#!' }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

TextLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};

export default TextLink;
