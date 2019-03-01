import express from 'express'
import db from './db'

const router = express.Router({ mergeParams: true })

router.get('/counter/ping', (req, res) => {
  res.send(
    `The 'counter' service endpoints have been succesfully mounted : ${new Date().toLocaleString(
      'en-GB'
    )}`
  )
})

router.get('/counter/total', (req, res) => {
  res.json({ total: db.getTotal() })
})

router.get('/counter/increment', (req, res) => {
  db.increment()
  res.json({ total: db.getTotal() })
})

router.get('/counter/decrement', (req, res) => {
  db.decrement()
  res.json({ total: db.getTotal() })
})

export default router
