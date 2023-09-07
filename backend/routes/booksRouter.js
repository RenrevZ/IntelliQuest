const router  = require('./router')
const BooksController = require('../controller/BooksController')


router.get('/getAllbooks',BooksController.getAllBooks)
router.get('/getSinglebook/:id',BooksController.getSingleBook)
router.post('/storeBooks',BooksController.storeBooks)
router.post('/AddTofav',BooksController.addToFav)


module.exports = router