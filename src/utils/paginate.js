import PropTypes from "prop-types";
/**
 * Slice data array to given slices and set state
 * @param {Array} data 
 * @param {Integer} size Size of slices, default: 10
 * @returns Array of arrays
 */
export const paginate = (data, size = 10) => {
  const pages = [];
  for (let i = 0; i < data.length; i += size) {
    const slice = data.slice(i, i + size);
    pages.push(slice);
  }
  return pages;
};

paginate.propTypes = {
    data: PropTypes.array.isRequired,
    size: PropTypes.number
};
