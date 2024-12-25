const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables with default values
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  NODE_ENV,
} = process.env;

// Validate essential environment variables
if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASS || !DB_PORT) {
  console.error('Error: Missing required database configuration in .env');
  process.exit(1); // Exit the application with a failure code
}

// Create a new pool instance
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: Number(DB_PORT), // Ensure the port is a number
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Enable SSL in production
});

// Handle pool events for better debugging and reliability

// Log when the pool is connected
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

// Log errors on idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1); // Exit the application if an unexpected error occurs
});

// Optionally, log when the pool is drained (no more clients)
pool.on('remove', () => {
  console.log('A client has been removed from the pool');
});

module.exports = pool;
