import slugify from 'slugify'

const generateSlug = (str) => {
  return slugify(str, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  })
}

export default generateSlug
