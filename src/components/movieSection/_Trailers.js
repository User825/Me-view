import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Col, Row } from 'components/global/layout';
import { Play, Down } from 'components/icons';

import styles from './_trailers.module.css';

const classNamesModule = classNames.bind(styles);
function Trailers({ trailersList, movieTitle, onTrailerClick }) {
  const headTrailer = trailersList.slice(0, 3);
  const otherTrailers = trailersList.slice(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionPanelStyles = classNamesModule({
    panelExpanded: isExpanded,
  });

  const accordionButtonStyles = classNamesModule({
    accordionButton: true,
    buttonExpanded: isExpanded,
  });

  const onChange = () => setIsExpanded(!isExpanded);
  return (
    <>
      <Row fluid>
        {headTrailer.map((trailer) => (
          <Col lg="3" md="4" key={trailer.id} className={styles.box}>
            <button
              className={styles.trailerButton}
              aria-label={`Смотреть трейлер к фильму ${movieTitle}`}
              onClick={(evt) => onTrailerClick(evt, trailer)}
            >
              <Play size={45} />
              <img
                src={
                  trailer.poster
                    ? trailer.poster
                    : `${process.env.PUBLIC_URL}/img/no-image.jpg`
                }
                alt={`Изображение из трейлера к фильму ${movieTitle}`}
              />
            </button>
          </Col>
        ))}
      </Row>
      {otherTrailers.length > 0 && (
        <Accordion
          className={styles.accordion}
          allowZeroExpanded
          onChange={onChange}
        >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <button type="button" className={accordionButtonStyles}>
                  <span>Все трейлеры</span>
                  <Down />
                </button>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles.panel}>
              <Row fluid className={accordionPanelStyles}>
                {otherTrailers.map((trailer) => (
                  <Col lg="3" md="4" key={trailer.id} className={styles.box}>
                    <button
                      className={styles.trailerButton}
                      aria-label={`Смотреть трейлер к фильму ${movieTitle}`}
                      onClick={(evt) => onTrailerClick(evt, trailer)}
                    >
                      <Play size={45} />
                      <img
                        src={
                          trailer.poster
                            ? trailer.poster
                            : `${process.env.PUBLIC_URL}/img/no-image.jpg`
                        }
                        alt={`Изображение из трейлера к фильму ${movieTitle}`}
                      />
                    </button>
                  </Col>
                ))}
              </Row>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}

Trailers.propTypes = {
  trailersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      site: PropTypes.oneOf(['YouTube', 'Vimeo']),
      poster: PropTypes.string,
    })
  ).isRequired,
  movieTitle: PropTypes.string.isRequired,
  onTrailerClick: PropTypes.func.isRequired,
};

export default Trailers;
