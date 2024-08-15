const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');

// Movie Listing : Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check availability
router.get('/:movieId/slots/:slotId/availability', async (req, res) => {
    try {
      const { movieId, slotId } = req.params;
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      const slot = movie.timeSlots.id(slotId);
      if (!slot) return res.status(404).json({ message: 'Time slot not found' });
  
      res.json({ remainingCapacity: slot.capacity - slot.booked });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Reserve time slot
router.post('/:movieId/slots/:slotId/reserve', async (req, res) => {
    try {
      const { numberOfPeople } = req.body;
      
      // Validate numberOfPeople
      if (!Number.isInteger(numberOfPeople) || numberOfPeople <= 0) {
        return res.status(400).json({ message: 'Number of people must be a positive integer' });
      }
  
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
      const timeSlot = movie.timeSlots.id(req.params.slotId);
      if (!timeSlot) return res.status(404).json({ message: 'Time slot not found' });
  
      // Check availability
      const availability = timeSlot.capacity - timeSlot.booked;
      if (numberOfPeople > availability) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
  
      // Update the booking count and save the movie
      timeSlot.booked += numberOfPeople;
      await movie.save();
  
      res.json({
        message: 'Reservation successful',
        updatedTimeSlot: {
          slotId: timeSlot._id,
          booked: timeSlot.booked,
          remainingCapacity: timeSlot.capacity - timeSlot.booked
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  

module.exports = router;
