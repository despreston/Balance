module.exports = (req, res, next) => {

  let logObj = {
    method: req.method,
    url: req.url,
    params: req.params
  };

  if (req.body) {
    logObj.body = req.body;
  }

  // eslint-disable-next-line
  console.log(logObj);
  
  next();
};