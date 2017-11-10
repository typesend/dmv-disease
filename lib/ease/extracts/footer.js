
async function footer(page) {
  // await page.waitForSelector('table#panelGrid_footer');
  let parts = await page.evaluate(() => {
    const doc = document.documentElement.cloneNode(true);
    const parts = doc.querySelectorAll('table#panelGrid_footer span.generalText');
    return [...parts].map((el) => el.innerText);
  });
  [ screenName, transactionCode, _3, mode, officeEmployee, _6, workDate,
    time, easeVersion
  ] = parts;
  return {
    screenName,
    transactionCode,
    office: officeEmployee ? officeEmployee.slice(0, -2) : undefined,
    employee: officeEmployee ? officeEmployee.slice(-2) : undefined,
    processType: mode ? mode[0] : undefined,
    workType: mode ? mode[1] : undefined,
    workDate,
    time,
    easeVersion
  };
}

module.exports = footer;
