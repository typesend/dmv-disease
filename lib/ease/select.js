const selectorPrefix = '#MAIN_FORM\\:';

async function selectTransaction(page, tlt) {
  const field = selectorPrefix + 'typeTransactionCode';
  await page.waitForSelector(field);

  await page.type(field, tlt);
  let enterButton = await page.$(selectorPrefix + 'button1');
  await enterButton.click();

  await page.waitForNavigation({waitUntil: 'load'});
}

module.exports = selectTransaction;
