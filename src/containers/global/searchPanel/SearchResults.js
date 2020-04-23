import React from 'react';
import PropTypes from 'prop-types';
import { createCountFormatter } from 'utils/';
import { paths } from 'config/';

import { Link } from 'react-router-dom';

import { Card, CardSkeleton } from 'components/card/';
import CardList from 'components/cardList';
import { Col } from 'components/global/layout';
import Button from 'components/global/button';
import { Next } from 'components/icons/';

const getDescText = (resultsQuantity) => {
  const searchEndCount = createCountFormatter(resultsQuantity, {
    one: '',
    two: 'о',
    few: 'о',
  });
  const resultsEndCount = createCountFormatter(resultsQuantity, {
    one: '',
    two: 'а',
    few: 'ов',
  });

  return `Найден${searchEndCount} ${resultsQuantity} фильм${resultsEndCount}`;
};

function NextIcon() {
  return <Next size={20} />;
}

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

function MoviesResults({ movies, onClickHandler }) {
  return movies.map((movie) => {
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="div"
        key={movie.id}
      >
        {/* <Link
          to={`${paths.MOVIE}${movie.id}`}
          key={movie.id}
          replace
          onClick={onClickHandler}
        > */}
        <Link
          to={{
            pathname: `${paths.MOVIE_id}:${movie.id}`,
          }}
          key={movie.id}
          replace
          onClick={onClickHandler}
        >
          <Card
            stylesType="light"
            imgSrc={movie.imgSrc}
            title={movie.title}
            year={movie.year}
            genres={movie.genres}
            rating={movie.rating}
          />
        </Link>
      </Col>
    );
  });
}

function SearchResults({
  resultsQuantity,
  movies,
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
            <MoviesResults movies={movies} onClickHandler={onResultClick} />
            {isFetching && <SkeletonResults quantity={12} />}
            {hasMore && (
              <Col sm="4" md="3" lg="2" gap="sm" verticalGap="sm" tagName="div">
                <Card stylesType="light" onlyContainer>
                  <Button
                    text="Загрузить еще"
                    handler={onLoad}
                    iconRight
                    iconComponent={NextIcon}
                    width="100%"
                    styleType="primary"
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
  movies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default SearchResults;
