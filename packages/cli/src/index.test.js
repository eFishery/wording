const { exec } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

describe('Generate i18n json Test', () => {
  const execAsync = async (cmd) => {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) return reject(stderr);
        return resolve(stdout);
      });
    });
  };

  beforeEach(() => {
    jest.setTimeout(60000);
  });

  test('should generate json', async () => {
    const id = `12kxsNITg_kHRCs7DUYUOqzj-tXzdO3r0nGUYMHvAQlo`;
    const indexFilePath = path.join(__dirname, 'index.js');
    const outputFilename = 'test-data.json';
    const outputFilePath = path.join(__dirname, '..', outputFilename);
    await execAsync(`node ${indexFilePath} pull --spreadsheet-id ${id} --out ${outputFilename}`);
    expect(existsSync(outputFilePath)).toEqual(true);
  });
});
