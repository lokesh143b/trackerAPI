require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Sync database 
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

// Routes
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
