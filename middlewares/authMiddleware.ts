const ApiErr = require("../exceptions/api-error");
const tokenServ = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    // console.log(authorizationHeader)
    if (!authorizationHeader) {
      return next(ApiErr.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    // console.log(accessToken);
    if (!accessToken) {
      return next(ApiErr.UnauthorizedError());
    }

    const userData = tokenServ.validateAccessToken(accessToken);
    // console.log('010101', userData);
    if (!userData) {
      return next(ApiErr.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErr.UnauthorizedError());
  }
};
