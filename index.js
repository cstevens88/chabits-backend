const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

const pg = require('./util/postgres');

const pool = pg.initializePostgres();

// TODO: Abstract postgres querying into util/postgres.js
// It doesn't belong here

// TODO: Move these routes into their own module
app.get('/getUsers', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.put('/createUser', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    pool.query('INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)', [uuid.v1(), username, password, email], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201).json(results.rows);
    })
});

app.get('/getChains', (req, res) => {
    pool.query('SELECT * FROM chains', (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.put('/createChain', (req, res) => {
    const title = req.query.title;
    const description = req.query.description || ''; // This is optional, can be NULL
    const color = req.query.color || 'blue'; // Optional but NOT NULL, defaults to blue
    pool.query('INSERT INTO chains (id, title, description, color) ' + 
    'VALUES ($1, $2, $3, $4)', [uuid.v1(), title, description, color], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201).json(results.rows);
    })
});

app.listen(port, () => {
    console.log('app listening on port', port);
})