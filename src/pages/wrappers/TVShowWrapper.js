import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';

import { AnimatePresence } from 'framer-motion';

import Preloader from 'components/preloader';

import AnimationPageLoad from 'containers/global/AnimationPageLoad';
import TVShow from 'pages/TVShow';

function TVShowWrapper({ id, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showData, setShowData] = useState();
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [trailers, setTrailers] = useState();
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);
  const [backdrop, setBackdrop] = useState();
  const [isBackdropLoading, setIsBackdropLoading] = useState(true);
  const [credits, setCredits] = useState();
  const [isCreditsLoading, setIsCreditsLoading] = useState(true);

  useEffect(() => {
    getShowDetails(id);
    getTrailer(id);
    getBackdrop(id);
    getCredits(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(
      isShowLoading || isTrailerLoading || isBackdropLoading || isCreditsLoading
    );
  }, [isShowLoading, isTrailerLoading, isBackdropLoading, isCreditsLoading]);

  const getShowDetails = (id) => {
    setIsShowLoading(true);
    server.getShowAllData(id).then((response) => {
      document.title = `${response.title}`;

      setShowData(response);
      setIsShowLoading(false);
    });
  };

  const getBackdrop = (id) => {
    setIsBackdropLoading(true);
    server.getBackdropShow(id).then((response) => {
      setBackdrop(response);
      setIsBackdropLoading(false);
    });
  };

  const getTrailer = (id) => {
    setIsTrailerLoading(true);
    server.getShowTrailers(id, 'ru').then((response) => {
      const trailersLocale = response ? response : [];

      server.getShowTrailers(id, 'en').then((responseEn) => {
        const trailersEng = responseEn ? responseEn : [];
        const allTrailers = trailersLocale.concat(trailersEng);

        setTrailers(allTrailers);
        setIsTrailerLoading(false);
      });
    });
  };

  const getCredits = (id) => {
    setIsCreditsLoading(true);
    server.getCredits(id, 'ru', true).then((credits) => {
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
          <TVShow
            showData={showData}
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

TVShowWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TVShowWrapper;
