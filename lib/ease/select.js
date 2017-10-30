const selectorPrefix = '#MAIN_FORM\\:';

async function selectTransaction(page, tlt) {
  console.log('select transaction', tlt);
  const field = selectorPrefix + 'typeTransactionCode';
  await page.waitForSelector(field);

  await page.evaluate((f) => {
    let it = document.querySelector(f);
    it.value = '';
  }, field);
  await page.type(field, tlt);
  let enterButton = await page.$(selectorPrefix + 'button1');
  await enterButton.click();

  await page.waitForNavigation({waitUntil: 'load'});
}

module.exports = selectTransaction;
