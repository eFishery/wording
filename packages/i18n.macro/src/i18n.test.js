const createTests = require('./create-tests')
const {
  // object as source
  basic,
  basicOptions,

  // json file as source
  jsonFixtures,
  jsonOptions
} = require('./fixtures')

createTests('i18n.macro with inline object datasource', basic, basicOptions)

createTests('i18n.macro with json datasource', jsonFixtures, jsonOptions)
