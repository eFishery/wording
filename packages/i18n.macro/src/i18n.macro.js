const { createMacro } = require('babel-plugin-macros')
const { getProperty, isObject } = require('./utils')
const path = require('path')
const fs = require('fs')

/**
 * @typedef {[string, import('@babel/core').NodePath[]]} KeyValue
 */

/**
 * @typedef {Object} I18nOptions
 * @property {string} lang
 * @property {string|object} source
 */

/* import module name is defined in @var REFERENCES
 * @example
 * ```
 * import { t } from 'i18n.macro'
 * ```
 */
const REFERENCES = ['t']

/**
 * @param {KeyValue} keyValue
 * @return {boolean}
 */
const isAllowedReference = ([k, v]) => REFERENCES.includes(k) && Array.isArray(v) && v.length > 0

/**
 * @param {import('@babel/core').types} t
 * @param {import('@babel/core').NodePath} path
 * @return {string?} value param when use with call expression or tagged template expression
 */
const getKey = (path) =>
  ({
    [true]: () => [],
    // for find expression with t("<KEY>")
    [path.isCallExpression()]: () => [path.node.arguments[0].value],
    // for find expression with t`<KEY>`
    [path.isTaggedTemplateExpression() && path.node.quasi.quasis.length === 1]: () => [
      path.node.quasi.quasis[0].value.cooked
    ]
    // @TODO for find expression with t.<NAMESPACE>`<KEY`
  }.true())

/**
 * @param {I18nOptions} config
 * @return {Object}
 */
const getDataSource = (config) => {
  if (isObject(config.source)) return config.source
  if (path.resolve(config.source)) { return JSON.parse(fs.readFileSync(path.resolve(config.source), { encoding: 'utf8' })) }
  return {}
}

/**
 * @param {I18nOptions} config
 * @return {(key: string[]) => string}
 */
const translate = (config) => (key) => getProperty(getDataSource(config), key.join('.'), '')

/**
 * @param {import('babel-plugin-macros').MacroParams}
 * @return {void}
 */
const i18nMacro = ({ babel: { types: t }, references, state }) => {
  const getValue = translate(state.opts)

  /**
   * @param {string} reference
   * @return {(path: import('@babel/core').NodePath) => void}
   */
  const transform =
    (_reference) =>
      ({ parentPath }) => {
        const key = [(state.opts.lang || '').toLowerCase()].filter(Boolean).concat(getKey(parentPath))
        const text = getValue(key)

        parentPath.replaceWith(t.stringLiteral(text))
      }

  /**
   * @param {KeyValue} keyValue
   * @return {void}
   */
  const transformByReference = ([k, v]) => v.forEach(transform(k))

  /**
   * Applied transformation
   */
  Object.entries(references).filter(isAllowedReference).forEach(transformByReference)
}

module.exports = createMacro(i18nMacro)
