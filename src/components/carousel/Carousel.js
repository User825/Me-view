import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import styles from "./carousel.module.css";
import classNames from "classnames/bind";

const classNamesModule = classNames.bind(styles);
function Carousel({
  params,
  children,
  isRoundedStyle = true,
  isNavigation = true,
  isPagination = false,
  onReachEnd
}) {
  const [swiper, setSwiper] = useState("");

  useEffect(() => {
    if (swiper) {
      swiper.update();
    }
  });

  const containerStyles = classNamesModule({
    ["swiper-container"]: true,
    rounded: isRoundedStyle,
    container: true,
    withPagination: isPagination
  });

  const eventsParams = {
    on: {
      reachEnd: () => {
        onReachEnd();
      }
    }
  };

  const navigationParams = isNavigation && {
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
      disabledClass: `swiper-button-disabled ${styles.disabledButton}`
    }
  };

  const paginationParams = isPagination && {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      bulletElement: "button"
    }
  };

  const getSwiper = instance => {
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
            <div key={slideIndex} className={styles.slide}>
              {child}
            </div>
          ))}
        </Swiper>
      )}
    </>
  );
}

Carousel.propTypes = {};

export default Carousel;
