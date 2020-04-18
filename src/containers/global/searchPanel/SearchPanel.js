import React, { Component } from "react";
import SearchInput from "containers/global/searchPanel/SearchInput";
import SearchResults from "./SearchResults";
import { server } from "server/";
import { Container } from "components/global/layout";


const START_PAGE_NUMBER = 1;

class SearchPanel extends Component {
  state = {
    movies: [],
    query: "",
    totalResults: 0,
    resultPage: START_PAGE_NUMBER,
    maxPages: "",
    hasMorePage: true,
    isLoading: false,
    isFetching: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.query.length > 0) {
      this.resetPageCounter();
      this.getMoviesList();
    }

    if (prevState.resultPage !== this.state.resultPage && this.state.resultPage !== START_PAGE_NUMBER) {
      this.getNewMoviesPage();
      this.hasMoreChange();
    }
  }

  setSearchQuery = searchValue => {
    this.setState({ query: searchValue, isLoading: true });
  };

  getMovies = (callback, page) => {
    server
      .searchMovies(this.state.query, page)
      .then(response => callback(response));
  };

  getMoviesList = () => {
    this.getMovies(response => {
      const { movies, totalResults, maxPages } = response;
      const hasMorePage = maxPages > START_PAGE_NUMBER;
      this.setState({
        movies,
        totalResults,
        maxPages,
        isLoading: false,
        hasMorePage,
      });
    }, START_PAGE_NUMBER);
  };

  getNewMoviesPage = () => {
    this.getMovies(response => {
      this.setState(state => {
        const currentMovies = state.movies;
        const hasMorePage = state.maxPages > this.state.resultPage;
        return {
          movies: currentMovies.concat(response.movies),
          isFetching: false,
          hasMorePage
        };
      });
    }, this.state.resultPage);
  };

  resetPageCounter = () => {
    this.setState(state => {
      if (state.resultPage !== START_PAGE_NUMBER) {
        return {
          resultPage: 1,
          maxPages: ""
        };
      }

      return;
    });
  };

  hasMoreChange = () => {
    const { resultPage, maxPages } = this.state;

    if (resultPage >= maxPages) {
      this.setState({ hasMorePage: false });
    }
  };

  setPageCounter = () => {
    this.setState(state => {
      const prevCount = state.resultPage;

      return {
        resultPage: prevCount + 1
      };
    });
  };

  onLoad = () => {
    if(this.state.resultPage < this.state.maxPages) {
      this.setState({isFetching: true})
      this.setPageCounter();
    }
  };
  render() {
    return (
      <Container tagName="section" fluid>
        <h2 className="visually-hidden">Поиск фильма по названию</h2>
        <SearchInput
          onChange={this.setSearchQuery}
          placeholder="Введите название фильма"
        />
        {this.state.query.length > 0 && (
          <SearchResults
            isLoading={this.state.isLoading}
            isFetching={this.state.isFetching}
            movies={this.state.movies}
            resultsQuantity={this.state.totalResults}
            onLoad={this.onLoad}
            hasMore={this.state.hasMorePage}
            onResultClick={this.props.closeModal}
          />
        )}
      </Container>
    );
  }
}

export default SearchPanel;
