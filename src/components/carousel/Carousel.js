import React from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import styles from "./carousel.module.css";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import ReactSwipe from "react-swipe";

function Carousel({ params, children }) {
  return (
    <>
    {children.length > 0 && (
       <Swiper {...params}>
       {children.map((child, slideIndex) => (
           <div key={slideIndex} className={styles.slide}>{child}</div>
         ))}
       </Swiper>
    )}
    </>
  );
}

Carousel.propTypes = {};

export default Carousel;
