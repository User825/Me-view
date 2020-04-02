import React from "react";
import PropTypes from "prop-types";

function NoImage({ size = 20 }) {
  return (
    <>
      <svg
        width={size}
        height={size}
        fill=""
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.059 9.184a2 2 0 001.998-1.998 2 2 0 00-1.998-1.998A2 2 0 007.06 7.186a2 2 0 001.998 1.998zm0-2.824a.827.827 0 010 1.652.827.827 0 010-1.652z" />
        <path d="M19.27 1.445H.73a.731.731 0 00-.73.73v15.693c0 .403.328.73.73.73h18.54c.402 0 .73-.327.73-.73V2.176a.731.731 0 00-.73-.73zm-.442 1.172v9.274l-3.685-3.686a.617.617 0 00-.872 0L9.06 13.419l-3.33-3.33a.612.612 0 00-.872 0l-3.685 3.686V2.617h17.656zM1.172 17.427V15.43l4.121-4.121 3.33 3.33a.613.613 0 00.871 0l5.213-5.213 4.121 4.121v3.879H1.172z" />
      </svg>
    </>
  );
}

NoImage.propTypes = {
  size: PropTypes.number
};

export default NoImage;
