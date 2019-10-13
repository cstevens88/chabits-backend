const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./components/users/usersAPI');
const chainRoutes = require('./components/chains/chainsAPI');

app.use('/users', userRoutes);
app.use('/chains', chainRoutes);

// TODO: Abstract postgres querying into util/postgres.js
// It doesn't belong here

// TODO: Move these routes into their own module

app.listen(port, () => {
    console.log('app listening on port', port);
})