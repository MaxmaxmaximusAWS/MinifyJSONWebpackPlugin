const RawSource = require('webpack-sources/lib/RawSource')

module.exports = class MinifyJSONWebpackPlugin {

  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, ({assets}) => {
      for (let filename in assets) {
        if (!assets.hasOwnProperty(filename)) continue
        if (!/\.json$/.test(filename)) continue
        const json = assets[filename].source().toString()
        const jsonMinified = JSON.stringify(JSON.parse(json))
        assets[filename] = new RawSource(jsonMinified)
      }
    })
  }

}

