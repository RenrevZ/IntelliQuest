const router  = require('./router')
const UserController = require('../controller/UsersController')

router.post('/storeUser',UserController.storeUser)
router.get('/getUser',UserController.getAllUser)

module.exports = router
