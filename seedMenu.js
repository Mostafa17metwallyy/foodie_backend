require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const menuData = require('../data/menuData');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing menu items
    await MenuItem.deleteMany({});
    
    // Transform the data to match the MenuItem schema
    const enrichedMenuData = menuData.map(item => ({
      ...item,
      category: 'main', // You might want to add categories to your menuData.js
      imageUrl: '',     // Add default image URL if needed
      isAvailable: true // Set default availability
    }));
    
    // Insert menu data
    const menuItems = await MenuItem.insertMany(enrichedMenuData);
    console.log('Database seeded successfully with', menuItems.length, 'items');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 