const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const profileObj = require('../../middleware/profile/profileObjects')

//---------------- GET--------------------------------
// method: GET
// usage: Get profile of user
router.get('/', [auth], async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) {
      return res.status(400).json({
        errors: [
          {
            msg: 'No profile found',
          },
        ],
      })
    }

    res.status(200).json(profile)
  } catch (e) {
   
    return res.status(400).json({
      errors: [
        {
          msg: 'Server error',
        },
      ],
    })
  }
})

//---------------------- POST ----------------------------------

// method: POST
// usage: update profile catergory details

router.post('/:category', [auth], async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({
        errors: [
          {
            msg: 'No profile found',
          },
        ],
      })
    }

    const { category } = req.params
    

    let values = null
    let result = null
    switch (category) {
      case 'about':
        profile.about = req.body.about
        await profile.save()
        result = profile.about
        break
      case 'social':
        values = profileObj.social(req, res)
        profile.social = values
        await profile.save()
        result = profile.social
        break

      case 'mobile':
        values = profileObj.mobile(req, res)
        profile.mobile = values
        await profile.save()
        result = profile.mobile
        break

      case 'skills':
        values = profileObj.skills(req, res)
        profile.skills.push(values)
        await profile.save()
        result = profile.skills
        break

      case 'experience':
        values = profileObj.experience(req, res)
        profile.experience.push(values)
        await profile.save()
        result = profile.experience
        break

      case 'education':
        values = profileObj.education(req, res)
        profile.education.push(values)
        await profile.save()
        result = profile.education
        break

      case 'projects':
        values = profileObj.project(req, res)
        profile.projects.push(values)
        await profile.save()
        result = profile.projects
        break

      case 'achievements':
        values = profileObj.achievement(req, res)
        profile.achievements.push(values)
        await profile.save()
        result = profile.achievements
        break

      case 'extraImage':
        values = profileObj.extraImages(req, res)
        profile.extra.personalImages.push(values)
        await profile.save()
        result = profile.extra.personalImages
        break

      case 'extraVideo':
        values = profileObj.extraVideo(req, res)
        profile.extra.personalVideos.push(values)
        await profile.save()
        result = profile.extra.personalVideos
        break
    }

    //const socialDetails = social(req, res);
    // const profile = await Profile.findOneAndUpdate(
    //     {user: req.user.id},
    //     {[key]: valueObj},
    //     {new: true}
    // );

    // await profile.save();

    res.status(200).json(result)
  } catch (e) {
    
    return res.status(400).json({
      errors: [
        {
          msg: 'Server error',
        },
      ],
    })
  }
})

// method: DELETE
// usage: delete profile social details

router.delete('/:category/:id', [auth], async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({
        errors: [
          {
            msg: 'No profile found',
          },
        ],
      })
    }

    const { category, id } = req.params
    

    let index=null
    switch (category) {
      case 'about':
        profile.about = ''
        break

      case 'social':
        profile.social = {
          linked: '',
          youtube: '',
          facebook: '',
          github: '',
          instagram: '',
        }
        break

      case 'mobile':
        profile.mobile = {
          primary: '',
          secondary: '',
        }
        break

      case 'skills':
        index = profile.skills.findIndex((item) => item._id == id)
        profile.skills.splice(index, 1)
        break

      case 'experience':
        index = profile.experience.findIndex((item) => item._id == id)
        profile.experience.splice(index, 1)
        break

      case 'education':
        index = profile.education.findIndex((item) => item._id == id)
        profile.education.splice(index, 1)
        break

      case 'projects':
        index = profile.projects.findIndex((item) => item._id == id)
        profile.projects.splice(index, 1)
        break

      case 'achievements':
        index = profile.achievements.findIndex((item) => item._id == id)
        profile.achievements.splice(index, 1)
        break

      case 'extraImage':
        index = profile.extra.personalImages.findIndex((item) => item._id == id)
        profile.extra.personalImages.splice(index, 1)
        break

      case 'extraVideo':
        index = profile.extra.personalVideos.findIndex((item) => item._id == id)
        profile.extra.personalVideos.splice(index, 1)
        break
    }

    await profile.save()

    res.status(200).json(`Id ${id} deleted successfully`)
  } catch (e) {
    
    return res.status(500).json({
      errors: [
        {
          msg: 'Server error',
        },
      ],
    })
  }
})

module.exports = router
