const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {create, messages, manuallySend, sentMessages, scheduleMessages} = require('../controllers/messagesController')

router.get('/appmessages/:_id', messages)
router.get('/appmessages/:_id/sent' ,sentMessages)
router.get('/appmessages/:_id/schedule' ,scheduleMessages)
router.post('/appmessages/:_id/newmessage', create)
router.post('/manuallysend' ,manuallySend)


module.exports = router
