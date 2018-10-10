import 'babel-polyfill'
import { stack } from '@gp-technical/stack-pack-api'
import { featureServices } from '@gp-technical/stack-feature-api'
import localServices from './service'
import { saml } from '@gp-technical/stack-auth-api'
import { log } from '@gp-technical/stack-pack-util'

const { branding } = featureServices
const services = { branding, ...localServices }

log.logger().warn('@@@ this is for the logs')
;(async () => {
  try {
    await stack.connect({
      dir: __dirname, // @@@ make this less crap
      services,
      gpapi: true,
      authenticator: saml
    })
  } catch (inner) {
    log.error(inner, `An error occurred whilst starting the ${process.env.API_NAME} API`)
  }
})()
