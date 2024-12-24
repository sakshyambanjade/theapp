const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/signup', require('./routes/auth'));  // Route for handling signups

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
