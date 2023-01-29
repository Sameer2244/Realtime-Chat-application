const express = require('express');

const router =express.Router();
const {CreateUser,GetallUsers,FindUser, DeleteUser, UpdateUser, FindUserbyEmailandPassword, FindUserbyEmail} =require('../controllers/userController');


router.get('/',GetallUsers)
router.post('/',CreateUser)

router.get('/:id',FindUser)
router.get('/findwithemail/:_email',FindUserbyEmail)
router.get('/:_email/:_password',FindUserbyEmailandPassword)
router.delete('/deleteuser/:id',DeleteUser)
router.patch('/updateuser/:id',UpdateUser)
//chat db requests below
module.exports = router;