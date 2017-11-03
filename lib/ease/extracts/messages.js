const _ = require('lodash');

async function messages(page) {
  await page.waitForSelector('form');
  let result = await page.evaluate('window.disease.messages();');
  return result;
}

module.exports = messages;
