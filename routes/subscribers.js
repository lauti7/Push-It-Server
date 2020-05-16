const router = require('express').Router()
const {subscribe, updateLastSession, unsubscribe, usersOs, all} = require('../controllers/subscribersController');
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/subscribe', subscribe)
router.post('/update', updateLastSession)
router.post('/unsubscribe', unsubscribe)
router.get('/:appId/os', isAuthenticated, usersOs)
router.get('/:appId/all', isAuthenticated ,all)


module.exports = router
