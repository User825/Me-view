const changeColorsSchema = (imgSrc) => {
  if (imgSrc) {
    document.documentElement.style.setProperty(
      '--background-image',
      `url('${imgSrc}')`
    );
  } else {
    document.documentElement.style.setProperty('--background-image', `url('')`);
  }
};

export default changeColorsSchema;
