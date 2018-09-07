# supports-sparse-files

Test if a file system supports sparse files

```
npm install supports-sparse-files
```

## Usage

``` js
const supportsSparseFiles = require('supports-sparse-files')

supportsSparseFiles(function (err, yes) {
  if (err) throw err
  console.log('sparse files supported?', yes)
})
```

## API

#### `supportsSparseFiles([dir], callback)`

Check if a file system supports sparse files. A ~8kb test file is written and removed in `${dir}/.sparse-test` to test it.

## CLI

There is a CLI available as well

```
npm install -g supports-sparse-files
supports-sparse-files # will tell you if they are supported
```

## License

MIT
