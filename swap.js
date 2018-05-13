#!/usr/bin/env node
const { exec } = require('child_process')
console.log()

swap('app')
swap('api')

function swap(dir) {
  const path = `${__dirname}/${dir}`
  const target = process.argv[2]
  console.info('path', path)
  console.info('target', target)
  exec(`sp-swap ${path} ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`${stdout}`)
    if (stderr) console.log(`${stdout}`)
  })
}
