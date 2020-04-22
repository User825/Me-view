import React, { Component } from 'react';

import { Section } from 'components/global/section/';
import CardList from 'components/cardList';
import { Card, CardSkeleton } from 'components/card/';
import { Col } from 'components/global/layout';
import { server } from 'server/';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { paths } from 'config/';

const START_PAGE = 1;

function SkeletonResults({ quantity, text }) {
  const skeletonList = [];
  skeletonList.length = quantity;
  skeletonList.fill({ text });

  return skeletonList.map((skeleton, index) => {
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="section"
        key={index}
      >
        <CardSkeleton text={skeleton.text} />
      </Col>
    );
  });
}

function MoviesResults({ movies }) {
  return movies.map((movie) => {
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="div"
        key={movie.id}
      >
        {/* <Link to={`${paths.MOVIE}${movie.id}`} replace> */}
        <Link
          to={{
            pathname: paths.MOVIE_1,
            search: `?${movie.id}`,
            state: movie.id
          }}
          replace
        >
          <Card
            imgSrc={movie.imgSrc}
            title={movie.title}
            year={movie.year}
            genres={movie.genres}
            rating={movie.rating}
          />
        </Link>
      </Col>
    );
  });
}

class PopularMovies extends Component {
  state = {
    movies: [],
    isLoading: true,
    hasMorePage: true,
    totalPages: 0,
    isFetching: false,
  };

  componentDidMount() {
    this.getPopularMovies(START_PAGE);
  }

  getPopularMovies = (page) => {
    server.getPopularMovies(page).then((response) => {
      const { movies, totalPages } = response;
      this.setState({
        movies: movies,
        totalPages: totalPages,
        isLoading: false,
      });
    });
  };

  onLoad = (page) => {
    this.setState({ isFetching: true, hasMorePage: false });

    server.getPopularMovies(page).then((response) => {
      this.setState((state) => {
        const prevMovies = state.movies;

        return {
          movies: prevMovies.concat(response.movies),
          isFetching: false,
          hasMorePage: page < response.totalPages,
        };
      });
    });
  };

  render() {
    return (
      <Section title="Популярные фильмы">
        <>
          {this.state.isLoading ? (
            <CardList>
              <SkeletonResults quantity={12} />
            </CardList>
          ) : (
            <>
              <InfiniteScroll
                pageStart={START_PAGE}
                loadMore={this.onLoad}
                hasMore={this.state.hasMorePage}
                threshold={300}
              >
                <CardList>
                  <MoviesResults movies={this.state.movies} />
                  {this.state.isFetching && <SkeletonResults quantity={12} />}
                </CardList>
              </InfiniteScroll>
            </>
          )}
        </>
      </Section>
    );
  }
}

PopularMovies.propTypes = {};

export default PopularMovies;
