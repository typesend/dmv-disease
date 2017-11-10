async function details(page) {
  return {
    url: await page.evaluate('document.URL'),
    title: await page.evaluate('document.title'),
    version: await global.browser.version()
  };
}

module.exports = details;
