const express = require('express');
const app = express();
const uuid = require('uuid');
const Pool = require('pg').Pool;
const port = 3000;
const pgConfig = require('./.pg_config');

let pool;
try {
    pool = new Pool({
        user: pgConfig.user,
        host: pgConfig.host,
        database: pgConfig.database,
        password: pgConfig.password,
        port: 5432
    })
    pool.query("CREATE TABLE IF NOT EXISTS users (id VARCHAR(100) PRIMARY KEY, username VARCHAR(30), password VARCHAR(30), email VARCHAR(30) UNIQUE)");
}
catch(e) {
    console.log(e)
}

app.get('/getData', (req, res) => {
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

app.listen(port, () => {
    console.log('app listening on port', port);
})