const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

Appointment.belongsTo(User);  // Appointment belongs to a User
User.hasMany(Appointment);    // User has many Appointments

module.exports = Appointment;
