// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Update ticket status (open/close) and add user details
router.patch('/update/:seatNumber', async (req, res) => {
  try {
    const { status, userDetails } = req.body;
    const ticket = await Ticket.findOneAndUpdate({ seatNumber: req.params.seatNumber }, { status, userDetails }, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// View ticket status by seat number
router.get('/status/:seatNumber', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ seatNumber: req.params.seatNumber });
    res.json({ status: ticket.status });
  } catch (err) {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// View all closed tickets
router.get('/closed', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'closed' });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View all open tickets
router.get('/open', async (req, res) => {
  try {
    const tickets = await Ticket.find({ status: 'open' });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View details of the person owning the ticket
router.get('/details/:seatNumber', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ seatNumber: req.params.seatNumber });
    res.json(ticket.userDetails);
  } catch (err) {
    res.status(404).json({ message: "Ticket not found" });
  }
});

// Reset all tickets (for admin)
router.post('/reset', async (req, res) => {
  try {
    await Ticket.updateMany({}, { status: 'open', userDetails: {} });
    res.json({ message: 'All tickets have been reset to open.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
