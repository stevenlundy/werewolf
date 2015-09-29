var generateRoomCode = function () {
  return [0,0,0,0].map(getRandomLetter).join('');
}

var getRandomLetter = function () {
  return String.fromCharCode('A'.charCodeAt(0) + getRandomBetween(0, 26));
}

var getRandomBetween = function (min, max) {
  // (integer min, integer max) -> integer
  return Math.floor(Math.random()*(max - min)) + min;
}

module.exports = {
  generateRoomCode: generateRoomCode,
  getRandomLetter: getRandomLetter,
  getRandomBetween: getRandomBetween
};