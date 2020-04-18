import React, { Component } from "react";
import PropTypes from "prop-types";
import {Section} from "components/global/section/";
import PopularMovies from 'containers/PopularMovies'
import NowPlayedMovies from 'containers/NowPlayedMovies'
import { changeColorsSchema } from "utils/";
class MainPage extends Component {
  componentDidMount () {
    changeColorsSchema('');
  }

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
