const router  = require('./router')
const UserController = require('../controller/UsersController')

router.post('/store',UserController.store)

module.exports = router
