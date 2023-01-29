const express = require('express');

const router =express.Router();
const { GetallChat,GetSingleChat,Addmessage,createChat} =require('../controllers/chatController');


router.get('/',GetallChat)
router.post('/',createChat)

router.get('/:_chatcode',GetSingleChat)
router.patch('/addmessage/:_chatcode',Addmessage)

//chat db requests below
module.exports = router;