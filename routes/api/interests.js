const express = require('express');
const router = express.Router();
const {routeHandler} = require("../utils");

const {expiresIn} = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Topic } = db;
const { getUserToken, getUserFromToken } = require('../utils/auth');
// const csrfProtection = require('csurf')({cookie: true});


router.get('/interests', routeHandler(async(req, res, next) =>{
    const token = req.cookies.token;
    const user = await getUserFromToken(token);
    const topics = await Topic.findAll();

    res.json({id: user.id, topics: topics});
}));

//signup route
router.post('/interests',
//   csrfProtection,
  routeHandler(async (req, res, next) => {

}));



module.exports = router;
