import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './carousel.module.css';
import 'swiper/css/swiper.css';

import Swiper from 'react-id-swiper';

const classNamesModule = classNames.bind(styles);
function Carousel({
  params,
  children,
  isRoundedStyle = true,
  isNavigation = true,
  isPagination = false,
  onReachEnd,
  indent = 'none',
}) {
  const [swiper, setSwiper] = useState('');

  useEffect(() => {
    if (swiper) {
      swiper.update();
    }
  });

  const containerStyles = classNamesModule({
    'swiper-container': true,
    rounded: isRoundedStyle,
    container: true,
    withPagination: isPagination,
  });

  const slideIndentStyles = classNamesModule({
    indent_sm: indent === 'sm',
    indent_md: indent === 'md',
    indent_lg: indent === 'lg',
  });

  const eventsParams = {
    on: {
      reachEnd: () => {
        if (onReachEnd) onReachEnd();
      },
    },
  };

  const navigationParams = isNavigation && {
    navigation: {
      nextEl: `.swiper-button-next.${styles.nextButton}`,
      prevEl: `.swiper-button-prev.${styles.prevButton}`,
      disabledClass: `swiper-button-disabled ${styles.disabledButton}`,
    },
  };

  const paginationParams = isPagination && {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletElement: 'button',
    },
  };

  const getSwiper = (instance) => {
    setSwiper(instance);
  };

  return (
    <>
      {children.length > 0 && (
        <Swiper
          containerClass={containerStyles}
          getSwiper={getSwiper}
          {...params}
          {...eventsParams}
          {...navigationParams}
          {...paginationParams}
        >
          {children.map((child, slideIndex) => (
            <div key={slideIndex} className={slideIndentStyles}>
              {child}
            </div>
          ))}
        </Swiper>
      )}
    </>
  );
}

Carousel.propTypes = {
  params: PropTypes.object,
  isRoundedStyle: PropTypes.bool,
  isNavigation: PropTypes.bool,
  isPagination: PropTypes.bool,
  onReachEnd: PropTypes.func,
  indent: PropTypes.oneOf(['lg', 'md', 'sm']),
  children: PropTypes.node,
};

export default Carousel;
