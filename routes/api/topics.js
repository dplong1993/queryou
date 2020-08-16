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
    // console.log(user);
    const userTopics = await UserTopic.findAll(
        {
            where: { userId: Number(user.id) },
            include: { model: Topic }
        });
    const Topics = await Topic.findAll({ include: { model: UserTopic } });

    res.json({ id: user.id, userTopics: userTopics, Topics: Topics });
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
        res.redirect(`/${newEntry.id}`);
        }
        res.json();
    }));

    router.get('/:id(\\d)',
    csrfProtection,
    routeHandler(async (req, res, next) => {
        const { ownerId, name, description } = req.body;

        const previousEntry = await Topic.findOne({ where: { name: name} });
        if (!previousEntry) {
            Topic.create({ownerId, name, description});
            const newEntry = await Topic.findOne({ where: { name: name} });
        res.redirect(`/${newEntry.id}`);
        }
        res.json();
    }));


module.exports = router;
