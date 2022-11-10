const fs = require('fs')
const path = require('path')

const writeJsonToFile = (strJson, filename) => {
  const filePath = path.join(process.cwd(), filename)
  fs.writeFileSync(filePath, JSON.stringify(strJson, null, 2))
}

module.exports = { writeJsonToFile }
