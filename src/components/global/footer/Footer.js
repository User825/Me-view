import React from "react";

import styles from "./footer.module.css";

import TMDB from "./TMDB";

const TMBD_COLOR = "#081c24";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyRight}>
          © 2019-2020 by
          <a
            href="https://github.com/User825"
            className={styles.copyRightLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            User825
          </a>
        </p>
        <a
          className={styles.poweredBox}
          href="https://www.themoviedb.org/"
          aria-label="link to The Movie Database"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TMDB fill={TMBD_COLOR} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
