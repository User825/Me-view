import React from 'react';
import PropTypes from 'prop-types';
import { server } from 'server/';

const Similar = ({ WrappedComponent, id, isShow = false }, ...props) => {
  const getSimilar = isShow ? server.getSimilarShow : server.getSimilarMovies;

  return class SimilarWrapper extends React.Component {
    state = {
      cards: [],
    };

    componentDidMount() {
      getSimilar(id).then((response) =>
        this.setState({ cards: response.similar })
      );
    }

    render() {
      return <WrappedComponent cards={this.state.cards} {...this.props} />;
    }
  };
};

Similar.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default Similar;
