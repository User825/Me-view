import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './headerBox.module.css';
import paths from 'config/routerPaths';

import Typography from 'components/global/typography';

const mainPath = paths.MAIN;
const HeaderBox =  React.forwardRef(({ children }, ref) => {
  return (
    <header ref={ref} className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoBox}>
          <Link to={mainPath}>
            <Typography
              tagName="h1"
              weight="bold"
              size="lg"
              isGlitch
              color="changed-contrast"
            >
              Me view
            </Typography>
          </Link>
        </div>
        <div className={styles.actionsBox}>{children}</div>
      </div>
    </header>
  );
})

HeaderBox.propTypes = {
  children: PropTypes.node,
};

export default HeaderBox;
