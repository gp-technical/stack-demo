import express from 'express'
import db from './db'

const router = express.Router({ mergeParams: true })

router.get('/fibo/ping', (req, res) => {
  res.send(
    `The 'fibo' service endpoints have been succesfully mounted : ${new Date().toLocaleString(
      'en-GB'
    )}`
  )
})
export default router
