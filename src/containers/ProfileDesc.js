import React from 'react';
import PropTypes from 'prop-types';

import Typography, { TextLink } from 'components/global/typography';
import { Col } from 'components/global/layout/';

function ProfileDesc({ desc, homepage }) {
  return (
    <div style={{ marginTop: 'auto' }}>
      <Col verticalGap="md">
        <Typography bottomIndent="sm">{desc}</Typography>
        {homepage && (
          <Typography>
            <TextLink href={homepage}>Официальный сайт</TextLink>
          </Typography>
        )}
      </Col>
    </div>
  );
}

ProfileDesc.propTypes = {
  desc: PropTypes.string.isRequired,
  homepage: PropTypes.string,
};

export default ProfileDesc;
