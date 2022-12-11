const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

//--------------------------------- GET ----------------------------------------

// @route: GET
// @desc: get user details

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select({ password: 0 })

    if (!user) {
      return res.status(500).json({
        errors: [
          {
            msg: 'Server error',
          },
        ],
      })
    }
    if (!user.access) {
      return res.status(401).json({
        errors: [
          {
            msg: "User doesn't have access to their account, please contact admin",
          },
        ],
      })
    }

    res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          msg: 'Server error',
        },
      ],
    })
  }
})

//----------------------------- POST ---------------------------------------------

// @route: POST
// @desc: user login

router.post(
  '/',

  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let { email, password } = req.body
    email = email.toLowerCase()

    //check user exists or not

    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        })
      }

      if (!user.access) {
        return res.status(400).json({
          errors: [
            {
              msg: "User doesn't have access to their account, please contact admin",
            },
          ],
        })
      }

      // comparing password
      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        })
      }

      // generating jsonWebToken
      const payload = {
        id: user.id,
      }

      const token = await jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '1h',
      })

      res.status(200).json({ token })
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
