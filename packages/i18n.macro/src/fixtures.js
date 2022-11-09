/* istanbul ignore next */
const path = require('path')

const basicOptions = { source: { message: 'hello world' } }
const basic = [
  {
    title: 'basic usage of `t`',
    name: 't',
    description: 'it will be translate a key in t literal text from source',
    category: 'API',
    code: `
      import {t} from '../src/i18n.macro'
      const greeting = t\`message\`;
    `,
    output: `
      const greeting = "${basicOptions.source.message}";
    `
  }
]

const jsonOptions = { source: path.join(__dirname, 'i18n.json'), lang: 'id' }

const jsonFixtures = [
  {
    title: 'basic usage of `t`',
    name: 't',
    description: 'it will be translate by key with lang and namespaces to be text',
    code: `
      import {t} from '../src/i18n.macro'
      const greeting = t\`message\`;
    `,
    output: `
      const greeting = "halo dunia";
    `
  }
]

module.exports = { basic, basicOptions, jsonFixtures, jsonOptions }
