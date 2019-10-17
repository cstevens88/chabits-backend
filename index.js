const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const myLogger = require('./logger').myLogger;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres'
    }
);

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connected to RDS instance')
        })
        .catch(err => {
            console.error('Error connecting to RDS instance', err);
        });

const chainRoutes = require('./components/chains/chainsAPI');
const userRoutes = require('./components/users/usersAPI');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(myLogger);

app.use('/users', userRoutes);
app.use('/chains', chainRoutes);

app.listen(port, () => {
    console.log('app listening on port', port);
})