import { setupAnalyticsPersistence } from '@gp-technical/stack-pack-api'
import unirest from 'unirest'

export default () => {
  setupAnalyticsPersistence((payload) => {
    const req = unirest.post().headers({
      'Authorization': 'Basic ZWZmMWMwYTJjOGM3Mzg4NjE5YzA0ZGQyNmVlNGFiNzQ4YzkzZmJhMzpmOTkwNTI3M2VkNzcyMWU1NmJlZDE1MGNmN2E5YjE3NWI4NjRjMGZj',
      'X-Experience-API-Version': '1.0.1'
    })

    const json = {
      'actor': {
        'name': 'Example User',
        'account': {
          'homePage': 'http://www.example.org',
          'name': 'example_user_id'
        }
      },
      'verb': {
        'id': 'http://example.com/analytics/viewed',
        'display': {
          'en': 'analytics_viewed'
        }
      },
      'object': {
        'id': 'http://www.example.org',
        'definition': {
          'type': 'http://activitystrea.ms/schema/1.0/application',
          'name': {
            'en': 'Example Application'
          }
        }
      },
      'context': {
        'extensions':{}
      }
    }

    if (payload) {
      json.context.extensions['http://example.com/analytics'] = payload
    }
    send({req, json, url: 'https://saas.learninglocker.net/data/xAPI/statements'}).then((resp) => {
      console.log(resp)
    })
  })
}

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
