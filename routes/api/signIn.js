const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route: POST
// @desc: creating user
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // validating errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let { name, email, password } = req.body
    email = email.toLowerCase()
    const username = email.substring(0, email.indexOf('@'))

    // checking for existing user
    try {
      let user = await User.findOne({ email: email })
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Email already exists',
            },
          ],
        })
      }
      let findUserName = await User.findOne({ username: username })
      if (findUserName) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Username is already taken, please sign-up with different email',
            },
          ],
        })
      }

      // creating user
      user = new User({ name, username, email, password })
      //create new profile
      const profile = new Profile({ user: user.id })

      // hashing password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()
      await profile.save()
      // generate jsonWebToken

      // const payload = {
      //     id : user.id,
      // }

      // const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' })

      res.status(200).json({
        response: 'Successfully registered',
      })
    } catch (err) {
      return res.status(500).json({
        errors: [
          {
            msg: 'Server error',
          },
        ],
      })
    }
  }
)

module.exports = router
