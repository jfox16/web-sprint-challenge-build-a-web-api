
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date();
  console.log(`[${date.toLocaleString()}] ${method} ${url}`);
  const body = req.body;
  if (body) {
    console.log('BODY:', body);
  }
  next();
}

module.exports = {
  logger
};
