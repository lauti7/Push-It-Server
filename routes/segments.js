const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {create, appSegments} = require('../controllers/segmentsController')

router.get('/:appId', isAuthenticated, appSegments)
router.post('/:appId/create', isAuthenticated, create)


module.exports = router
