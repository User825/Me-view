import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import Carousel from 'components/carousel/';
import { paths } from 'config/';
import { Card } from 'components/card/';
import { Link } from 'react-router-dom';
import { Row, Col } from 'components/global/layout';
import Typography from 'components/global/typography';

const carouselParams = {
  spaceBetween: 10,
  speed: 300,
  effect: 'slide',
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  watchOverflow: true,
  simulateTouch: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
    465: {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 6,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 8,
      slidesPerGroup: 3,
    },
    1440: {
      slidesPerView: 10,
      slidesPerGroup: 3,
    },
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
    if (this.props.movieId !== prevProps.movieId) {
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
            <Row verticalGap="md">
              <Typography tagName="h2" size="md">
                Похожие фильмы
              </Typography>
            </Row>
            <Col lg="12">
              <Carousel params={carouselParams} indent="sm">
                {movies.map((movie) => (
                  // <Link to={`${paths.MOVIE}${movie.id}`} key={movie.id} replace>
                  <Link
                    to={{
                      pathname: `${paths.MOVIE_id}:${movie.id}`,
                    }}
                    key={movie.id}
                    replace
                  >
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

SimilarMovies.propTypes = {
  movieId: PropTypes.string,
};

export default SimilarMovies;
