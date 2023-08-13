const server = require('express')
const router = server.Router()

router.use(server.json());
router.use(server.urlencoded({ extended: true }))

module.exports = router