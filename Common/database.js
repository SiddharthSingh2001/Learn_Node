// PostgreSQL configuration
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432, // or your PostgreSQL port
});


process.on('SIGINT', () => {
    pool.end().then(() => {
        console.log('PostgreSQL pool has been closed.');
        process.exit(0);
    });
});


module.exports = pool;