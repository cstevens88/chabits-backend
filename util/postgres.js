const pgConfig = require('../.pg_config');
const Pool = require('pg').Pool;

module.exports.initializePostgres = function() {
    let pool;
    try {
        pool = new Pool({
            user: pgConfig.user,
            host: pgConfig.host,
            database: pgConfig.database,
            password: pgConfig.password,
            port: pgConfig.port || 5432
        })
        return pool;
    }
    catch(e) {
        console.log(e);
        throw e
    }
}