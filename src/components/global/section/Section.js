import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

import styles from './section.module.css';

import { Wrapper, Container, Row } from 'components/global/layout/';
import Typography from 'components/global/typography';
import { Down } from 'components/icons';

const scrollIntoViewSmoothly =
  'scrollBehavior' in document.documentElement.style
    ? scrollIntoView
    : smoothScrollIntoView;
const classNamesModule = classNames.bind(styles);

function Section({
  title,
  isHiddenTitle = false,
  isOneScreen = false,
  isAnchor = false,
  gap,
  verticalGap,
  children,
}) {
  const anchor = useRef(null);
  const titleStyles = classNamesModule({
    title: !isHiddenTitle,
    'visually-hidden': isHiddenTitle,
  });
  const wrapperStyles = classNamesModule({
    wrapper: true,
    oneScreen: isOneScreen,
    withAnchor: isAnchor,
  });

  const onAnchorBtnClick = (evt) => {
    const anchorBlock = anchor.current;
    if (anchorBlock) {
      scrollIntoViewSmoothly(anchorBlock, {
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  return (
    <Wrapper className={wrapperStyles} gap="lg">
      <Container
        className={styles.container}
        tagName="section"
        {...(gap ? { gap: gap } : {})}
        {...(verticalGap ? { verticalGap: verticalGap } : {})}
        fluid
      >
        {title && !isHiddenTitle && (
          <Row gap="sm" className={styles.titleBox}>
            <Typography tagName="h2" size="md" bottomIndent="sm">
              {title}
            </Typography>
          </Row>
        )}
        {title && isHiddenTitle && <h2 className={titleStyles}>{title}</h2>}
        <Row fluid className={styles.contentBox}>
          {children}
        </Row>
      </Container>
      {isAnchor && (
        <>
          <div className={styles.anchorBtnBox}>
            <button
              className={styles.anchorBtn}
              onClick={onAnchorBtnClick}
              aria-label="Пролистнуть на следующий экран"
            >
              <Down />
            </button>
          </div>
          <div ref={anchor} className={styles.anchor}></div>
        </>
      )}
    </Wrapper>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  isHiddenTitle: PropTypes.bool,
  isOneScreen: PropTypes.bool,
  isAnchor: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Section;
