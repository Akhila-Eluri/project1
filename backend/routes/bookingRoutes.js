const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE a new booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
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
    const booking = await Booking.find({ email: email });

    if (!booking.length) {
      return res.status(404).json({ message: "No booking found with this email" });
    }

    res.status(200).json(booking);
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

// DELETE booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

module.exports = router;

// Get all bookings (admin only)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ eventDate: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve bookings" });
  }
});