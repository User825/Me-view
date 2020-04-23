import { constants } from 'config/';

const mobileMax = constants.breakpoints.mobile;
const breakpoint = window.matchMedia(`(min-width: ${mobileMax}px)`);

const changeColorsSchema = (imgSrc) => {
  const isNoMobile = breakpoint.matches === true;

  if (imgSrc && isNoMobile) {
    document.documentElement.style.setProperty(
      '--background-image',
      `url('${imgSrc}')`
    );
  } else {
    document.documentElement.style.setProperty('--background-image', `url('')`);
  }
};

export default changeColorsSchema;
