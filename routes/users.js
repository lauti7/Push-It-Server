const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {register, login} = require('../controllers/usersController')

router.post('/register', register)
router.post('/login', login)


module.exports = router
