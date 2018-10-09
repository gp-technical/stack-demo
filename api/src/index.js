import 'babel-polyfill'
import { stack } from '@gp-technical/stack-pack-api'
import { featureServices } from '@gp-technical/stack-feature-api'
import localServices from './service'
import { saml } from '@gp-technical/stack-auth-api'
// import winston from 'winston'
// import util from 'util'

const { branding } = featureServices
const services = { branding, ...localServices }

// winston.add(winston.transports.Logentries, { token: process.env.API_LOGENTRIES_TOKEN })
;(async () => {
  try {
    await stack.connect({
      dir: __dirname, // @@@ make this less crap
      services,
      gpapi: true,
      authenticator: saml
    })
  } catch (inner) {
    const err = new Error(`An error occurred whilst starting the ${process.env.API_NAME} API`)
    err.inner = inner
    // winston.error(util.inspect(err))
  }
})()
