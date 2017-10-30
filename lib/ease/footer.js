
async function footer(page) {
  await page.waitForSelector('table#panelGrid_footer');
  let parts = await page.evaluate(() => {
    const doc = document.documentElement.cloneNode(true);
    const parts = doc.querySelectorAll('table#panelGrid_footer span.generalText');
    return [...parts].map((el) => el.innerText);
  });
  [ screenName, transactionCode, _3, _4, officeEmployee, _6, workDate,
    time, easeVersion
  ] = parts;
  return {
    screenName,
    transactionCode,
    officeEmployee,
    workDate,
    time,
    easeVersion
  };
}

module.exports = footer;
