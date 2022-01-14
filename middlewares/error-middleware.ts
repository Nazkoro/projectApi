import Err from "../exceptions/api-error";

export default function (err, req, res, next) {
  console.log("222222222222222222222222222222222222222");
  console.log(err);
  console.log("222222222222222222222222222222222222222");
  if (err instanceof Err) {
    console.log("333333333333333333333333333333333");
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  console.log("4444444444444444444444444444444444");
  console.log(err);
  // return res.status(500).json({ message: "Непредвиденная ошибка" });
  return res.status(err.status).json({ error: err });
}
