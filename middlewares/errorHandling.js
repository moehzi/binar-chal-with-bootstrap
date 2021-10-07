function errorHandling(err, req, res, next) {
  res.status(500).json({
    error: {
      status: 500,
      message: err.message,
    },
  });
}
module.exports = errorHandling;
