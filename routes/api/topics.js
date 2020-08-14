const express = require('express');
const router = express.Router();

const { routeHandler, handleValidationErrors } = require("../utils");

const db = require('../../db/models');
const { Topic } = db;

router.get('/', routeHandler(async (req, res) => {
    const topics = await Topic.findAll({
        attributes: ['name', 'description']
    });
    res.json({ topics })
}));

module.exports = router;