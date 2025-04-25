const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");


// CREATE a new booking
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventType || !eventDate || !location) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      message
    });

    const newUser = new User({
      name,
      email,
      phone
    });

    const savedBooking = await newBooking.save();
    const savedUser = await newUser.save();
    console.log({ savedUser });

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// GET booking by email
router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.find({ email });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found with this email" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking by email:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
});

// UPDATE booking by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// DELETE booking by ID (Cancel booking)
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

// GET all bookings (for Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE a booking by ID (for Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
