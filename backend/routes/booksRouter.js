const router  = require('./router')
const BooksController = require('../controller/BooksController')

router.post('/storeBooks',BooksController.storeBooks)
router.get('/getAllBooks',BooksController.getAllBooks)

module.exports = router