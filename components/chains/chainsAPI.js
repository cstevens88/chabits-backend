const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*router.get('/', (req, res) => {
    pool.query('SELECT * FROM chains', (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.get('/:chainId', (req, res) => {
    const chainId = req.params.chainId;
    pool.query('SELECT * FROM chains WHERE id=\'' + chainId + '\'', (error, results) => {
        if(error) {
            throw error
        } else if(!results.rows.length > 0) {
            res.sendStatus(404);
        }
        res.status(200).json(results.rows)
    })
});

router.put('/createChain', (req, res) => {
    const title = req.query.title;
    const description = req.query.description || ''; // This is optional, can be NULL
    const color = req.query.color || 'blue'; // Optional but NOT NULL, defaults to blue
    pool.query('INSERT INTO chains (id, title, description, color) VALUES ($1, $2, $3, $4)', [uuid(), title, description, color], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201).json(results.rows);
    })
});

/* TODO
router.put('/:chainId', (req, res) => {
    const title = req.query.title;
    const description = req.query.description || ''; // This is optional, can be NULL
    const color = req.query.color || 'blue'; // Optional but NOT NULL, defaults to blue
    pool.query('INSERT INTO chains (id, title, description, color) ' + 
    'VALUES ($1, $2, $3, $4)', [uuid.v1(), title, description, color], (error, results) => {
        if(error) {
            throw error;
        }
        res.status(201);
    })
});
*/

module.exports = router;