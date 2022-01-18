const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.route('/login')
  .post(async (req, res, next) => {
    try {
      const {email, password} = req.body.data
      console.log(req.body)
      const result = await User.findOne({
        where: {
          email: email,
          password: password,
        },
      })
      console.log(result)
      res.json(result)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })
  
module.exports = router