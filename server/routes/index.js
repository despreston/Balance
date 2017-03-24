'use strict';

module.exports = ({ get }) => {

  get('/', (req, res) => {
    res.send(200, "You've reached Balance");
  });
  
};