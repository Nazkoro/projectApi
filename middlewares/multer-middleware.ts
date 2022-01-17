import multer from "multer";

// eslint-disable-next-line import/prefer-default-export
export function multerMiddleware(type) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("fir========================", file);
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, JSON.stringify(Date.now()));
    },
  });

  const upload = multer({ storage });
  return upload.single(type);
}
