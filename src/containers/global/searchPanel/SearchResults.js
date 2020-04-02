import React from "react";
import { Card, CardSkeleton } from "components/card/";
import PropTypes from "prop-types";
import { createCountFormatter } from "utils/";
import CardList from "components/cardList";
import { Row, Col } from "components/global/layout";
import Button from "components/global/button";

const getDescText = resultsQuantity => {
  const searchEndCount = createCountFormatter(resultsQuantity, {
    one: "",
    two: "о",
    few: "о"
  });
  const resultsEndCount = createCountFormatter(resultsQuantity, {
    one: "",
    two: "а",
    few: "ов"
  });

  return `Найден${searchEndCount} ${resultsQuantity} фильм${resultsEndCount}`;
};

function SkeletonResults({ quantity, text }) {
  const skeletonList = [];
  skeletonList.length = quantity;
  skeletonList.fill({ text });

  return skeletonList.map((skeleton, index) => {
    return (
      <Col
        sm="4"
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

function MoviesResults({ movies }) {
  return movies.map(movie => {
    return (
      <Col
        sm="4"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="div"
        key={movie.id}
      >
        <Card
          stylesType="light"
          imgSrc={movie.imgSrc}
          title={movie.title}
          year={movie.year}
          genres={movie.genres}
          rating={movie.rating}
        />
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
  onLoad
}) {
  let desc, descStyle;

  if (resultsQuantity > 0) {
    desc = getDescText(resultsQuantity);
    descStyle = "base";
  } else {
    desc = "Ничего не найдено";
    descStyle = "accent";
  }

  return (
    <>
      {isLoading ? (
        <CardList>
          <SkeletonResults quantity={12} text="Загрузка" />
        </CardList>
      ) : (
        <>
          <CardList desc={desc} descStyle={descStyle}>
            <MoviesResults movies={movies} />
            {isFetching && <SkeletonResults quantity={12} text="Загрузка" />}
          </CardList>
          {hasMore && (
            <Row
              fluid
              verticalGap="lg"
              gap="lg"
              lg={{ center: true, middle: true }}
            >
              <Button text="Загрузить еще" handler={onLoad} />
            </Row>
          )}
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
  onLoad: PropTypes.func.isRequired
};

export default SearchResults;
