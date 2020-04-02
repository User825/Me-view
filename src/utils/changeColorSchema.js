import getColors from 'get-image-colors';

const startValues = {
  ACCENT_COLOR: '#212121',
  CONTRAST_COLOR: '#F9F9FC',
};

const changeColorsSchema = imgSrc => {
  if (imgSrc) {
    getColors(imgSrc).then(colors => {
      // const imgBaseColor = colors[0].hex();
      // const accentColor = colors[3].hex();
  
      // document.documentElement.style.setProperty('--accent-color', accentColor);
      document.documentElement.style.setProperty('--background-image', `url('${imgSrc}')`);
    });
  } else {
    setDefaultColorSchema();
  }  
};

const setDefaultColorSchema = () => {
  document.documentElement.style.setProperty('--accent-color', startValues.ACCENT_COLOR);
  document.documentElement.style.setProperty('--background-image', `url('${startValues.background}')`);
  // document.documentElement.style.setProperty(
  //   '--background-gradient',
  //   `linear-gradient(to right, ${startValues.CONTRAST_COLOR}, ${startValues.ACCENT_COLOR})`,
  // );
};

export { changeColorsSchema, setDefaultColorSchema };
