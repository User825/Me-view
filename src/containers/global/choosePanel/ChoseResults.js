import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Card } from 'components/card/';
import Typography from 'components/global/typography/';
import { Row } from 'components/global/layout/';
import Preloader from 'components/preloader/';

function ChoseResults({ isLoading, noMatches, result, onResultClick }) {
  return (
    <>
      {result && (
        <>
          {isLoading && <Preloader />}
          {!isLoading && noMatches && (
            <Typography size="md" color="light">
              Ничего не найдено
            </Typography>
          )}
          {!isLoading && !noMatches && (
            <motion.div
              initial={{ x: '0%', opacity: 0 }}
              animate={{ x: ['-100%', '0%'], opacity: 1 }}
              transition={{
                ease: 'backInOut',
                duration: 0.5,
              }}
            >
              <Row lg={{ middle: true, center: true }} verticalGap="md" fluid>
                <Link
                  to={result.path}
                  onClick={onResultClick}
                  style={{ display: 'block' }}
                >
                  <Card
                    imgSrc={result.posterSrc}
                    title={result.title}
                    rating={result.rating}
                    year={result.year}
                    size="big"
                  />
                </Link>
              </Row>
            </motion.div>
          )}
        </>
      )}
    </>
  );
}

ChoseResults.propTypes = {
  isLoading: PropTypes.bool,
  noMatches: PropTypes.bool,
  result: PropTypes.object,
  onResultClick: PropTypes.func,
};

export default ChoseResults;
