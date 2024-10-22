const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

// Add a new transaction
router.post('/', async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.update(req.body);
      res.json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint for summary of transactions
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    // Create a query filter object
    const filter = {};
    if (startDate && endDate) {
      filter.date = {
        $between: [new Date(startDate), new Date(endDate)]
      };
    }
    if (category) {
      filter.category = category;
    }

    // Get total income
    const totalIncome = await Transaction.sum('amount', {
      where: { type: 'income', ...filter }
    });

    // Get total expenses
    const totalExpenses = await Transaction.sum('amount', {
      where: { type: 'expense', ...filter }
    });

    // Calculate the balance
    const balance = (totalIncome || 0) - (totalExpenses || 0);

    // Return the summary
    res.json({
      totalIncome: totalIncome || 0,
      totalExpenses: totalExpenses || 0,
      balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving summary', error });
  }
});

module.exports = router;
