const dotenv = require('dotenv').config();
const Pool = require('pg').Pool;

module.exports.initializePostgres = function() {
    let pool;
    try {
        pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT || 5432
        })
        return pool;
    }
    catch(e) {
        console.log(e);
        throw e
    }
}