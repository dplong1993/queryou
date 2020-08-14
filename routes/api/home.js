const express = require('express');
const router = express.Router();

const { routeHandler, handleValidationErrors } = require("../utils");

const db = require('../../db/models');
const { User, Question, Answer, AnswerComment } = db;

// router.get('/', routeHandler(async (req, res) => {
//     const answerComments = await AnswerComment.findAll({
//         include: 
//             {
//                 model: Answer
// model: Answer, 
// include: {
//     model: Question,
//     include: {
//         model: User
//     }
//},

// }
// {
//     model: User,
//     attributes: ['username', 'description']
// },
// {
//     model: Question,
//     attributes: ['content', 'createdAt', 'updatedAt']
// }, 
// {
//     model: AnswerComment,
//     attributes: ['content', 'ownerId', 'createdAt', 'updatedAt']
// }
//     });


//     res.json({ answerComments })
// }));

router.get('/', routeHandler(async (req, res) => {
    const answers = await Answer.findAll({
        include: [
            { model: Question, attributes: ['content'] },
            { model: User, attributes: ['username','description'] },
            { model: AnswerComment , attributes: ['content', 'createdAt', 'updatedAt']}
        ]
    });
    res.json({ answers })
}));

module.exports = router;