const fs = require('fs')
const os = require('os')
const path = require('path')
const env = require('./src/env.js')

/**
 * Read env vars from the api/.env file and write the cert
 * data to files so it can be used by the webpack-dev-server.
 * Only needed for local out of container development.
 */

const format = content => content.replace(/ (?!PRIVATE|KEY|CERTIFICATE)/g, os.EOL)

const generateBasename = () => path.join(os.tmpdir(), `${env.host.replace(/\./g, '-')}`)

const generateFilename = ext => `${generateBasename()}.${ext}`

const persist = (content, ext) => {
  try {
    const filename = generateFilename(ext)
    const formatted = format(content)
    fs.writeFileSync(filename, formatted)
    return filename
  } catch (err) {
    console.log(err)
    throw err
  }
}

const extractCertData = lines => {
  const cert = {}
  for (const line of lines) {
    const match = line.match(/^(TLS_KEY|TLS_CERT)=(.+)$/)
    if (match) {
      cert[match[1]] = match[2]
      if (Object.keys(cert).length === 2) break
    }
  }
  return cert
}

const persistCert = certData => {
  const certFile = persist(certData.TLS_CERT, 'cert')
  const keyFile = persist(certData.TLS_KEY, 'key')
  console.log(`Written ${certFile} and ${keyFile}`)
}

const dotEnvFilename = () => path.resolve('..', 'api', '.env')

const readEnvVars = () =>
  fs
    .readFileSync(dotEnvFilename())
    .toString()
    .split(/\r\n|\n/)

const createCertFiles = () => persistCert(extractCertData(readEnvVars()))

module.exports = { createCertFiles, generateFilename }
