const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;

const models = require('../../db/models/');
const User = models.User;

//lets use async await and dispense with the tech debt
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users);
    }
    catch(e) {
        next(e);
    }
});



router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findAll({where: {
            id: userId
        }});
        res.json(user);
    }
    catch(e) {
        next(e)
    }
});

/* TODO: Update this route to use route parameters instead of URL querystring
router.put('/createUser', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    pool.query('INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)', [uuid(), username, password, email], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201).json(results.rows);
    })
});*/

/* TODO
router.put('/:userId', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    pool.query('INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)',
    [uuid.v1(), username, password, email], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201).json(results.rows);
    })
});

*/

module.exports = router;