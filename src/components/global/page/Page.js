import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { TopRound } from 'components/icons/';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './page.module.css';

const classNamesModule = classNames.bind(styles);

const Page = ({ children }) => {
  const [isBtnVisible, setBtnVisibleState] = useState(false);
  const scrollbar = useRef();
  const buttonStyles = classNamesModule({
    scrollTopVisible: isBtnVisible,
    scrollTopHide: !isBtnVisible,
  });

  const scrollHandler = (evt) => {
    const pages = 1.5;
    const pageHeight = evt.target.clientHeight;
    const pageScroll = evt.target.scrollTop;

    if(pageScroll > pageHeight * pages) {
      setBtnVisibleState(true);
    } else {
      setBtnVisibleState(false);
    }
  };

  const onTopButtonClick = () => {
    scrollbar.current.view.scroll({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <div className={styles.pageWrapper}>
      <Scrollbars
        universal
        hideTracksWhenNotNeeded
        ref={scrollbar}
        onScroll={scrollHandler}
        renderView={(props) => (
          <div {...props} id={'page-root'} className={styles.scrolledContent} />
        )}
        renderTrackVertical={props => <div {...props} className={styles.track}/>}
        renderThumbVertical={props => <div {...props} className={styles.thumb}/>}
      >
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
      </Scrollbars>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
