'use strict';

const assert = require('assert')
const objectAssign = require('object-assign')

const PLUGIN = 'ThymeleafInjectWebpackPlugin'
const EVENT = 'html-webpack-plugin-alter-asset-tags'

class ThymeleafInjectWebpackPlugin {
  constructor (options) {
    assert.equal(options, undefined, 'The ThymeleafInjectWebpackPlugin does not accept any options');
  }

  apply (compiler) {
    // Hook into the html-webpack-plugin processing
    if (compiler.hooks) {
      // Webpack 4+ Plugin System
      compiler.hooks.compilation.tap(PLUGIN, compilation => {
        if (compilation.hooks.htmlWebpackPluginAlterAssetTags) {
          compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(PLUGIN,
            this.thymeleafInjectWebpackPluginAlterAssetTags.bind(this)
          );
        }
      });
    } else {
      // Webpack 1-3 Plugin System
      compiler.plugin('compilation', compilation => {
        compilation.plugin(EVENT,
          this.thymeleafInjectWebpackPluginAlterAssetTags.bind(this)
        );
      });
    }
  }

  /**
   * The main processing function
   */
  thymeleafInjectWebpackPluginAlterAssetTags (htmlPluginData, callback) {
    const htmlWebpackPluginOptions = htmlPluginData.plugin.options;
    const pluginData = objectAssign({}, htmlPluginData);

    pluginData.body.forEach(this.appendThymeLeafAttrs);
    pluginData.head.forEach(this.appendThymeLeafAttrs);

    callback(null, pluginData);
  }

  appendThymeLeafAttrs (tagDefinition) {
    switch (tagDefinition.tagName) {
      case 'script':
        // JS file
        if (tagDefinition.attributes.type == 'text/javascript') {
          tagDefinition.attributes['th:src'] = "@{" + tagDefinition.attributes.src + "}"
        }
        break;
      case 'link':
        // CSS file
        if (tagDefinition.attributes.rel == 'stylesheet') {
          tagDefinition.attributes['th:href'] = "@{" + tagDefinition.attributes.href + "}"
        }
        break;
      default:
        // do nothing
    }

    return tagDefinition
  }
}

module.exports = ThymeleafInjectWebpackPlugin
