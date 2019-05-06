/*
 * @fullstackjs/mail
 *
 * (c) Kati Frantz <frantz@fullstackjs.online>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Fs = require('fs')
const Path = require('path')
const GE = require('@adonisjs/generic-exceptions')
const { getSupportedEngines, getEnginesExtensionsMap } = require('../helpers')

/**
 * This class is the base for all render engines. Contains
 * helpful methods used in all the render engines.
 *
 * @class BaseRenderEngine
 * @constructor
 */
class BaseRenderEngine {
  /**
   * Initialize the base render engine.
   *
   * @return {Null}
   */
  constructor(config) {
    this.Config = config

    const supportedViewEngines = getSupportedEngines()

    if (!supportedViewEngines.includes(this.Config.viewEngine)) {
      throw GE.RuntimeException.missingConfig(
        `The View engine to be used for sending mails is not defined.`
      )
    }

    this.enginesExtensionsMap = getEnginesExtensionsMap()
  }

  /**
   * This method gets the content of the view we want to render
   *
   * @param {String} path the name of the view
   * @return {any} content
   */
  _getContent(view) {
    return {
      html: this._getFileContent(view, 'html'),
      text: this._getFileContent(view, 'text'),
      watchHtml: this._getFileContent(view, 'watch-html')
    }
  }

  /**
   * This method gracefully tries to get the content of the template file.
   * It returns null if file is not found.
   *
   * @param {String} view
   * @param {String} type
   *
   * @private
   *
   * @return {String|Null}
   *
   */
  _getFileContent(view, type) {
    const engine = this.Config.viewEngine

    try {
      return Fs.readFileSync(
        this._getViewsPath(
          `${view}/${view}.${type}.${this.enginesExtensionsMap[engine]}`
        ),
        'utf8'
      )
    } catch (e) {
      return null
    }
  }

  /**
   * This method resolves the path to the where all mails are stored.
   * It uses the default which is a folder called mails.
   *
   * @param {String} view
   *
   * @private
   *
   * @return {String}
   *
   */
  _getViewsPath(view) {
    const currentWorkingDirectory = process.cwd()

    return Path.resolve(
      currentWorkingDirectory,
      this.Config.views || 'mails',
      view
    )
  }
}

module.exports = BaseRenderEngine
