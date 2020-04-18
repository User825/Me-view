import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import Carousel from 'components/carousel/';
import { paths } from 'config/';
import { Card, CardSkeleton } from 'components/card/';
import { Link } from 'react-router-dom';
import Preloader from 'components/preloader/';
import { Row, Col } from 'components/global/layout';

const carouselParams = {
  slidesPerView: 10,
  slidesPerGroup: 6,
  spaceBetween: 10,
  speed: 400,
  effect: 'slide',
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  watchOverflow: true,
  simulateTouch: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
};

class SimilarMovies extends Component {
  state = {
    movies: [],
    pages: '',
  };

  componentDidMount() {
    this.getSimilarMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.movieId) {
      this.getSimilarMovies();
    }
  }

  getSimilarMovies = () => {
    server
      .getSimilarMovies(this.props.movieId, 'RU')
      .then((response) => this.setState({ movies: response.movies }));
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        {movies.length > 0 && (
          <>
            <h2>Похожие фильмы</h2>
            <Col lg="12">
              <Carousel params={carouselParams} indent="sm">
                {movies.map((movie) => (
                  <Link to={`${paths.MOVIE}${movie.id}`} key={movie.id} replace>
                    <Card
                      title={movie.title}
                      imgSrc={movie.imgSrc}
                      rating={movie.rating}
                      size="small"
                      fixedTitleHeight
                    />
                  </Link>
                ))}
              </Carousel>
            </Col>
          </>
        )}
      </>
    );
  }
}

SimilarMovies.propTypes = {};

export default SimilarMovies;
