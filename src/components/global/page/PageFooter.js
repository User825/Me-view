import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { setElemHeightInCustomProps } from 'utils/';
import styles from './page.module.css';

const FOOTER_HEIGHT_CSS_CUSTOM_PROPS_NAME = '--footer-height';
function PageFooter({ children }) {
  const footer = useRef();
  useEffect(() => {
    setElemHeightInCustomProps(footer.current, FOOTER_HEIGHT_CSS_CUSTOM_PROPS_NAME);
  }, [footer])
  return <footer ref={footer} className={styles.page__footer}>{children}</footer>;
}

PageFooter.propTypes = {
  children: PropTypes.node,
};

export default PageFooter;
