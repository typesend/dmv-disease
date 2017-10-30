
async function button(page, name) {
  const selector = 'input[value="' + name.toUpperCase() + '"].commandButton';
  await page.waitForSelector(selector);

  let button = await page.$(selector);
  await button.click();

  await page.waitForNavigation({waitUntil: 'load'});
}

module.exports = button;
