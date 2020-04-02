import React from "react";
import PropTypes from "prop-types";
import styles from "./page.module.css";

function PageContent({ children }) {
  return <main className={styles.page__content}>{children}</main>;
}

PageContent.propTypes = {
  children: PropTypes.node
};

export default PageContent;
