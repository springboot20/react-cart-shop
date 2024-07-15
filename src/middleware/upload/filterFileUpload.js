 const filterFile = (fileType = 'default') => {
  return (req, file, cb) => {
    const mimeFileType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    if (fileType === 'default') {
      cb(null, true);
    } else {
      const flag = mimeFileType.includes(file.mimetype);

      if (fileType === 'image') {
        if (!file.mimetype.startsWith('image/')) {
          flag = false;
        }
      }

      if (flag) {
        return cb(null, true);
      } else {
        return cb(new Error(`${file.mimetype} File type not supported!`));
      }
    }
  };
};
module.exports = {filterFile}