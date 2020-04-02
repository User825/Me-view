const createCountFormatter = (number, { one, two, few }) => {
  return number % 100 > 4 && number % 100 < 20
    ? few
    : number % 10 < 5 && number % 10 > 1
    ? two
    : number % 10 === 1
    ? one
    : few;
};

export default createCountFormatter;
