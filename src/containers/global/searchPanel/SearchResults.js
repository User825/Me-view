import React from 'react';
import PropTypes from 'prop-types';
import { createCountFormatter } from 'utils/';
import { paths } from 'config/';

import { Link } from 'react-router-dom';

import { Card, CardSkeleton } from 'components/card/';
import CardList from 'components/cardList';
import { Col } from 'components/global/layout';
import Button from 'components/global/button';

const getDescText = (resultsQuantity) => {
  const resultsEndCount = createCountFormatter(resultsQuantity, {
    one: '',
    two: 'а',
    few: 'ов',
  });

  return `${resultsQuantity} результат${resultsEndCount} поиска`;
};

function SkeletonResults({ quantity, text }) {
  const skeletonList = [];
  skeletonList.length = quantity;
  skeletonList.fill({ text });

  return skeletonList.map((skeleton, index) => {
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="section"
        key={index}
      >
        <CardSkeleton text={skeleton.text} />
      </Col>
    );
  });
}

function ItemsResults({ items, onClickHandler }) {
  return items.map((item) => {
    const itemPath =
      item.type === 'movie'
        ? paths.MOVIE_id
        : item.type === 'tv'
        ? paths.TV_SHOW_id
        : item.type === 'person'
        ? paths.PERSON_id
        : null;
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="div"
        key={item.id}
      >
        <Link
          to={`${itemPath}:${item.id}`}
          key={item.id}
          onClick={onClickHandler}
        >
          <Card
            stylesType="light"
            imgSrc={item.posterSrc}
            title={item.title}
            year={item.year}
            genres={item.genres}
            rating={item.rating}
          />
        </Link>
      </Col>
    );
  });
}

function SearchResults({
  resultsQuantity,
  items,
  isLoading,
  isFetching,
  hasMore,
  onLoad,
  onResultClick,
}) {
  let desc, descStyle;

  if (resultsQuantity > 0) {
    desc = getDescText(resultsQuantity);
    descStyle = 'base';
  } else {
    desc = 'Ничего не найдено';
    descStyle = 'accent';
  }

  return (
    <>
      {isLoading ? (
        <CardList>
          <SkeletonResults quantity={12} />
        </CardList>
      ) : (
        <>
          <CardList desc={desc} descStyle={descStyle}>
            <ItemsResults items={items} onClickHandler={onResultClick} />
            {isFetching && <SkeletonResults quantity={12} />}
            {hasMore && (
              <Col sm="6" md="3" lg="2" gap="sm" verticalGap="sm" tagName="div">
                <Card stylesType="light" onlyContainer height="386px">
                  <Button
                    text="Загрузить еще"
                    handler={onLoad}
                    iconRight
                    width="100%"
                    styleType="primary"
                    centred
                  />
                </Card>
              </Col>
            )}
          </CardList>
        </>
      )}
    </>
  );
}

SearchResults.propTypes = {
  resultsQuantity: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default SearchResults;
