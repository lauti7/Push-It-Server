const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {create, show, userApps} = require('../controllers/applicationsController');

router.post('/create', isAuthenticated, create)
router.get('/apps/:_id', isAuthenticated ,show)
router.post('/myapps', isAuthenticated, userApps)




module.exports = router
