import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "utils/";

function FieldInputHOC({ InputComponent, onChange, startValue = '' }) {
  return class FieldInput extends Component {
    onChangeDebounced = debounce(onChange, 400);

    state = {
      value: startValue
    };

    componentDidUpdate(prevProps, prevState) {
      if (this.state.value !== prevState.value) {
        this.onChangeDebounced(this.state.value);
      }
    }

    handleChange = evt => {
      const fieldValue = evt.target.value;

      this.setState({ value: fieldValue });
    };

    render() {
      const { value } = this.state;

      return (
        <InputComponent
          onChange={this.handleChange}
          value={value}
          {...this.props}
        />
      );
    }
  };
}

FieldInputHOC.propTypes = {
  InputComponent: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  startValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FieldInputHOC;
