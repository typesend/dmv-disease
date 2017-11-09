async function details(page) {
  let result = await page.evaluate('window.disease.pageDetails();');
  return result;
}

module.exports = details;
