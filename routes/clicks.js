const {logClick, getLogClicks} = require('../controllers/clicksController')
const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/log', logClick)
router.get('/log/:messageId', isAuthenticated, getLogClicks)


module.exports = router
