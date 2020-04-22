import React from 'react';

import styles from './logo.module.css';

const LOGO_TEXT = 'Me view';

function Logo() {
  return (
    <h1 className={styles.logo} text={LOGO_TEXT}>
      {LOGO_TEXT}
    </h1>
  );
}

export default Logo;
