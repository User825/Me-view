import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'components/carousel/';

import { Card } from 'components/card/';
import { Link } from 'react-router-dom';
import { Row, Col } from 'components/global/layout';
import Typography from 'components/global/typography';

const carouselParams = {
  spaceBetween: 10,
  speed: 300,
  effect: 'slide',
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  watchOverflow: true,
  simulateTouch: false,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
    465: {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 6,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 8,
      slidesPerGroup: 2,
    },
    1440: {
      slidesPerView: 10,
      slidesPerGroup: 2,
    },
  },
};

function SmallCardCarousel ({cards, title, linkPrefixPath}) {
  return (
    <>
      {cards.length > 0 && (
        <>
          <Row verticalGap="md">
            <Typography tagName="h2" size="md">
              {title}
            </Typography>
          </Row>
          <Col lg="12">
            <Carousel params={carouselParams} indent="sm">
              {cards.map((card) => (
                <Link
                  to={{
                    pathname: `${linkPrefixPath}:${card.id}`,
                  }}
                  key={card.id}
                >
                  <Card
                    title={card.title}
                    imgSrc={card.posterSrc}
                    rating={card.rating}
                    size="small"
                    fixedTitleHeight
                  />
                </Link>
              ))}
            </Carousel>
          </Col>
        </>
      )}
    </>
  );
}

SmallCardCarousel.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      posterSrc: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  title: PropTypes.string,
  linkPrefixPath: PropTypes.string,
};

export default SmallCardCarousel;
