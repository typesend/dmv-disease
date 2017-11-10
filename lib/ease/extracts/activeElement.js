async function focused(page) {
  // await page.waitForSelector('form');
  let result = await page.evaluate('window.disease.activeElement();');
  return result;
}

module.exports = focused;
