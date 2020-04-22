import React, { PureComponent } from 'react';
import { changeColorsSchema } from 'utils/';

import PopularMovies from 'containers/PopularMovies';
import NowPlayedMovies from 'containers/NowPlayedMovies';
class MainPage extends PureComponent {
  componentDidMount() {
    changeColorsSchema('');
  }

  render() {
    return (
      <>
        <NowPlayedMovies />
        <PopularMovies />
      </>
    );
  }
}

MainPage.propTypes = {};

export default MainPage;
