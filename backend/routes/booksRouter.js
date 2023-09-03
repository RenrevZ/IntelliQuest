const router  = require('./router')
const BooksController = require('../controller/BooksController')


router.get('/getAllbooks',BooksController.getAllBooks)
router.post('/storeBooks',BooksController.storeBooks)
router.get('/getSinglebook/:id',BooksController.getSingleBook)

module.exports = router