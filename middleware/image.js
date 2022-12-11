const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const config = require('config')
const { v4: uuidv4 } = require('uuid')
let path = require('path')

cloudinary.config({
  cloud_name: config.get('cloudify.cloud_name'),
  api_key: config.get('cloudify.api_key'),
  api_secret: config.get('cloudify.api_secret'),
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  },
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
