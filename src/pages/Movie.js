import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { changeColorsSchema } from 'utils/';
import { paths } from 'config/';

import { ProfileSection, ProfileContentBox } from 'components/profileSection/';
import { Section } from 'components/global/section/';
import TrailerList from 'containers/TrailerList';
import TrailerModal from 'containers/TrailerModal';
import ProfileDetails from 'containers/ProfileDetails';
import ProfileDesc from 'containers/ProfileDesc';
import CreditsDetails from 'containers/CreditsDetails';
import Typography from 'components/global/typography';
import SimilarCards from 'containers/SimilarCards';

import { Row, Col } from 'components/global/layout/';
import { Link } from 'react-router-dom';
import { Card } from 'components/card/';

const SIMILAR_MOVIES_TITLE = 'Похожие фильмы';

function Movie({ trailers, movie, credits, backdrop, id }) {
  const [hasModalOpen, setModalOpenState] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({});
  const [isTrailerPage, setTrailerPageState] = useState(false);
  const [isMainPage, setMainPageState] = useState(true);
  const [isCreditPage, setCreditPageStatus] = useState(false);

  useEffect(() => {
    changeColorsSchema(backdrop);
    return () => {
      changeColorsSchema();
    };
  }, [backdrop]);

  useEffect(() => {
    setMainPageState(!isTrailerPage && !isCreditPage);
    return () => {
      setMainPageState(true);
    };
  }, [isTrailerPage, isCreditPage]);

  const closeModal = () => {
    setModalOpenState(false);
  };

  const onTrailerClick = (evt, activeTrailerID) => {
    const activeTrailer = trailers.find(
      (trailer) => trailer.id === activeTrailerID
    );

    setActiveTrailer(activeTrailer);
    setModalOpenState(true);
  };

  const onMoreTrailerChange = () => {
    setTrailerPageState(!isTrailerPage);
  };

  const onMoreCreditsChange = () => {
    setCreditPageStatus(!isCreditPage);
  };

  return (
    <>
      <Section>
        <ProfileSection
          title={movie.title}
          posterSrc={movie.posterSrc}
          rating={movie.rating}
        >
          <ProfileContentBox isVisible={isMainPage} initialVisible>
            <Typography tagName="h2" weight="bold" size="xl">
              {movie.title}
            </Typography>
            <ProfileDetails
              date={movie.releaseDate}
              genres={movie.genres}
              productionCountries={movie.productionCountries}
            >
              <CreditsDetails
                credits={credits}
                onMoreCreditsChange={onMoreCreditsChange}
              />
            </ProfileDetails>
            {trailers && (
              <TrailerList
                trailersList={trailers}
                movieTitle={movie.title}
                onTrailerClick={onTrailerClick}
                onMoreTrailerClick={onMoreTrailerChange}
                movieId={id}
              />
            )}
            <ProfileDesc desc={movie.desc} homepage={movie.homepage} />
          </ProfileContentBox>
          <ProfileContentBox isVisible={isTrailerPage}>
            <button
              type="button"
              className="reset-button"
              onClick={onMoreTrailerChange}
            >
              <Typography size="sm" inlineChildren align="left">
                <Typography tagName="span" isInteractiveOpacity color="accent">
                  ← Вернуться к описанию фильма
                </Typography>
              </Typography>
            </button>
            <TrailerList
              allTrailers
              trailersList={trailers}
              movieTitle={movie.title}
              onTrailerClick={onTrailerClick}
              onMoreTrailerClick={onMoreTrailerChange}
            />
          </ProfileContentBox>
          <ProfileContentBox isVisible={isCreditPage}>
            <button
              type="button"
              className="reset-button"
              onClick={onMoreCreditsChange}
            >
              <Typography size="sm" inlineChildren align="left">
                <Typography tagName="span" isInteractiveOpacity color="accent">
                  ← Вернуться к описанию фильма
                </Typography>
              </Typography>
            </button>
            <Row verticalGap="md">
              {credits.actors.map((actor) => (
                <Col
                  sm="6"
                  md="4"
                  lg="4"
                  gap="sm"
                  verticalGap="sm"
                  key={actor.id}
                >
                  <Link
                    to={{
                      pathname: `${paths.PERSON_id}:${actor.id}`,
                    }}
                  >
                    <Card
                      imgSrc={actor.img}
                      title={actor.name}
                      desc={actor.character}
                      size="small"
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </ProfileContentBox>
        </ProfileSection>
      </Section>

      <SimilarCards
        title={SIMILAR_MOVIES_TITLE}
        linkPrefixPath={paths.MOVIE_id}
        id={id}
      />
      {hasModalOpen && (
        <TrailerModal
          isOpen={hasModalOpen}
          onClose={closeModal}
          site={activeTrailer.site}
          id={activeTrailer.id}
          title={movie.title}
        />
      )}
    </>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Movie;
