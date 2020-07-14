import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { changeColorsSchema, createCountFormatter } from 'utils/';
import { paths } from 'config/';

import { Link } from 'react-router-dom';

import { ProfileSection, ProfileContentBox } from 'components/profileSection/';
import { Section } from 'components/global/section/';
import Typography from 'components/global/typography';
import { Row, Col } from 'components/global/layout/';
import { Card } from 'components/card/';

import TrailerList from 'containers/TrailerList';
import CreditsDetails from 'containers/CreditsDetails';
import TrailerModal from 'containers/TrailerModal';
import ProfileDetails from 'containers/ProfileDetails';
import ProfileDesc from 'containers/ProfileDesc';
import SimilarCards from 'containers/SimilarCards';

const seasonsQuantityText = (number) => {
  const postfixs = {
    one: '',
    two: 'а',
    few: 'ов',
  };

  const contPostfix = createCountFormatter(number, postfixs);

  return `${number} сезон${contPostfix}`;
};

const TVShow = ({ showData, trailers, backdrop, id, credits }) => {
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

  const onMoreCreditsChange = () => {
    setCreditPageStatus(!isCreditPage);
  };

  const onMoreTrailerClick = () => {
    setTrailerPageState(!isTrailerPage);
  };

  return (
    <>
      <Section>
        <ProfileSection
          title={showData.title}
          posterSrc={showData.posterSrc}
          rating={showData.rating}
        >
          <ProfileContentBox isVisible={isMainPage} initialVisible>
            <Typography tagName="h2" weight="bold" size="xl">
              {showData.title}
            </Typography>
            <ProfileDetails
              date={showData.year}
              genres={showData.genres}
              productionCountries={showData.productionCountries}
            >
              {seasonsQuantityText(showData.seasonsQuantity)}
              <CreditsDetails
                credits={credits}
                onMoreCreditsChange={onMoreCreditsChange}
              />
            </ProfileDetails>
            {trailers && (
              <TrailerList
                trailersList={trailers}
                movieTitle={showData.title}
                onTrailerClick={onTrailerClick}
                onMoreTrailerClick={onMoreTrailerClick}
              />
            )}
            <ProfileDesc desc={showData.desc} homepage={showData.homepage} />
          </ProfileContentBox>

          <ProfileContentBox isVisible={isTrailerPage}>
            <button
              type="button"
              className="reset-button"
              onClick={onMoreTrailerClick}
            >
              <Typography size="sm" inlineChildren align="left">
                <Typography tagName="span" isInteractiveOpacity color="accent">
                  ← Вернуться к описанию сериала
                </Typography>
              </Typography>
            </button>
            <TrailerList
              allTrailers
              trailersList={trailers}
              movieTitle={showData.title}
              onTrailerClick={onTrailerClick}
              onMoreTrailerClick={onMoreTrailerClick}
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
                  ← Вернуться к описанию сериала
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
        title="Похожие сериалы"
        linkPrefixPath={paths.TV_SHOW_id}
        id={id}
        isShow
      />
      {hasModalOpen > 0 && (
        <TrailerModal
          isOpen={hasModalOpen}
          onClose={closeModal}
          site={activeTrailer.site}
          id={activeTrailer.id}
          title={showData.title}
        />
      )}
    </>
  );
};

TVShow.propTypes = {
  id: PropTypes.string.isRequired,
  showData: PropTypes.PropTypes.shape({
    desc: PropTypes.string,
    genres: PropTypes.string,
    homepage: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    posterSrc: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    year: PropTypes.string,
    seasonsQuantity: PropTypes.number,
  }),
  trailers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      poster: PropTypes.string,
      site: PropTypes.oneOf(['YouTube', 'Vimeo']),
    })
  ),
  backdrop: PropTypes.string,
  credits: PropTypes.shape({
    actors: PropTypes.array,
    crew: PropTypes.array,
    directors: PropTypes.array,
  }),
};

export default TVShow;
