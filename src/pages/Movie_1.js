import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";

function Movie_1(props) {
  console.log(props.location.state)
  return (
    <Movie id={props.location.state}>
      
    </Movie>
  )
}

Movie_1.propTypes = {

}

export default Movie_1



