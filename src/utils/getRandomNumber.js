function getRandomNumber(min, max) {
  const number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
}

export default getRandomNumber;