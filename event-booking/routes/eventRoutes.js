const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');
const { createEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/eventController');

router.get('/', auth, getEvents);
router.post('/', auth, checkRole('admin'), createEvent);
router.put('/:id', auth, checkRole('admin'), updateEvent);
router.delete('/:id', auth, checkRole('admin'), deleteEvent);

module.exports = router;
