const express = require('express');
const router = express.Router();
const { routeHandler } = require("../utils");

const { expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Topic, UserTopic } = db;
const { getUserToken, getUserFromToken } = require('../utils/auth');
const csrfProtection = require('csurf')({ cookie: true });


router.get('/', routeHandler(async (req, res, next) => {
    const token = req.cookies.token;
    const user = await getUserFromToken(token);
    console.log(user);
    const userTopics = await UserTopic.findAll(
        {
            where: { userId: Number(user.id) },
            include: { model: Topic }
        });
    console.log(userTopics);
    res.json({ id: user.id, userTopics: userTopics });
}));


//signup route
router.post('/',
    csrfProtection,
    routeHandler(async (req, res, next) => {

    }));



module.exports = router;
