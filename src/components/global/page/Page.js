import React from 'react';
import PropTypes from 'prop-types';

import styles from './page.module.css';

function Page({ children }) {
  return <div className={styles.page}>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
