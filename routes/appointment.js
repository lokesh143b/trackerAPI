require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointment');
const router = express.Router(); 

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Use the secret from the .env file
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Create appointment
router.post('/appointments', authenticate, async (req, res) => {
  const { date, time } = req.body;

  try {
    const newAppointment = await Appointment.create({ date, time, UserId: req.userId });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all appointments for authenticated user
router.get('/appointments', authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { UserId: req.userId } });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
