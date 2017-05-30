module.exports = ({ get }) => {

  get('/', (req, res) => {
    return res.send(200, "You've reached Balance");
  });
  
};