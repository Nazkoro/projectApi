// eslint-disable-next-line import/prefer-default-export
export function checkReq(func) {
  return async (req, res, next) => {
    try {
      const data = await func(req, res);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}
