const multer = require('multer');
const { filterFile } = require('./filterFileUpload');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images');
  },
  filename: (req, file, callback) => {
    const fileExt = path.extname();
    const uniqueFileId = Math.random().toString(36).slice(2, 6);
    const filename = file.originalname.split('.');
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1000 * 1000,
  },
});

module.exports = { upload };
