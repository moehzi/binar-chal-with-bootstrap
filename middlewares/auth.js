function verifyToken(req, res, next) {
  // Get auth header value
  const tokenHeader = req.headers["authorization"];
  // Check if tokenHeader is undefined
  if (typeof tokenHeader !== "undefined") {
    // Set the token
    req.token = tokenHeader;
    // Next middleware
    next();
  } else {
    res.status(401).json({
      status: "Unauthorized",
      message: "Sorry, your request could not be processed",
    });
  }
}
module.exports = verifyToken;

// Format of Token
// Authorization : <acess_token>
