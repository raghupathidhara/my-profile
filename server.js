const express = require('express')
const app = express()

const connectDB = require('./config/db')
const cors = require('cors')
const path= require('path')

app.use(cors())

// initiating port
const PORT = process.env.PORT || 5000

// json formate
app.use(express.json())

//connecting database
connectDB((err, res) => {
  console.log('Database connected')
})


// API routes
app.use('/api/signin', require('./routes/api/signIn'))
app.use('/api/login', require('./routes/api/login'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profilePic', require('./routes/api/profilePic'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/myprofile', require('./routes/api/myProfile'))
app.use('/api/admin', require('./routes/api/adminDetails'))


// launching server
app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`)
})
