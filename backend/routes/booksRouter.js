const router  = require('./router')
const BooksController = require('../controller/BooksController')


router.get('/getAllbooks',BooksController.getAllBooks)
router.get('/getSinglebook/:id',BooksController.getSingleBook)
router.get('/Favorites',BooksController.fetchFav)
router.post('/storeBooks',BooksController.storeBooks)
router.post('/SearchBooks',BooksController.SearchBooks)
router.post('/AddTofav',BooksController.addToFav)


module.exports = router