import React from 'react';
import styles from "./logo.module.css";

function Logo({ width = '', fill = 'inherit' }) {
  return (
    <h1 className={styles.logo}>Me view</h1>
  );
}

export default Logo;
