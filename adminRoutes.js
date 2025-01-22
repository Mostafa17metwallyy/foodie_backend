const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const MenuItem = require("../models/MenuItem");

// Fetch all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Add a new booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to add booking" });
  }
});

// Update a booking
router.put("/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// Delete a booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Fetch all menu items
router.get("/menuitems", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// Add a new menu item
router.post("/menuitems", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

// Update a menu item
router.put("/menuitems/:id", async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

// Delete a menu item
router.delete("/menuitems/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

module.exports = router;
