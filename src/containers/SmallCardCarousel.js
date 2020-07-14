import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Carousel from 'components/carousel/';
import { Card } from 'components/card/';
import { Section } from 'components/global/section/';
import { Col } from 'components/global/layout';

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
      slidesPerGroup: 3,
    },
    465: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    768: {
      slidesPerView: 6,
      slidesPerGroup: 3,
    },
    1024: {
      slidesPerView: 8,
      slidesPerGroup: 4,
    },
    1440: {
      slidesPerView: 10,
      slidesPerGroup: 5,
    },
  },
};

function SmallCardCarousel({ cards, title, onReachEnd, linkPrefixPath }) {
  return (
    <Section isDark title={title}>
      {cards.length > 0 && (
        <Col lg="12" gap="lg">
          <Carousel
            params={carouselParams}
            isRoundedStyle={false}
            onReachEnd={onReachEnd}
            indent="lg"
          >
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
      )}
    </Section>
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
  onReachEnd: PropTypes.func,
};

export default SmallCardCarousel;
