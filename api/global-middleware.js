
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date();
  console.log(`[${date.toLocaleString()}] ${method} ${url}`);
  next();
}

module.exports = {
  logger
};
