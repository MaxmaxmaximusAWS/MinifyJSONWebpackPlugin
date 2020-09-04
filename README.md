MinifyJSONWebpackPlugin
=

Features:
-
- Minify all json files which find
- No need loaders
- Can be used to generate translation dictionaries, manifest.json, and for anything else, any file with the json extension will be minified.

Requires:
- Webpack ^4.0.0

Usage:
-
No need loaders, just add plugin after all plugins, and he minify all json assets which find. If some plugin generates a json file, then my plugin will also find this file and compress =)
```js
webpackConfig = {
  plugins: [
    new MinifyJSONWebpackPlugin()
  ]
}
```


Plugin code:
---
(Yes, that's all)
```js
class MinifyJSONWebpackPlugin {

  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, ({assets}) => {
      for (let filename in assets) {
        if (!assets.hasOwnProperty(filename)) continue
        if (!/\.json$/.test(filename)) continue
        const json = assets[filename].source().toString()
        const jsonMinified = JSON.stringify(JSON.parse(json)) // magic minify =)
        assets[filename] = new RawSource(jsonMinified)
      }
    })
  }

}
```
