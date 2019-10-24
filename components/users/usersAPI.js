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

/*router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query(('SELECT * FROM users WHERE id=\'' + userId + '\''), (error, results) => {
        if(error) {
            throw error
        } else if(!results.rows.length > 0) {
            res.sendStatus(404);
        }
        res.status(200).json(results.rows);
    });
});

// TODO: Update this route to use route parameters instead of URL querystring, if that's possible
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
});

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