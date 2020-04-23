import React, { Component } from 'react';
import { server } from 'server/';
import { paths } from 'config/';

import { Section } from 'components/global/section/';
import Carousel from 'components/carousel/';
import { CardAnnounce } from 'components/card';
import { Link } from 'react-router-dom';

const START_PAGE = 1;

const carouselParams = {
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  setWrapperSize: true,
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

class NowPlayedMovies extends Component {
  state = {
    movies: [],
    page: START_PAGE,
    hasMorePage: true,
    totalPages: 0,
  };

  componentDidMount() {
    this.getMovies(START_PAGE);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.addNewMovies(this.state.page);
    }
  }

  getMovies = (page) => {
    server.getPlayedMoviesNow(page).then((response) =>
      this.setState({
        movies: response.movies,
        totalPages: response.totalPages,
        hasMorePage: page < response.totalPages,
      })
    );
  };

  addNewMovies = (page) => {
    server.getPlayedMoviesNow(page).then((response) =>
      this.setState((state) => {
        const prevMovies = state.movies;

        return {
          movies: prevMovies.concat(response.movies),
          hasMorePage: page < response.totalPages,
        };
      })
    );
  };

  onReachEnd = () => {
    if (this.state.hasMorePage) {
      this.setState((state) => {
        const prevPage = state.page;

        return {
          page: prevPage + 1 < state.totalPages ? prevPage + 1 : prevPage,
        };
      });
    }
  };

  render() {
    return (
      <Section title="Сейчас в кино" isOneScreen isAnchor>
        <Carousel params={carouselParams} onReachEnd={this.onReachEnd}>
          {this.state.movies.map((movie) => (
            // <Link to={`${paths.MOVIE}${movie.id}`} key={movie.id}>
              <Link
                to={{
                  pathname: `${paths.MOVIE_id}:${movie.id}`,
                }}
                key={movie.id}
                replace
              >
              <CardAnnounce
                title={movie.title}
                desc={movie.desc}
                urlSrcMobile={movie.urlSrcMobile}
                urlSrcDesktop={movie.urlSrcDesktop}
                date={movie.date}
                rating={movie.rating}
              />
            </Link>
          ))}
        </Carousel>
      </Section>
    );
  }
}

NowPlayedMovies.propTypes = {};

export default NowPlayedMovies;
