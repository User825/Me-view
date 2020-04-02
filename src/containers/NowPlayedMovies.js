import React, { Component } from "react";
import PropTypes from "prop-types";
import { Section } from "components/global/section/";
import { Row, Col } from "components/global/layout";
import Carousel from "components/carousel/";
import { server } from "server/";
import {CardAnnounce} from 'components/card'

const START_PAGE = 1;

const carouselParams = {
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  setWrapperSize: true,
  speed: 400,
  effect: "slide",
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  watchOverflow: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
};

class NowPlayedMovies extends Component {
  state = {
    movies: [],
    page: START_PAGE,
    hasMorePage: true,
    totalPages: 0
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    server
      .getPlayedMoviesNow(START_PAGE)
      .then(response =>
        this.setState({
          movies: response.movies,
          totalPages: response.totalPages
        })
      );
  };

  render() {
    return (
      <Section title="Сейчас в кино">
        <Carousel params={carouselParams}>
          {this.state.movies.map(movie => (
              <CardAnnounce
              title={movie.title}
              desc={movie.desc}
              urlSrcMobile={movie.urlSrcMobile}
              urlSrcDesktop={movie.urlSrcDesktop}
              date={movie.date}
              rating={movie.rating}
              key={movie.id}
              />
            )
          )}
        </Carousel>
      </Section>
    );
  }
}

NowPlayedMovies.propTypes = {};

export default NowPlayedMovies;
