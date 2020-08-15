const express = require('express');
const router = express.Router();
const {routeHandler} = require("../utils");

const {expiresIn} = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Topic, UserTopic } = db;
const { getUserToken, getUserFromToken } = require('../utils/auth');
const csrfProtection = require('csurf')({cookie: true});


router.get('/', routeHandler(async(req, res, next) =>{
    const token = req.cookies.token;
    const user = await getUserFromToken(token);
    const topics = await Topic.findAll();

    res.json({id: user.id, topics: topics});
}));


//signup route
router.post('/',
  csrfProtection,
  routeHandler(async (req, res, next) => {
    const bodyArray = req.body;
    // console.log(bodyArray);
    count = 0;
    for (let topic of bodyArray.requests){
      count++;
      console.log(count);
      UserTopic.create({userId: topic.userId, topicId: topic.topicId});
    }
}));



module.exports = router;
