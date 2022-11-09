const chalk = require('chalk')

const logErrAndExit = (errMsg) => {
  console.log(chalk.red(errMsg))
  process.exit(1)
}

module.exports = { logErrAndExit }
