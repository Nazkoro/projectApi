import Err from "../exceptions/api-error";

export default function (err, req, res, next) {
  console.log(err);
  if (err instanceof Err) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
}
