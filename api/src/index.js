import 'babel-polyfill'
import { stack } from '@gp-technical/stack-pack-api'
import services from './service'
// import winston from 'winston'
// import util from 'util'

// winston.add(winston.transports.Logentries, { token: process.env.API_LOGENTRIES_TOKEN })
;(async () => {
  try {
    debugger
    await stack.connect({
      dir: __dirname, // @@@ make this less crap
      services
    })
  } catch (inner) {
    const err = new Error(`An error occurred whilst starting the ${process.env.API_NAME} API`)
    err.inner = inner
    // winston.error(util.inspect(err))
  }
})()
