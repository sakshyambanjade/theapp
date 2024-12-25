const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require('../database/pool');

// Handle POST /register
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Check if user with the same email already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, normalizedEmail, hashedPassword]
    );

    // Return the newly created user (excluding password)
    const { password: _, ...userWithoutPassword } = newUser.rows[0];

    res.json(userWithoutPassword); // Send back user data (excluding password)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
