const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const winston = require('winston');

const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./components/users/usersAPI');
const chainRoutes = require('./components/chains/chainsAPI');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use('/users', userRoutes);
app.use('/chains', chainRoutes);

app.listen(port, () => {
    console.log('app listening on port', port);
})