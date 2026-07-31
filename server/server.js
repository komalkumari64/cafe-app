const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const menuRoutes = require('./routes/menuRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

// Socket.io ko routes mein use karne ke liye globally accessible banao
app.set('io', io)

app.use(cors())
app.use(express.json())

app.use('/api/menu', menuRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('Cafe App API is running! ☕')
})

// Socket connection
io.on('connection', (socket) => {
  console.log('🔌 A user connected:', socket.id)

  // User apna order room join kare (taaki sirf usी ka order update mile)
  socket.on('joinOrderRoom', (userId) => {
    socket.join(userId)
    console.log(`User ${userId} joined their order room`)
  })

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id)
  })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})