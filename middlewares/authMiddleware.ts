import ApiErr from "../exceptions/api-error";
import tokenServ from "../module/auth/token.service";

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiErr.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiErr.UnauthorizedError());
    }

    const userData = tokenServ.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErr.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErr.UnauthorizedError());
  }
}
