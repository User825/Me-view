import React from "react";
import PropTypes from "prop-types";
import styles from "./cardList.module.css";
import classNames from "classnames/bind";

import { Row, Col } from "components/global/layout";

const classNamesModule = classNames.bind(styles);

function SearchResults({ desc, descStyle = "base", children }) {
  const descStyles = classNamesModule({
    desc: descStyle === "base",
    accent: descStyle === "accent"
  });

  return (
    <>
      {desc && (
        <Row fluid>
          <Col lg="12" verticalGap="sm" gap="sm">
            <p className={descStyles}>{desc}</p>
          </Col>
        </Row>
      )}
      <Row fluid>{children}</Row>
    </>
  );
}

SearchResults.propTypes = {
  desc: PropTypes.string,
  descStyle: PropTypes.oneOf(["base", "accent"]),
  children: PropTypes.node
};

export default SearchResults;
