import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardList from 'components/cardList';
import { Card, CardSkeleton } from 'components/card/';
import { Col } from 'components/global/layout';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

const START_PAGE = 1;

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

function Cards({ cards, linkPrefixPath }) {
  return cards.map((card) => {
    return (
      <Col
        sm="6"
        md="3"
        lg="2"
        gap="sm"
        verticalGap="sm"
        tagName="div"
        key={card.id}
      >
        <Link
          to={{
            pathname: `${linkPrefixPath}:${card.id}`,
          }}
        >
          <Card
            imgSrc={card.posterSrc}
            title={card.title}
            year={card.year}
            genres={card.genres}
            rating={card.rating}
          />
        </Link>
      </Col>
    );
  });
}

class infiniteCardList extends Component {
  state = {
    cards: [],
    isLoading: true,
    hasMorePage: true,
    totalPages: 0,
    isFetching: false,
  };

  componentDidMount() {
    this.getCards(START_PAGE);
  }

  getCards = (page) => {
     this.props.fetchCards(page).then((response) => {
      if(!response) return;
      
      const { cards, totalPages } = response;
      this.setState((state) => {
        const prevCards = state.cards;
        return {
          cards: prevCards.concat(cards),
          totalPages: totalPages,
          isLoading: false,
          isFetching: false,
          hasMorePage: page < totalPages,
        };
      });
    });
  };

  onLoad = (page) => {
    this.setState({ isFetching: true, hasMorePage: false });
    this.getCards(page);
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <CardList>
            <SkeletonResults quantity={12} />
          </CardList>
        ) : (
          <>
            <InfiniteScroll
              pageStart={START_PAGE}
              loadMore={this.onLoad}
              hasMore={this.state.hasMorePage}
              threshold={300}
            >
              <CardList>
                <Cards cards={this.state.cards} linkPrefixPath={this.props.linkPrefixPath} />
                {this.state.isFetching && <SkeletonResults quantity={12} />}
              </CardList>
            </InfiniteScroll>
          </>
        )}
      </>
    );
  }
}

infiniteCardList.propTypes = {
  fetchCards: PropTypes.func.isRequired,
  linkPrefixPath: PropTypes.string.isRequired
};

export default infiniteCardList;
