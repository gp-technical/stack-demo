import * as fs from 'fs'
import { setupAnalyticsPersistence } from '@gp-technical/stack-pack-api'
import unirest from 'unirest'

const persistAnalyticsImpl = ({ user, time, type, data }) => {
  // eslint-disable-next-line
  const req = unirest.post().headers({
    // TODO: add this Auth header to the env file
    Authorization:
      'Basic ZWZmMWMwYTJjOGM3Mzg4NjE5YzA0ZGQyNmVlNGFiNzQ4YzkzZmJhMzpmOTkwNTI3M2VkNzcyMWU1NmJlZDE1MGNmN2E5YjE3NWI4NjRjMGZj',
    'X-Experience-API-Version': '1.0.1'
  })

  // eslint-disable-next-line no-unused-vars
  const json = {
    actor: {
      mbox: `mailto:${user.email}`
    },
    verb: {
      id: 'http://example.com/analytics/' + type.toLowerCase()
    },
    object: {
      id: 'http://example.com/analytics/object',
      definition: {
        extensions: {
          'http://example.com/analytics/payload': {
            timestamp: time,
            payload: data
          }
        }
      }
    }
  }

  console.log(`Analytics: ${JSON.stringify(json, null, 2)}`)
  // send({ req, json, url: 'https://saas.learninglocker.net/data/xAPI/statements' }).then(resp => {
  //   console.log(resp)
  // })
}

export default () => {
  setupAnalyticsPersistence(persistAnalyticsImpl)
}

// eslint-disable-next-line
const send = ({ req, url, timeout, serverPath, payload, json, file }) => {
  return new Promise((resolve, reject) => {
    req.url(url)
    if (timeout) req.timeout(timeout)

    if (serverPath) {
      req.encoding('binary')
    } else if (payload) {
      req.send(payload)
    } else if (json) {
      req.type('json').send(json)
    } else if (file) {
      req.attach('file', file)
    }
    req.end(res => {
      if (res.ok) {
        if (serverPath) {
          fs.writeFileSync(serverPath, res.body, { encoding: 'binary' })
          resolve(serverPath)
        } else {
          resolve(res.body)
        }
      } else {
        if (res.error && !res.body) {
          res.body = typeof res.error === 'string' ? { Message: res.error } : res.error
        } else if (typeof res.body === 'string') {
          res.body = { Message: res.body }
        }
        res.body.RequestUrl = req.options.url
        res.body.RequestMethod = req.options.method
        reject(res.body)
      }
    })
  })
}
