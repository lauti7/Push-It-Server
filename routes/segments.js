const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {create, appSegments, show, subscribers, changeStatus} = require('../controllers/segmentsController')

router.get('/:_id', isAuthenticated, show)
router.get('/:_id/subscribers', isAuthenticated, subscribers)
router.get('/:_id/status', isAuthenticated, changeStatus)
router.get('/app/:appId', isAuthenticated, appSegments)
router.post('/:appId/create', isAuthenticated, create)



module.exports = router
