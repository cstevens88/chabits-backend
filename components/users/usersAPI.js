const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const pg = require('../../util/postgres');

const pool = pg.initializePostgres();

router.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query(('SELECT * FROM users WHERE id=\'' + userId + '\''), (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows);
    });
});

// TODO: Update this route to use route parameters instead of URL querystring, if that's possible
router.put('/createUser', (req, res) => {
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

module.exports = router;