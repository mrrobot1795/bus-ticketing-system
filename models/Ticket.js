// models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  userDetails: {
    name: String,
    email: String
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
