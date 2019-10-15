const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const myLogger = require('./logConfig').myLogger;

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