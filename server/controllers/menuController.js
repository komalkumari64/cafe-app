const MenuItem = require('../models/MenuItem')

// Saare menu items fetch karo
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Naya menu item add karo
const createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body)
    const savedItem = await newItem.save()
    res.status(201).json(savedItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { getMenuItems, createMenuItem }