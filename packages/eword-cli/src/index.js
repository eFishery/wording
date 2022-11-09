#!/usr/bin/env node
const { Command } = require('commander')
const path = require('path')
const pkgJson = require('../package.json')
const { writeJsonToFile } = require('./utils/file')
const { getJsonI18nFromSheet } = require('./utils/gsheet')
const { logErrAndExit } = require('./utils/log')

const main = async () => {
  const program = new Command()
  program
    .version(pkgJson.version)
    .description(pkgJson.description)
    .arguments('[command]')
    .option('-sid, --spreadsheet-id  [value]', 'Spreadsheet id')
    .option('-o, --out <value>', 'Output file path', path.join(process.cwd(), 'data.json'))
    .action(async (command, opts) => {
      if (command === 'pull') {
        if (!opts.spreadsheetId) {
          logErrAndExit('\'--spreadsheet-id\' is required')
        }
        try {
          const jsonData = await getJsonI18nFromSheet(opts.spreadsheetId)
          writeJsonToFile(jsonData, opts.out)
        } catch (error) {
          logErrAndExit(error.message)
        }
      } else {
        logErrAndExit(`Command '${command}' not found`)
      }
    })
    .allowUnknownOption()

  await program.parseAsync(process.argv)
}

main()
