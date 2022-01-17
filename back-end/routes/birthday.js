const express = require('express')
const Birthday = require('../models/Birthday')

const router = express.Router()

router.route('/add')
  .post(async (req, res, next) => {
    try {
      const {userId, data} = req.body
      const result = await Birthday.create({
        idx: data.idx,
        month: data.month,
        day: data.day,
        name: data.name,
        user_id: userId,
      })
      res.json(result)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

  router.route('/list/:id')
  .get(async (req, res, next) => {
    try {
      const userId = req.params.id
      const result = await Birthday.findAll({
        where: {
          user_id: userId,
        },
      })
      result.sort(function(a, b){
        return a.idx - b.idx
      })
      res.json(result)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

  module.exports = router