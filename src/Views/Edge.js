/*
 * @fullstackjs/mail
 *
 * (c) Kati Frantz <frantz@fullstackjs.online>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Edge = require('edge.js')
const BaseRenderEngine = require('./Base')

/**
 * This class defines a render method which will be used to
 * parse the view file in which the email was drafted.
 * This is specifically for edge view engine.
 *
 * @class EdgeRenderEngine
 * @constructor
 */
class EdgeRenderEngine extends BaseRenderEngine {
  /**
   * Initialize the base render engine.
   *
   * @return {Null}
   */
  constructor(config) {
    super(config)

    this.Config = config
  }

  /**
   * Render the content
   *
   * @param {String} path
   * @param {Object} data
   */
  render(view, data = {}) {
    const { html, text, watchHtml } = this._getContent(view)

    return {
      html: html ? Edge.renderString(html, data) : null,
      text: text ? Edge.renderString(text, data) : null,
      watchHtml: watchHtml ? Edge.renderString(watchHtml, data) : null
    }
  }
}

module.exports = EdgeRenderEngine
