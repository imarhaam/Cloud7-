const fs = require('fs');
const db = require("../mongodb");
const getHistory = () => {
  let history = [];

  if (fs.existsSync('./history.json')) {
    const data = fs.readFileSync('./history.json');
    history = JSON.parse(data);
  }

  return history;
};

const updateHistory = (song) => {
  let history = getHistory();
  history.push(song);
  fs.writeFileSync('./history.json', JSON.stringify(history, null, 2));
};

module.exports = {
  getHistory,
  updateHistory,
};
