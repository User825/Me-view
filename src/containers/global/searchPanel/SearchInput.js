import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'components/global/layout';
import { FieldInput } from 'components/form';
import FieldInputHOC from 'containers/global/form/FieldInputHOC';

export class SearchInput extends PureComponent {
  render() {
    const Search = FieldInputHOC({
      InputComponent: FieldInput,
      onChange: this.props.onChange,
    });

    return (
      <Row fluid sm={{ bottom: true }} verticalGap="lg">
        <Col lg="12" gap="sm">
          <Search placeholder={this.props.placeholder} />
        </Col>
      </Row>
    );
  }
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchInput;
