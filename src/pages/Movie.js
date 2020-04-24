import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { changeColorsSchema } from 'utils/';

import MovieSection from 'components/movieSection/';
import { Section } from 'components/global/section/';
import Preloader from 'components/preloader';

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
    isLoading: true,
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

  componentWillUnmount() {
    changeColorsSchema();
  }

  getMovie = (id) => {
    this.setState({ isLoading: true });
    server.getMovie(id).then((response) => {
      document.title = `${response.title}`;
      this.setState({ movieData: response, isLoading: false });
    });
  };

  getBackdrop = (id) => {
    server.getBackdrop(id).then((response) => changeColorsSchema(response));
  };

  getTrailer = (id) => {
    server.getTrailer(id, 'RU').then((response) => {
      if (response.results.length > 0) {
        const trailers = getTrailersDetails(response.results);
        
        server.getTrailer(id, 'EN').then((responseEn) => {
          const trailersEng = responseEn.results
            ? getTrailersDetails(responseEn.results)
            : null;
          const allTrailers = trailers.concat(trailersEng);

          this.setState({ trailersData: allTrailers });
        });
      } else {
        server.getTrailer(id, 'EN').then((responseEn) => {
          const trailersEng = responseEn.results
            ? getTrailersDetails(responseEn.results)
            : null;

          this.setState({ trailersData: trailersEng });
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
    const { trailersData, movieData, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <Preloader isAbsolutePosition />
        ) : (
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
