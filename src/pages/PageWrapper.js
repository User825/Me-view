import React from 'react';
import PropTypes from 'prop-types';

const PageWrapper = (WrappedComponent, ...props) => {
  return class SimilarWrapper extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return this.props.id !== nextProps.id;
    }

    render() {
      return <WrappedComponent id={this.props.id} {...this.props} />;
    }
  };
};

PageWrapper.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default PageWrapper;
