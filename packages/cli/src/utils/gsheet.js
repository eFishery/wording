const axios = require('axios')

const getCSV = async (id) => {
  try {
    const res = await axios.get(`https://docs.google.com/spreadsheets/u/1/d/${id}/export?format=csv`)
    return res.data
  } catch (error) {
    throw new Error(`Failed to get data from spreadsheet with id: "${id}"`)
  }
}

const csvToJson = (csv = '') => {
  const commaRegex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g
  const quotesRegex = /^"(.*)"$/g
  const rows = csv?.split('\r\n') || []
  const keys = rows?.[0]?.split(commaRegex).map((h) => h.replace(quotesRegex, '$1')) || []
  const arr = []
  for (const row of rows.slice(1)) {
    const obj = {}
    const cols = row?.split(commaRegex).map((h) => h.replace(quotesRegex, '$1')) || []
    for (const [i, key] of keys.entries()) {
      obj[key] = cols[i]
    }
    arr.push(obj)
  }
  return arr
}

const getJsonI18nFromSheet = async (id) => {
  const csv = await getCSV(id)
  const json = csvToJson(csv)
  const data = {}

  const keys = Object.keys(json?.[0] || {}) || []
  for (const lang of keys.slice(1)) {
    const tmp = {}
    for (const obj of json) {
      tmp[obj[keys[0]]] = obj[lang]
    }
    data[lang] = tmp
  }
  return data
}

module.exports = { getJsonI18nFromSheet }
