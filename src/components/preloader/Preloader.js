import React from 'react';

import styles from './preloader.module.css';

function Preloader({text = 'Идёт загрузка'}) {
  return (
    // <div className={styles.preloader}>
    //   <div className={styles.preloader__container}>
    //     <div className={styles.preloader__cube}>L</div>
    //     <div className={styles.preloader__cube}>O</div>
    //     <div className={styles.preloader__cube}>A</div>
    //     <div className={styles.preloader__cube}>D</div>
    //   </div>
    // </div>
    <div className={styles.wrapper}>
    <div className={styles.triangleWrap}>
        <div className={styles.triangleMain}></div>
        <div className={styles.triangleRed}></div>
        <div className={styles.triangleBlue}></div>
      <div className={styles.triangleText}>{text}</div>
    </div>
  </div>
  );
}

export default Preloader;
