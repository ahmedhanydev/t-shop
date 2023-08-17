const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/apiError");

// const multerOptions = () => {
//   const multerStorage = multer.memoryStorage();

//   const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(new ApiError("only images allowed", 400), false);
//     }
//   };

//   const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//   return upload;
// };
const multerOptions = () => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cd) {
      cd(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cd) {
      if (file) {
        cd(
          null,
          new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
      } else {
        cd(null, false);
      }
    },
  });

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only images allowed", 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 1024 * 1024 }, // 1 mega byte
  });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
