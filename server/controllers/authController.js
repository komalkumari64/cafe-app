const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check karo user pehle se hai kya
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Password hash karo
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Naya user banao
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()

    // Token generate karo
    const token = generateToken(savedUser._id)

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // User dhundo email se
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Password compare karo
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Token generate karo
    const token = generateToken(user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signup, login }