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
    const questions = await Question.findAll({
       include: [{
        model: User,
        attributes: ['username', 'description']
       }] 
    });
    res.json({ questions })
}));

module.exports = router;