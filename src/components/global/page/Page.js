import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { TopRound } from 'components/icons/';
import styles from './page.module.css';

const classNamesModule = classNames.bind(styles);

const Page = ({ children }) => {
  const [isBtnVisible, setBtnVisibleState] = useState(false);
  const buttonStyles = classNamesModule({
    scrollTopVisible: isBtnVisible,
    scrollTopHide: !isBtnVisible,
  });

  const scrollHandler = (evt) => {
    const pages = 1.5;
    const pageHeight = document.documentElement.clientHeight;
    const pageScroll = window.pageYOffset;

    if (pageScroll > pageHeight * pages) {
      setBtnVisibleState(true);
    } else {
      setBtnVisibleState(false);
    }
  };

  const onTopButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
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
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
