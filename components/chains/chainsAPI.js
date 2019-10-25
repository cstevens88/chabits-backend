const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../../db/models/');
const Chain = models.Chain;

router.get('/', async (req, res, next) => {
    try {
        const chains = await Chain.findAll({
        });
        res.json(chains);
    }
    catch(e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const color = req.body.color || 'blue';
    try {
        const chain = await Chain.create({
            title: title,
            description: description,
            color: color
        });
        res.json(chain);
    } catch(e) {
        next(e);
    }
});

router.get('/:chainId', async (req, res, next) => {
    const chainId = req.params.chainId;
    try {
        const chain = await Chain.findAll({
            where: {
            id: chainId
        }
    });
        res.json(chain);
    }
    catch(e) {
        next(e)
    }
});

router.put('/:chainId', async (req, res, next) => {
    try {
        const updatedRow = await Chain.update(
            {
                title: req.body.title,
                description: req.body.description,
                color: req.body.color
            },
            {
            where: {
                id: {
                 [Op.eq]: req.params.chainId
                }
            },
            returning: true
        });
        res.json(updatedRow);
    } catch(e) {
        next(e);
    }
});

router.delete('/:chainId', async(req, res, next) => {
    try {
        const numberOfDestroyedRows = await Chain.destroy(
            {
            where: {
                id: {
                 [Op.eq]: req.params.chainId
                }
            }
        });
        res.json(numberOfDestroyedRows);
    } catch(e) {
        next(e);
    }
});

module.exports = router;