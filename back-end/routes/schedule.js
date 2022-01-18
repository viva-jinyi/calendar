const express = require('express')
const Schedule = require('../models/Schedule')

const router = express.Router()

router.route('/add')
  .post(async (req, res, next) => {
    try {
      const {userId, data} = req.body
      const result = await Schedule.create({
        idx: data.idx,
        year: data.year,
        month: data.month,
        day: data.day,
        text: data.text,
        textBgColor: data.textBgColor,
        user_id: userId,
      })
      console.log(result)
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
      const result = await Schedule.findAll({
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

router.route('/edit')
  .put(async (req, res, next) => {
    try {
      const {userId, scheduleObj} = req.body.data
      const result = await Schedule.update(
        { text: scheduleObj.text,
          textBgColor: scheduleObj.textBgColor,
          year: scheduleObj.year,
          month: scheduleObj.month,
          day: scheduleObj.day,
        },
        { where: { user_id: userId, idx: scheduleObj.idx }
      })
      res.json(result)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

router.route('/delete')
  .delete(async (req, res, next) => {
    try {
      const {userId, scheduleIdx} = req.body
      const result = await Schedule.destroy({
        where: {
          user_id: userId,
          idx: scheduleIdx,
        },
      })
      res.json(result)
    } catch(err) {
      console.error(err)
      next(err)
    }
  })

  module.exports = router