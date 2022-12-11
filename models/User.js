const mongoose = require('mongoose')
const {Schema}= mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  access: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  heading: {
    type: String,
  },
}, {minimize:false})

module.exports = User = mongoose.model('user', UserSchema)
