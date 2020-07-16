const DEFAULT_TITLE = 'Me view';
const DEFAULT_DESC = 'Сайт для поиска фильмов, сериалов и актеров';
const DEFAULT_IMG = '%PUBLIC_URL%/preview-main@1x.jpg';
const DEFAULT_IMG_ALT = 'Логотип сайта Me view';
const DEFAULT_URL = '%PUBLIC_URL%/';

const metaTitle = document.getElementById('meta-title');
const metaDesc = document.getElementById('meta-desc');
const metaImg = document.getElementById('meta-img');
const metaImgAlt = document.getElementById('meta-img-alt');
const metaUrl = document.getElementById('meta-url');

const setMetaShareContent = ({ title, desc, img, imgAlt, url }) => {
  document.title = title || DEFAULT_TITLE;
  metaTitle.setAttribute('content', title || DEFAULT_TITLE);
  metaDesc.setAttribute('content', desc || DEFAULT_DESC);
  metaImg.setAttribute('content', img || DEFAULT_IMG);
  metaImgAlt.setAttribute('content', imgAlt || DEFAULT_IMG_ALT);
  metaUrl.setAttribute('content', url || DEFAULT_URL);
};

export default setMetaShareContent;
