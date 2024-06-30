require('dotenv').config();  // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE,  // Path to SQLite database file from .env
  logging: false  // Disable logging for a cleaner console output
});

module.exports = sequelize;
