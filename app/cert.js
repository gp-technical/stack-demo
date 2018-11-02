const fs = require('fs')
const os = require('os')
const env = require('./src/env')
const path = require('path')

const format = content => content.replace(/ (?!PRIVATE|KEY|CERTIFICATE)/g, os.EOL)

const generateBasename = () => path.join(os.tmpdir(), `${env.host.replace(/\./g, '-')}`)

const generateFilename = ext => `${generateBasename()}.${ext}`

const persist = (content, ext) => {
  try {
    const filename = generateFilename(ext)
    const formatted = format(content)
    console.log(formatted)
    fs.writeFileSync(filename, formatted)
    return filename
  } catch (err) {
    console.log(err)
    throw err
  }
}

const dotEnvFilename = () => path.resolve('..', 'api', '.env')

// Complete hack. .env sits in the API and we need the certs for the webpack dev server.
const readEnvVars = () => {
  const lines = fs
    .readFileSync(dotEnvFilename())
    .toString()
    .split(/\r\n|\n/)
  console.log(`lines: ${JSON.stringify(lines, null, 2)}`)
  const cert = {}
  for (const line of lines) {
    const match = line.match(/^(TLS_KEY|TLS_CERT)=(.+)$/)
    if (match) {
      console.log(`match: ${match[1]} ${match[2]}`)
      cert[match[1]] = match[2]
      console.log(`cert ${JSON.stringify(cert, null, 2)}`)
      if (Object.keys(cert).length === 2) break
    }
  }
  return cert
}

const persistCert = certData => {
  console.log('persistCert')
  const certFile = persist(certData.TLS_CERT, 'cert')
  const keyFile = persist(certData.TLS_KEY, 'key')
  console.log(`Written ${certFile} and ${keyFile}`)
}

const createCertFiles = () => {
  const certData = readEnvVars()
  persistCert(certData)
  console.log('After readEnvVars')
}

module.exports = { createCertFiles, generateFilename }
