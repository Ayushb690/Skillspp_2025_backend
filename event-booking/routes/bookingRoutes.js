const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { bookEvent, cancelBooking, myBookings } = require('../controllers/bookingController');

router.post('/:eventId', auth, bookEvent);
router.delete('/:eventId', auth, cancelBooking);
router.get('/my', auth, myBookings);

module.exports = router;
