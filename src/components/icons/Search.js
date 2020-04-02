import React from 'react'
import PropTypes from "prop-types";

function Search({size = 18}) {
  return (
    <>
      <svg width={size} height={size} fill="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M7.5 13.5a5.964 5.964 0 003.673-1.266l3.297 3.297 1.06-1.06-3.297-3.297A5.964 5.964 0 0013.5 7.5c0-3.308-2.692-6-6-6s-6 2.692-6 6 2.692 6 6 6zM7.5 3C9.982 3 12 5.018 12 7.5S9.982 12 7.5 12A4.505 4.505 0 013 7.5C3 5.018 5.018 3 7.5 3z"/><path d="M8.559 6.44C8.843 6.725 9 7.1 9 7.5h1.5a2.983 2.983 0 00-.88-2.12c-1.136-1.135-3.105-1.135-4.24 0L6.44 6.44c.57-.568 1.552-.567 2.119-.001z"/></svg>
    </>
  )
}

Search.propTypes = {
  size: PropTypes.number,
};

export default Search;
