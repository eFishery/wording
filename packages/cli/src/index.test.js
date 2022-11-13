const { exec } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');

const expectedData = {
  id: {
    daysAgo: 'hari yang lalu',
    heartRate: 'detak jantung',
    exercise: 'latihan',
    hello: 'halo',
    walking: 'berjalan',
    sleep: 'tidur',
    messageWarningWorkout: 'Udah jarang nih kamu lari pagi, sekarang yuk!',
  },
  en: {
    daysAgo: 'days ago',
    heartRate: 'heart rate',
    exercise: 'exercise',
    hello: 'hello',
    walking: 'walking',
    sleep: 'sleep',
    messageWarningWorkout: 'You haven’t checked out the app recently. Do some workouts.',
  },
  thai: {
    daysAgo: 'วันที่ผ่านมา',
    heartRate: 'หัวใจ',
    exercise: 'ออกกำลังกาย',
    hello: 'สวัสดี',
    walking: 'ที่เดิน',
    sleep: 'นอน',
    messageWarningWorkout: 'คุณยังไม่ได้ตรวจสอบแอปเมื่อเร็วๆ นี้ ออกกำลังกายบ้าง.',
  },
};

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
    expect(JSON.parse(readFileSync(outputFilePath, 'utf-8'))).toEqual(expectedData);
  });
});
