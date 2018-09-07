const path = require('path')
const fs = require('fs')

module.exports = sparseFiles

function sparseFiles (dir, cb) {
  if (typeof dir === 'function') return sparseFiles('.', dir)
  if (!dir) dir = '.'

  fs.open(path.join(dir, '.sparse-test'), 'w', function (err, fd) {
    if (err) return cb(err)

    writeAndStat(8192, function (err, before) {
      if (err) return done(err, false)
      writeAndStat(0, function (err, after) {
        if (err) return done(err, false)
        done(null, after.blocks === undefined || after.blocks !== before.blocks)
      })
    })

    function writeAndStat (pos, cb) {
      fs.write(fd, Buffer.from([0xff]), 0, 1, pos, function (err) {
        if (err) return cb(err)
        fs.fstat(fd, cb)
      })
    }

    function done (error, sparse) {
      fs.close(fd, function (err) {
        if (err) return cb(err)
        fs.unlink(path.join(dir, '.sparse-test'), function (err) {
          if (err) return cb(err)
          if (error) return cb(error)
          cb(null, sparse)
        })
      })
    }
  })
}
