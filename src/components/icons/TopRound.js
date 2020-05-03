import React from 'react';
import PropTypes from 'prop-types';

function TopRound({ size = 40, isSize = true }) {
  return (
    <>
      <svg
      {...(isSize ? {width: size, height: size} : {})}
        fill=""
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <g>
            <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0zm127.188 302.75a10.672 10.672 0 01-9.854 6.583h-32a10.66 10.66 0 01-7.542-3.125L256 228.417l-77.792 77.792c-2 2-4.708 3.125-7.542 3.125h-32a10.67 10.67 0 01-9.854-6.583c-1.604-3.979-.729-8.583 2.313-11.625l117.333-117.333c4.167-4.167 10.917-4.167 15.083 0l117.333 117.333a10.664 10.664 0 012.314 11.624z" />
          </g>
        </g>
      </svg>
    </>
  );
}

TopRound.propTypes = {
  size: PropTypes.number,
};

export default TopRound;
