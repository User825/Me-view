import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { getRandomNumber, preloadImages } from 'utils/';
import { paths } from 'config/';

import Preloader from 'components/preloader/';
import { Row, Container } from 'components/global/layout/';
import { GlitchButton } from 'components/global/button/';

import ChooseFilter from './ChooseFilter';
import ChoseResults from './ChoseResults';


const START_YEAR_DEFAULT = 1896;
const END_YEAR_DEFAULT = parseInt(
  new Date().toLocaleString('en', { year: 'numeric' })
);

function ChoosePanel({ closeModal }) {
  const [result, setResult] = useState(null);
  const [isResultsLoading, setResultsLoadingState] = useState(false);
  const [isLoading, setLoadingStatus] = useState(true);
  const [noMatches, setNoMatches] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [isMovie, setIsMovie] = useState(true);
  const [actualGenres, setActualGenres] = useState('');
  const startYear = useRef(START_YEAR_DEFAULT);
  const endYear = useRef(END_YEAR_DEFAULT);
  const isRandom = useRef(true);
  const genres = useRef(null);

  useEffect(() => {
    if (allGenres.length === 0) {
      setLoadingStatus(true);
      server.getAllGenres().then((response) => {
        setAllGenres(response);
        setLoadingStatus(false);
      });
    }
  }, [allGenres]);

  useEffect(() => {
    const type = isMovie ? allGenres.movie : allGenres.tv;

    setActualGenres(type);
  }, [isMovie, allGenres.movie, allGenres.tv]);

  const getResults = () => {
    setResultsLoadingState(true);
    const type = isMovie ? 'movie' : 'tv';
    const yearStart =
      type === 'movie' ? 'primary_release_date.gte' : 'air_date.gte';
    const yearEnd =
      type === 'movie' ? 'primary_release_date.lte' : 'air_date.lte';

    const options = {
      with_genres: genres.current,
      [yearStart]: `${startYear.current}-01-01`,
      [yearEnd]: `${endYear.current}-01-01`,
    };

    server.discover(type, options, isRandom).then((response) => {
      const isResults = response.totalResults > 0;

      if (isResults) {
        const randomIndex = getRandomNumber(0, response.items.length - 1);
        const randomItem = response.items[randomIndex];
        const pathPrefix =
          randomItem.type === 'movie' ? paths.MOVIE_id : paths.TV_SHOW_id;
        randomItem.path = `${pathPrefix}${randomItem.id}`;
        preloadImages(randomItem.posterSrc);
        setResult(randomItem);
        setNoMatches(false);
      } else {
        setNoMatches(true);
      }

      setResultsLoadingState(false);
    });
  };

  const changeStartYear = (year) => {
    startYear.current = year;
  };

  const changeEndYear = (year) => {
    endYear.current = year;
  };

  const changeType = (isMovieChoose) => {
    setIsMovie(isMovieChoose);
  };

  const changeGenres = (chosenGenres) => {
    genres.current = chosenGenres;
  };

  return (
    <>
      {isLoading ? (
        <Preloader isAbsolutePosition />
      ) : (
        <Container tagName="section" fluid noBoxShadow>
          <h2 className="visually-hidden">
            Поиск случайного фильма или сериала
          </h2>
          <ChooseFilter
            minYear={START_YEAR_DEFAULT}
            maxYear={END_YEAR_DEFAULT}
            allGenres={actualGenres}
            changeStartYear={changeStartYear}
            changeEndYear={changeEndYear}
            changeType={changeType}
            changeGenres={changeGenres}
          />
          <div
            style={{
              height: '100vh',
              minHeight: '750px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Row lg={{ middle: true, center: true }} verticalGap="md">
              <GlitchButton
                styleType="primary"
                text="Искать"
                size="lg"
                onClick={getResults}
              />
            </Row>
            <ChoseResults
              isLoading={isResultsLoading}
              noMatches={noMatches}
              result={result}
              onResultClick={closeModal}
            />
          </div>
        </Container>
      )}
    </>
  );
}

ChoosePanel.propTypes = {
  closeModal: PropTypes.func,
};

export default ChoosePanel;
