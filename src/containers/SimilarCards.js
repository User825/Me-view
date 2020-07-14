import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';

import SmallCardCarousel from 'containers/SmallCardCarousel';

const SimilarCards = ({ id, isShow = false, ...props }) => {
  const getSimilar = isShow ? server.getSimilarShow : server.getSimilarMovies;
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePage, setMorePageStatus] = useState(true);

  useEffect(() => {
    getSimilar(id, page).then((response) => {
      setCards([...cards, ...response.similar]);
      setMorePageStatus(page < response.totalPages);
    });
  }, [id, page]);

  const onReachEnd = () => {
    if (hasMorePage) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {cards.length > 0 && (
        <SmallCardCarousel cards={cards} onReachEnd={onReachEnd} {...props} />
      )}
    </>
  );
};

SimilarCards.propTypes = {
  id: PropTypes.string.isRequired,
  isShow: PropTypes.bool,
};

export default SimilarCards;
