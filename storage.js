const multer = require('multer')

const config = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename : (req, file, cb) => {
        const filename = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, filename + '.jpeg')
    }
})

module.exports = multer({storage : config})