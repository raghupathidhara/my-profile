const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

//------------------------ POST --------------------------------------------

// method: POST
// usage: used to provide user details based on email provided search bar in UI

router.post(
  '/',
  [check('email', 'Email is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const email = req.body.email
    //checking for user

    try {
      let user = await User.findOne({ email: email }).select({ password: 0 })
      if (!user) {
        return res.status(400).json({ errors: ['No user exists'] })
      }

      if (!user.access) {
        return res.status(400).json({ errors: ['No user exists'] })
      }

      res.status(200).json(user)
    } catch (err) {
      // console.log(err)
      return res.status(500).json({ errors: ['Server error'] })
    }
  }
)

// method: POST
// usage: update User's Name and image
router.post('/:category', [auth], async (req, res) => {
  try {
    let user = await User.findById(req.user.id)

    if (!user) {
      return res.status(400).json({ errors: ['No User found'] })
    }

    const { category } = req.params
    
    switch (category) {
      case 'name':
        user.name = req.body.name
        user.heading = req.body.heading
        break
      case 'remove':
        user.image = ''
        break
      default:
        break
    }

    await user.save()

    res.status(200).json({ msg: 'Profile Updated Succesfully' })
  } catch (err) {
    return res.status(500).json({ errors: ['Server Error'] })
  }
})

module.exports = router
