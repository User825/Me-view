import { constants } from 'config/';
import getColors from 'get-image-colors';

const mobileMax = constants.breakpoints.mobile;
const breakpoint = window.matchMedia(`(min-width: ${mobileMax}px)`);
const defaultContrastColor = 'var(--contrast-color)';

const changeColorsProps = (img) => {
  getColors(img).then((colors) => {
    const newContrastColor = colors[4].hex();
    document.documentElement.style.setProperty('--changed-contrast-color', newContrastColor);
  });
};

const changeColorsSchema = (imgSrc) => {
  const isNoMobile = breakpoint.matches === true;

  if (imgSrc && isNoMobile) {
    document.documentElement.style.setProperty('--background-image', `url('${imgSrc}')`);

    changeColorsProps(imgSrc);
  } else {
    document.documentElement.style.setProperty('--background-image', '');
    document.documentElement.style.setProperty('--changed-contrast-color', defaultContrastColor);
  }
};

export default changeColorsSchema;
