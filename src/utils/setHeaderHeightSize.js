import debounce from './debounce';

const state = {
  headerElem: '',
  cssCustomPropsName: '',
  headerSize: null,
};

const setCSSPropsValue = (heightSize) => {
  document.documentElement.style.setProperty(state.cssCustomPropsName, `${heightSize}px`);
};

const setSize = () => {
  const { headerElem } = state;
  let { headerSize } = state;
  const height = headerElem.offsetHeight;

  if (headerSize !== height) {
    headerSize = height;

    setCSSPropsValue(height);
  }
};

const debouncedSetSize = debounce(setSize, 500);

const addHandler = () => {
  window.addEventListener('resize', debouncedSetSize);
};

const getHeaderHeightSize = (headerContainerElem, cssCustomPropsName) => {
  state.headerElem = headerContainerElem;
  state.cssCustomPropsName = cssCustomPropsName;

  if (state.headerElem) {
    setSize();
    addHandler();
  }
};


export default getHeaderHeightSize;
