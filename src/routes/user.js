const express= require('express');
const UserController = require('../app/controllers/UserController');
const useController= require('../app/controllers/UserController');
const router= express.Router();

router.get('/search', UserController.searchUser);
router.post('/insert', UserController.insertCurrentUser);
router.get('/current', UserController.getCurrentUser);
module.exports = router;