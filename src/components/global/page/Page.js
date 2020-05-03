import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { TopRound } from 'components/icons/';
import styles from './page.module.css';

const classNamesModule = classNames.bind(styles);
function Page({ children }) {
  const [isBtnVisible, setBtnVisibleState] = useState(false);
  const page = document.documentElement;
  const buttonStyles = classNamesModule({
    scrollTop: 'icon',
    scrollTopVisible: isBtnVisible,
  });

  const onScrollHandler = () => {
    const viewportHeight = page.clientHeight;
    const scrollPosition = page.scrollTop;
    const pages = 1;

    if (scrollPosition > viewportHeight * pages) {
      setBtnVisibleState(true);
    } else {
      setBtnVisibleState(false);
    }
  };

  const onTopButtonClick = () => (page.scrollTop = 0);

  useEffect(() => {
    window.onscroll = () => onScrollHandler();
  });

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={buttonStyles}
        onClick={onTopButtonClick}
        aria-label="Scroll to top"
      >
        <TopRound isSize={false} />
      </button>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
