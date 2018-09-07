#!/usr/bin/env node

const sparseFiles = require('./')

sparseFiles(function (err, supports) {
  if (err) throw err
  if (supports) {
    console.log('Sparse files are supported :)')
    process.exit(0)
  }
  console.log('Sparse files are *not* supported :(')
  process.exit(1)
})
