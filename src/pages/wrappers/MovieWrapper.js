import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';
import { constants } from 'config/';

import { AnimatePresence } from 'framer-motion';

import Preloader from 'components/preloader/';

import AnimationPageLoad from 'containers/global/AnimationPageLoad';
import Movie from 'pages/Movie';

function MovieWrapper({ id, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [trailers, setTrailers] = useState();
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);
  const [backdrop, setBackdrop] = useState();
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const [credits, setCredits] = useState();
  const [isCreditsLoading, setIsCreditsLoading] = useState(true);

  useEffect(() => {
    getMovie(id);
    getTrailer(id);
    getBackdrop(id);
    getCredits(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(
      isMovieLoading ||
        isTrailerLoading ||
        isBackdropLoading ||
        isCreditsLoading
    );
  }, [isMovieLoading, isTrailerLoading, isBackdropLoading, isCreditsLoading]);

  const getMovie = (id) => {
    setIsMovieLoading(true);

    server.getMovie(id).then((response) => {
      document.title = `${response.title}`;

      setMovie(response);
      setIsMovieLoading(false);
    });
  };

  const getTrailer = (id) => {
    setIsTrailerLoading(true);

    server.getTrailer(id, 'ru').then((response) => {
      const trailersLocale = response ? response : [];

      server.getTrailer(id, 'en').then((responseEn) => {
        const trailersEng = responseEn ? responseEn : [];
        const allTrailers = trailersLocale.concat(trailersEng);

        setTrailers(allTrailers);
        setIsTrailerLoading(false);
      });
    });
  };

  const getBackdrop = (id) => {
    const mobileMax = constants.breakpoints.mobile;
    const breakpoint = window.matchMedia(`(min-width: ${mobileMax}px)`);
    const isNoMobile = breakpoint.matches === true;

    if (isNoMobile) {
      setIsBackdropLoading(true);
      server.getBackdropMovie(id).then((response) => {
        setBackdrop(response);
        setIsBackdropLoading(false);
      });
    }
  };

  const getCredits = (id) => {
    setIsCreditsLoading(true);
    server.getCredits(id).then((credits) => {
      const directors = credits.crew.filter(
        (person) => person.job === 'Director'
      );

      setCredits({ directors, ...credits });
      setIsCreditsLoading(false);
    });
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader />
      ) : (
        <AnimationPageLoad>
          <Movie
            movie={movie}
            trailers={trailers}
            backdrop={backdrop}
            credits={credits}
            id={id}
            {...props}
          />
        </AnimationPageLoad>
      )}
    </AnimatePresence>
  );
}

MovieWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MovieWrapper;
