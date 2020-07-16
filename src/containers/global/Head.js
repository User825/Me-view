import React from 'react';
import PropTypes from 'prop-types';

import MetaTags from 'react-meta-tags';
import { constants } from 'config/';

const { meta } = constants;

function Head({ title, desc, img, imgAlt, url, article = false }) {
  return (
    <MetaTags>
      <title>{title || meta.title}</title>
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta name="description" content={desc || meta.desc} />
      <meta property="og:title" content={title || meta.title} />
      <meta property="og:description" content={desc || meta.desc} />
      <meta property="og:image" content={ img || meta.img} />
      <meta property="og:url" content={ url || meta.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content="Me view" />
      <meta name="twitter:image:alt" content={imgAlt || meta.imgAlt} />
    </MetaTags>
  );
}

Head.propTypes = {
  title: PropTypes.string, 
  desc: PropTypes.string, 
  img: PropTypes.string, 
  imgAlt: PropTypes.string, 
  url: PropTypes.string
};

export default Head;
