function imageFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    const errMessage = 'Only image files are allowed'
    req.fileValidationError = errMessage
    return cb(new Error(errMessage))
  }
  return cb(null, true)
}

export default imageFilter
