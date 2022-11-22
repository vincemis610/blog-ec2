const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");

// Create an S3 instance
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

// Function to filter image files
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    req.fileValidation = 'File not allowed!'
    return cb(null, false, req.fileValidation )
  }
};

// Function to upload file to AWS S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
  }),
  fileFilter: multerFilter,
}).single('image');

module.exports = upload;