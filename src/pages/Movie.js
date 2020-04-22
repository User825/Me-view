import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { changeColorsSchema } from 'utils/';

import MovieSection from 'components/movieSection/';
import { Section } from 'components/global/section/';

import SimilarMovies from 'containers/SimilarMovies';
import TrailerModal from 'containers/TrailerModal';

const getYoutubePosterSrc = (videoId) => {
  return `http://img.youtube.com/vi/${videoId}/0.jpg`;
};

const getTrailersDetails = (responseTrailers) => {
  return responseTrailers.map((trailer) => {
    const site = trailer.site;
    const id = trailer.key;

    return {
      id,
      site,
      poster: site === 'YouTube' ? getYoutubePosterSrc(id) : null,
    };
  });
};

class Movie extends PureComponent {
  state = {
    movieData: null,
    trailersData: [],
    isModalOpen: false,
    activeTrailer: {},
  };

  componentDidMount() {
    this.getMovie(this.props.id);
    this.getTrailer(this.props.id);
    this.getBackdrop(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.getMovie(this.props.id);
      this.getTrailer(this.props.id);
      this.getBackdrop(this.props.id);
    }
  }

  getMovie = (id) => {
    server
      .getMovie(id)
      .then((response) => this.setState({ movieData: response }));
  };

  getBackdrop = (id) => {
    server.getBackdrop(id).then((response) => changeColorsSchema(response));
  };

  getTrailer = (id) => {
    server.getTrailer(id, 'RU').then((response) => {
      if (response.results) {
        const trailers = getTrailersDetails(response.results);

        this.setState({ trailersData: trailers });
      } else {
        server.getTrailer(id, 'EN').then((responseEn) => {
          const trailers = responseEn.results
            ? getTrailersDetails(responseEn.results)
            : null;

          this.setState({ trailersData: trailers });
        });
      }
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onTrailerClick = (evt, trailer) => {
    this.setState({ isModalOpen: true, activeTrailer: trailer });
  };

  render() {
    console.log(this.props)
    const { trailersData, movieData } = this.state;
    return (
      <>
        {movieData && (
          <>
            <Section>
              <MovieSection
                {...movieData}
                trailers={trailersData}
                onTrailerClick={this.onTrailerClick}
              />
              {this.props.id && <SimilarMovies movieId={this.props.id} />}
            </Section>
            {this.state.isModalOpen > 0 && (
              <TrailerModal
                isOpen={this.state.isModalOpen}
                onClose={this.closeModal}
                site={this.state.activeTrailer.site}
                id={this.state.activeTrailer.id}
                title={movieData.title}
              />
            )}
          </>
        )}
      </>
    );
  }
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Movie;
