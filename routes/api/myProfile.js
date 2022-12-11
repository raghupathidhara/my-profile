const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

router.post(
  '/',
  [check('username', 'Username is required')],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username } = req.body
    try {
      const user = await User.findOne({ username: username }).select({
        password: 0,
      })

      if (!user || !user.access) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Sorry, No User Found!',
            },
          ],
        })
      }

      const profile = await Profile.findOne({ user: user._id })
      if (!profile) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Internal Error!',
            },
          ],
        })
      }

      res.status(200).json({
        user: user,
        profile: profile,
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
