const { Pool } = require('pg');

const pool = new Pool({
    user: 'kb',      // Your PostgreSQL username
    host: 'localhost',               // The host where your PostgreSQL server is running
    database: 'user_management',     // The name of the database you created
    password: 'admin', // Your PostgreSQL password
    port: 5432, 
});

module.exports = pool;
