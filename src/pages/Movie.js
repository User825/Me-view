import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { changeColorsSchema } from 'utils/';
import { paths } from 'config/';

import MovieSection from 'components/movieSection/';
import { Section } from 'components/global/section/';
import Preloader from 'components/preloader/';
import TrailerList from 'containers/TrailerList';
import SmallCardCarousel from 'containers/SmallCardCarousel';
import TrailerModal from 'containers/TrailerModal';
import MovieDetails from 'containers/MovieDetails';
import MovieDesc from 'containers/MovieDesc';
import SimilarWrapper from 'containers/SimilarWrapper';

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
    server.getBackdropMovie(id).then((response) => {
      changeColorsSchema(response);
    });
  };

  getTrailer = (id) => {
    server.getTrailer(id, 'ru').then((response) => {
      const trailersLocale = response ? response : [];

      server.getTrailer(id, 'en').then((responseEn) => {
        const trailersEng = responseEn ? responseEn : [];
        const allTrailers = trailersLocale.concat(trailersEng);

        this.setState({ trailersData: allTrailers });
      });
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onTrailerClick = (evt, activeTrailerID) => {
    const activeTrailer = this.state.trailersData.find(
      (trailer) => trailer.id === activeTrailerID
    );
    this.setState({ isModalOpen: true, activeTrailer: activeTrailer });
  };

  SimilarMoviesCarousel = SimilarWrapper({
    WrappedComponent: SmallCardCarousel,
  });

  render() {
    const { trailersData, movieData, isLoading } = this.state;
    const SimilarMoviesCarousel = this.SimilarMoviesCarousel;
    return (
      <>
        {isLoading ? (
          <Preloader isAbsolutePosition />
        ) : (
          <>
            <Section gap="sm" verticalGap="sm">
              <MovieSection
                title={movieData.title}
                posterSrc={movieData.posterSrc}
                rating={movieData.rating}
                DetailsContent={() => (
                  <MovieDetails
                    date={movieData.releaseDate}
                    genres={movieData.genres}
                    productionCountries={movieData.productionCountries}
                  />
                )}
                TrailersContent={() => (
                  <>
                    {trailersData && (
                      <TrailerList
                        trailersList={trailersData}
                        movieTitle={movieData.title}
                        onTrailerClick={this.onTrailerClick}
                      />
                    )}
                  </>
                )}
                DescContent={() => (
                  <MovieDesc
                    desc={movieData.desc}
                    homepage={movieData.homepage}
                  />
                )}
              />
              <SimilarMoviesCarousel
                title="Похожие фильмы"
                linkPrefixPath={paths.MOVIE_id}
                id={this.props.id}
              />
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
