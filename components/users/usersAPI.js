const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../../db/models/');
const User = models.User;

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        res.json(users);
    }
    catch(e) {
        next(e);
    }
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await User.create({
            username: username,
            password:password,
            email:email
        });
        res.json(user);
    } catch(e) {
        next(e);
    }
});

router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findAll({
            where: {
            id: userId
        },
        attributes: {
            exclude: ['password']
        }
    });
        res.json(user);
    }
    catch(e) {
        next(e)
    }
});

router.put('/:userId', async (req, res, next) => {
    try {
        const updatedRows = await User.update(
            {
                username: req.body.username
            },
            {
            where: {
                id: {
                 [Op.eq]: req.params.userId
                }
            }
        });
        res.json(updatedRows);
    } catch(e) {
        next(e);
    }
});

module.exports = router;