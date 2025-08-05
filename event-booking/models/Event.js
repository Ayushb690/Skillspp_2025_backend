const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  capacity: Number,
  booked: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
