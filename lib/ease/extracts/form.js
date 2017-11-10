const _ = require('lodash');

async function form(page) {
  // await page.waitForSelector('form');
  let result = await page.evaluate('window.disease.formElementsToJSON();');
  return result;
}

module.exports = form;
