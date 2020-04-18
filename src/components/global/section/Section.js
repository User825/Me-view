import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Wrapper, Container, Row } from "components/global/layout/";
import styles from "./section.module.css";

const classNamesModule = classNames.bind(styles);

function Section({ title, isHiddenTitle = false, children }) {
  const titleStyles = classNamesModule({
    title: !isHiddenTitle,
    "visually-hidden": isHiddenTitle
  });

  return (
    <Wrapper className={styles.wrapper} gap="lg">
      <Container className={styles.container} tagName="section" gap="sm" verticalGap="sm" fluid>
        {title && !isHiddenTitle && (
          <Row gap='sm' verticalGap="sm">
            <h2 className={titleStyles}>{title}</h2>
          </Row>
        )}
        {title && isHiddenTitle && (
          <h2 className={titleStyles}>{title}</h2>
        )}
        <Row fluid>{children}</Row>
      </Container>
    </Wrapper>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isHiddenTitle: PropTypes.bool
};

export default Section;
