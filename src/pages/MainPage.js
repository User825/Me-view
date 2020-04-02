import React, { Component } from "react";
import PropTypes from "prop-types";
import {Section} from "components/global/section/";
import PopularMovies from 'containers/PopularMovies'
import NowPlayedMovies from 'containers/NowPlayedMovies'

class MainPage extends Component {
  render() {
    return (
      <>
      <NowPlayedMovies />
      <PopularMovies />
      </>
    )
  }
}

MainPage.propTypes = {};

export default MainPage;
