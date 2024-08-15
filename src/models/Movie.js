const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  time: String,
  capacity: Number,
  booked: {
    type: Number,
    default: 0
  }
});

const movieSchema = new mongoose.Schema({
  title: String,
  timeSlots: [timeSlotSchema]
});

module.exports = mongoose.model('Movie', movieSchema);