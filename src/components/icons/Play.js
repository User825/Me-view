import React from 'react'
import PropTypes from "prop-types";

function Play({size = 18}) {
  return (
    <>
      <svg width={size} height={size} fill="" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M256 0C114.833 0 0 114.844 0 256s114.833 256 256 256 256-114.844 256-256S397.167 0 256 0zm101.771 264.969l-149.333 96a10.62 10.62 0 01-5.771 1.698c-1.75 0-3.521-.438-5.104-1.302A10.653 10.653 0 01192 352V160c0-3.906 2.125-7.49 5.563-9.365 3.375-1.854 7.604-1.74 10.875.396l149.333 96c3.042 1.958 4.896 5.344 4.896 8.969s-1.854 7.01-4.896 8.969z"/></svg>
    </>
  )
}

Play.propTypes = {
  size: PropTypes.number,
};

export default Play;
