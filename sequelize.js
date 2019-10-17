const Sequelize = require('sequelize');

connectToDb = async function() {
    const sequelize = new Sequelize(
        process.env.POSTGRES_DATABASE,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres'
        }
    );
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to RDS instance');
    } catch(err) {
        console.log('Error connecting to RDS instance', err);
    }
}

module.exports = {
    connectToDb
}