import 'babel-polyfill'
import { rest, sharedServices, socket, sso } from '@gp-technical/stack-pack-api'
import { x509 } from '@gp-technical/stack-pack-util'
import gpapi from 'stack-pack-gpapi'
import localServices from './service'
import express from './express'
import winston from 'winston'
import Logger from 'le_node' // eslint-disable-line no-unused-vars
import util from 'util'
import initialiser from './initialiser'

import setupAnalytics from './setupAnalytics'

const services = { ...localServices, ...sharedServices }

setupAnalytics()

winston.add(winston.transports.Logentries, { token: process.env.API_LOGENTRIES_TOKEN })
winston.info('---------------------------')
;(async () => {
  try {
    // Starts an HTTPS express server
    const { tls, app } = await express.start(services)

    // Performs the security handshake with the GP-API
    // Sets up a single proxy endpoint to allow secure access to all GP-API endpoints
    // To use self-signed TLS certs ensure the GP-API console is running with the debugger attached.
    await gpapi.handshake({
      app,
      apiUrl: process.env.GP_API_URL,
      keyPublic: process.env.GP_API_PUBLIC,
      keyPrivate: process.env.GP_API_SECRET
    })

    // Discovers and mounts any endpoints found in service/router.js files
    // Note the baseUrl prefix. This is an optional namespace for all the
    // rest endpoints provided by the individual services.
    rest.setRoutes({
      app,
      services
    })

    // Mounts the SSO routes to allow for SSO handshakes
    sso.setRoutes({
      app,
      cookieSecret: process.env.SSO_COOKIE_SECRET,
      idpUrl: process.env.SSO_IDP_URL,
      keyDecrypt: x509.formatPrivateKey(process.env.SSO_SP_PRIVATE_KEY),
      spEntityId: process.env.SSO_SP_ENTITYID
    })

    // Connects the socket to receive and broadcast REDUX actions to and from the app
    socket.connect({
      services,
      tls,
      initialiser
    })
  } catch (inner) {
    const err = new Error(`An error occurred whilst starting the ${process.env.API_NAME} API`)
    err.inner = inner
    winston.error(util.inspect(err))
  }
})()
