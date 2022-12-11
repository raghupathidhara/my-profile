const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  about: {
    type: String,
  },

  profilePic: {
    type: String,
  },

  mobile: {
    primary: {
      type: String,
    },
    secondary: {
      type: String,
    },
  },

  social: {
    linkedIn: {
      type: String,
    },
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    github: {
      type: String,
    },
  },

  skills: [
    {
      skillName: String,
      level: String,
    },
  ],

  experience: [
    {
      companyName: String,
      location: String,
      position: String,
      yoe: String,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],

  education: [
    {
      college: String,
      degree: String,
      yop: String,
      percentage: String,
      cgpa: String,
      stream: String,
    },
  ],

  projects: [
    {
      projectName: String,
      projectUrl: String,
      details: String,
      duration: Number,
      from: Date,
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],

  achievements: [
    {
      name: String,
      details: String,
      date: Date,
      url: String,
    },
  ],

  extra: {
    personalImages: [
      {
        name: String,
        description: String,
        image: String,
      },
    ],
    personalVideos: [
      {
        name: String,
        description: String,
        video: String,
      },
    ],
  },
}, {minimize:false})

module.exports = Profile = mongoose.model('profile', profileSchema)
