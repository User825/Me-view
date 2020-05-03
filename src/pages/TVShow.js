import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { changeColorsSchema, createCountFormatter } from 'utils/';
import { paths } from 'config/';

import MovieSection from 'components/movieSection/';
import { Section } from 'components/global/section/';
import Preloader from 'components/preloader';
import TrailerList from 'containers/TrailerList';
import SmallCardCarousel from 'containers/SmallCardCarousel';
import TrailerModal from 'containers/TrailerModal';
import MovieDetails from 'containers/MovieDetails';
import MovieDesc from 'containers/MovieDesc';
import SimilarWrapper from 'containers/SimilarWrapper';

const seasonsQuantityText = (number) => {
  const postfixs = {
    one: '',
    two: 'а',
    few: 'ов',
  };

  const contPostfix = createCountFormatter(number, postfixs);

  return `${number} сезон${contPostfix}`;
};

class TVShow extends PureComponent {
  state = {
    showData: null,
    trailersData: [],
    isModalOpen: false,
    activeTrailer: {},
    isLoading: true,
  };

  componentDidMount() {
    this.getShowDetails(this.props.id);
    this.getTrailer(this.props.id);
    this.getBackdrop(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.getShowDetails(this.props.id);
      this.getTrailer(this.props.id);
      this.getBackdrop(this.props.id);
    }
  }

  componentWillUnmount() {
    changeColorsSchema();
  }

  getShowDetails = (id) => {
    this.setState({ isLoading: true });
    server.getShowAllData(id).then((response) => {
      document.title = `${response.title}`;
      this.setState({ showData: response, isLoading: false });
    });
  };

  getBackdrop = (id) => {
    server.getBackdropShow(id).then((response) => changeColorsSchema(response));
  };

  getTrailer = (id) => {
    server.getShowTrailers(id, 'ru').then((response) => {
      const trailersLocale = response ? response : [];

      server.getShowTrailers(id, 'en').then((responseEn) => {
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

  SimilarShowsCarousel = SimilarWrapper({
    WrappedComponent: SmallCardCarousel,
    id: this.props.id,
    isShow: true,
  });

  render() {
    const { trailersData, showData, isLoading } = this.state;
    const SimilarShowsCarousel = this.SimilarShowsCarousel;

    return (
      <>
        {isLoading ? (
          <Preloader isAbsolutePosition />
        ) : (
          <>
            <Section gap="sm" verticalGap="sm">
              <MovieSection
                title={showData.title}
                posterSrc={showData.posterSrc}
                rating={showData.rating}
                DetailsContent={() => (
                  <MovieDetails
                    date={showData.year}
                    genres={showData.genres}
                    productionCountries={showData.productionCountries}
                  >
                    {seasonsQuantityText(showData.seasonsQuantity)}
                  </MovieDetails>
                )}
                TrailersContent={() => (
                  <>
                    {trailersData && (
                      <TrailerList
                        trailersList={trailersData}
                        movieTitle={showData.title}
                        onTrailerClick={this.onTrailerClick}
                      />
                    )}
                  </>
                )}
                DescContent={() => (
                  <MovieDesc
                    desc={showData.desc}
                    homepage={showData.homepage}
                  />
                )}
              />
              <SimilarShowsCarousel
                title="Похожие сериалы"
                linkPrefixPath={paths.TV_SHOW_id}
              />
            </Section>
            {this.state.isModalOpen > 0 && (
              <TrailerModal
                isOpen={this.state.isModalOpen}
                onClose={this.closeModal}
                site={this.state.activeTrailer.site}
                id={this.state.activeTrailer.id}
                title={showData.title}
              />
            )}
          </>
        )}
      </>
    );
  }
}

TVShow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TVShow;
