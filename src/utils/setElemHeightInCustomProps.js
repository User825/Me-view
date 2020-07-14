import debounce from './debounce';
const setCSSPropsValue = (height, cssCustomPropsName) => {
  document.documentElement.style.setProperty(cssCustomPropsName, `${height}px`);
};

const setElemHeightInCustomProps = (elem, cssCustomPropsName) => {
  let heightSize = null;

  const setSize = () => {
    const height = elem.offsetHeight;
  
    if (heightSize !== height) {
      heightSize = height;
  
      setCSSPropsValue(height, cssCustomPropsName);
    }
  };

  setSize();

  const debouncedSetSize = debounce(setSize, 500);
  window.addEventListener('resize', debouncedSetSize);
};


export default setElemHeightInCustomProps;
