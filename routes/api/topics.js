const express = require('express');
const router = express.Router();
const { routeHandler } = require("../utils");
const {Op} = require("sequelize");
const { expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Topic, UserTopic } = db;
const { getUserToken, getUserFromToken } = require('../utils/auth');
const csrfProtection = require('csurf')({ cookie: true });

router.get('/', routeHandler(async (req, res, next) => {
    const token = req.cookies.token;
    const user = await getUserFromToken(token);
    // console.log(user);
    const userTopics = await UserTopic.findAll(
        {
            where: { userId: Number(user.id) },
            include: { model: Topic }
        });
    let followedIds=[];
    for (let userTopic of userTopics){
        followedIds.push(userTopic.topicId);
    }
    console.log(followedIds);
    const topics = await Topic.findAll(
        {
            where:
                {
                    id:{[Op.notIn]:followedIds}
                },
            include:
                {
                    model: UserTopic
                }
        }
    );

        console.log(topics);
    res.json({id: user.id, userTopics: userTopics, topics });
}));


//follow route
router.post('/follow',
    csrfProtection,
    routeHandler(async (req, res, next) => {
        const { userId, topicId } = req.body;

        const previousEntry = await UserTopic.findOne({ where: { userId: userId, topicId: topicId } });;
        if (!previousEntry) {
            UserTopic.create({ userId: userId, topicId: topicId });
        }
        res.json();
    }));
//unfollow route
router.post('/unfollow',
    csrfProtection,
    routeHandler(async (req, res, next) => {
        const { userId, topicId } = req.body;

        const previousEntry = await UserTopic.findOne({ where: { userId: userId, topicId: topicId } });;
        if (previousEntry) {
            previousEntry.destroy();
        }
        res.json();
    }));

    router.post('/new',
    csrfProtection,
    routeHandler(async (req, res, next) => {
        const { ownerId, name, description } = req.body;
        const previousEntry = await Topic.findOne({ where: { name: name} });
        if (!previousEntry) {
            Topic.create({ownerId, name, description});
            const newEntry = await Topic.findOne({ where: { name: name} });
        // res.redirect(`/${newEntry.id}`);
        }
        res.json();
    }));

    // router.get('/',
    // csrfProtection,
    // routeHandler(async (req, res, next) => {
    //     const id = req.params.id

    //     const previousEntry = await Topic.findOne({ where: { name: name} });
    //     if (!previousEntry) {
    //         Topic.create({ownerId, name, description});
    //         const newEntry = await Topic.findOne({ where: { name: name} });
    //     res.redirect(`/${newEntry.id}`);
    //     }
    //     res.json();
    // }));


module.exports = router;
