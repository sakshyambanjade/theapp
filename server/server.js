const express = require('express');
const { Pool } = require('pg'); // Import the pg package
const bcrypt = require('bcryptjs'); // For hashing passwords

const app = express();
const port = 5000; // You can change this to any port you want

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: 'your_postgres_user',      // Your PostgreSQL username
  host: 'localhost',               // The host where your PostgreSQL server is running
  database: 'user_management',     // The name of the database you created
  password: 'your_postgres_password', // Your PostgreSQL password
  port: 5432,                      // Default PostgreSQL port
});

// Middleware to parse incoming requests as JSON
app.use(express.json());

// API endpoint for sign-up
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new user into the database
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, hashedPassword]
    );

    // Respond with the inserted user data
    const newUser = result.rows[0]; // The inserted user data
    res.status(201).json({
      id: newUser.id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
    });
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
