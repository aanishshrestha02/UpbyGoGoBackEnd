const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth.routes'))
router.use('/customer', require('./customer.routes'))
router.use('/category', require('./category.routes'))
router.use('/item', require('./item.routes'))


module.exports = router