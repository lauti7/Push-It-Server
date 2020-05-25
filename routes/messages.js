const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {create, messages, manuallySend, sentMessages, scheduleMessages, getMessage} = require('../controllers/messagesController')

router.get('/:messageId',isAuthenticated, getMessage)
router.get('/appmessages/:appId',isAuthenticated,  messages)
router.get('/appmessages/:appId/sent' ,isAuthenticated, sentMessages)
router.get('/appmessages/:appId/schedule' , isAuthenticated, scheduleMessages)
router.post('/appmessages/:appId/newmessage',isAuthenticated, create)
router.post('/manuallysend' , isAuthenticated, manuallySend)



module.exports = router
