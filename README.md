Thymeleaf Inject Webpack Plugin
========================================

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).

It adds automatically [thymeleaf](https://www.thymeleaf.org/) to all of your injected resources before generate output html

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev nkb84/thymeleaf-inject-webpack-plugin
```

Install the plugin with yarn:
```shell
$ yarn add --dev nkb84/thymeleaf-inject-webpack-plugin
```

Basic Usage
-----------
Load the plugin

```javascript
  const ThymeleafInjectWebpackPlugin = require('thymeleaf-inject-webpack-plugin');
```

and add it to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new ThymeleafInjectWebpackPlugin()
]  
```
