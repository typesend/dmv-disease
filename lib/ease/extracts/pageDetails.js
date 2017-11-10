async function details(page) {
  let result = await page.evaluate('window.disease.pageDetails();');
  result.version = await global.browser.version();
  return result;
}

module.exports = details;
