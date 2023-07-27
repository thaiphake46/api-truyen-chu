function imageFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    const errMessage = 'Only image files are allowed'
    req.fileValidationError = errMessage
    return cb(new Error(errMessage))
  }
  return cb(null, true)
}

export default imageFilter
