import multer from 'multer'
import imageFilter from '../helpers/imageFilter.js'

const handleErrorImageUpload = (req, res, next) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter,
  }).single('image')
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.json({ errCode: 1, message: req.fileValidationError })
    } else if (!req.file) {
      return res.json({
        errCode: 1,
        message: 'Please select an image to upload',
      })
    } else if (err instanceof multer.MulterError) {
      return res.json({ errCode: 1, message: err })
    } else if (err) {
      return res.json({ errCode: 1, message: err })
    }
    next()
  })
}

export default handleErrorImageUpload
