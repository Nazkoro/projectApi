import ApiErr from "../exceptions/api-error";
import tokenServ from "../service/token-service";

export default function (req, res, next) {
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
}
