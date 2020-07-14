import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DoubleSelector, Chips, Slider } from 'components/form/';
import { Row, Col } from 'components/global/layout/';
import Button from 'components/global/button/';
import { Options } from 'components/icons/';

import { motion, AnimatePresence } from 'framer-motion';

function ChooseFilter({
  allGenres,
  minYear,
  maxYear,
  changeStartYear,
  changeEndYear,
  changeType,
  changeGenres,
}) {
  const genres = useRef(new Set());
  const [genresChips, setGenresChips] = useState();
  const [isChipsLoad, setChipsLoadStatus] = useState(true);
  const [allReset, setAllReset] = useState(true);
  const [isExpanded, setExpandedState] = useState(false);
  const [yearsValue, setYearsValue] = useState([minYear, maxYear]);

  useEffect(() => {
    setChipsLoadStatus(true);
    const allChips = {};

    allGenres.forEach((genre) => (allChips[genre.id] = false));

    setGenresChips(allChips);
    setChipsLoadStatus(false);

    resetState();
  }, [allGenres]);

  const resetState = useCallback(() => {
    genres.current = new Set();
    setAllReset(true);
    changeGenres(null);
  });

  const onGenresReset = (checked) => {
    if (!checked) return;

    const newGenresState = {};

    for (let key in genresChips) {
      newGenresState[key] = false;
    }

    setGenresChips(newGenresState);

    resetState();
  };

  const genreOnChange = ({ checked, id }) => {
    setGenresChips({ ...genresChips, [id]: checked });
    setAllReset(false);

    if (checked) {
      genres.current.add(id);
    } else {
      genres.current.delete(id);
    }

    changeGenres([...genres.current].join(','));
  };

  const yearsOnChange = (years) => {
    const newStartYear = years[0];
    const newEndYear = years[1];

    setYearsValue(years);
    changeStartYear(newStartYear);
    changeEndYear(newEndYear);
  };

  const onExpandedClick = () => setExpandedState(!isExpanded);

  return (
    <>
      <Button
        autoSize
        iconComponent={() => <Options size={25} />}
        iconRight={false}
        styleType="transparent"
        handler={onExpandedClick}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ y: '0%', opacity: 0 }}
            animate={{ y: ['-100%', '10%', '0%'], opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{
              ease: 'linear',
              duration: 0.5,
            }}
          >
            <Row verticalGap="md">
              <Col lg="3" md="4" sm="12" gap="xs">
                <DoubleSelector
                  leftLabel="Фильм"
                  rightLabel="Сериал"
                  value={true}
                  onChange={changeType}
                />
              </Col>
              <Col lg="12" verticalGap="md">
                <Row fluid>
                  <Col gap="xs" verticalGap="xs">
                    <Chips
                      styleType="primary"
                      label="Все жанры"
                      onChange={onGenresReset}
                      checked={allReset}
                    />
                  </Col>
                  {!isChipsLoad && (
                    <>
                      {allGenres.map((genre) => (
                        <Col key={genre.id} gap="xs" verticalGap="xs">
                          <Chips
                            label={genre.name.toLowerCase()}
                            onChange={(checked) =>
                              genreOnChange({ checked, id: genre.id })
                            }
                            checked={genresChips[genre.id]}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </Col>
              <Col lg="12" gap="xs">
                <Slider
                  min={minYear}
                  max={maxYear}
                  defaultValues={[yearsValue[0], yearsValue[1]]}
                  onChange={yearsOnChange}
                />
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

ChooseFilter.propTypes = {
  allGenres: PropTypes.array.isRequired,
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
  changeStartYear: PropTypes.func.isRequired,
  changeEndYear: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changeGenres: PropTypes.func.isRequired,
};

export default ChooseFilter;
