const router  = require('./router')
const ReviewsController = require('../controller/ReviewController')


router.get('/getAllReviews/:id',ReviewsController.getAllReviews)
router.post('/storeReviews',ReviewsController.storeReviews)

module.exports = router