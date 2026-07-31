const Order = require('../models/Order')

// Naya order create karo
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body

    const newOrder = new Order({
      user: req.userId,
      items,
      totalAmount
    })

    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ message: error.message })
  }
}

// Logged-in user ke saare orders fetch karo
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error('Fetch orders error:', error)
    res.status(500).json({ message: error.message })
  }
}

// Order status update karo (admin ke liye)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    order.status = status
    const updatedOrder = await order.save()

    // Real-time update bhejo us user ko jiska ye order hai
    const io = req.app.get('io')
    io.to(order.user.toString()).emit('orderStatusUpdated', updatedOrder)

    res.json(updatedOrder)
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createOrder, getMyOrders, updateOrderStatus }