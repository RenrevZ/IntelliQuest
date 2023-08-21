const router  = require('./router')
const BooksController = require('../controller/BooksController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/storeBooks',upload.single('BookCover'),BooksController.storeBooks)
router.get('/getAllBooks',BooksController.getAllBooks)

module.exports = router