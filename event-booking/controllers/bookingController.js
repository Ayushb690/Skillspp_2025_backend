const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event || event.booked >= event.capacity)
    return res.status(400).json({ msg: 'No slots available' });

  const alreadyBooked = await Booking.findOne({ user: req.user._id, event: event._id });
  if (alreadyBooked) return res.status(400).json({ msg: 'Already booked' });

  const booking = new Booking({ user: req.user._id, event: event._id });
  await booking.save();
  event.booked++;
  await event.save();

  res.status(201).json(booking);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findOneAndDelete({ user: req.user._id, event: req.params.eventId });
  if (!booking) return res.status(404).json({ msg: 'Booking not found' });

  const event = await Event.findById(req.params.eventId);
  if (event.booked > 0) {
    event.booked--;
    await event.save();
  }

  res.json({ msg: 'Booking canceled' });
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('event');
  res.json(bookings);
};
