require('dotenv').config();

const ease = require('./lib/ease');
const setup = require('./lib/ease/setup');
const login = require('./lib/ease/login');
const selectTransaction = require('./lib/ease/select');
const footer = require('./lib/ease/extracts/footer');
const button = require('./lib/ease/button');
const extracts = require('./lib/ease/extracts');
const logJSON = require('./lib/ease/logJSON')

process.on('SIGINT', function() {
  (async () => {
    await browser.close();
  })();
  process.exit();
});

process.on('unhandledRejection', error => {
  console.log('💥 Promise Rejection', error);
});

function injection(frame) {
  (async () => {
    await frame.addScriptTag({'path': 'injections/disease.js'});
    await frame.addStyleTag({'path': 'injections/disease.css'});
  })();
}

(async () => {
  const browser = await ease();
  const page = await browser.newPage();

  await setup(page);
  await login(page, process.env.EASE_USER, process.env.EASE_PASS);

  page.on('framenavigated', injection);
  // page.on('load', () => { takeScreenshot(page) });
  page.on('load', () => { logJSON(page) });

  //await page.waitFor(1000);
  //await browser.exit();
})();

// async function everyFirstPage(page) {
//   const transactions = `SPC SPD SPO SPR SRX CDA DIR DAF
//     04M 06M 07M 12M 13M 14M 20M 92M 98M 05M 22M 30U 38U 60U 69U 70U
//     FCP PRF 07Q OLI 10Q`.toUpperCase().split(/\s+/);
//   console.log('testing', transactions.length, 'transactions...');
//   for (let tcode of transactions) {
//     await selectTransaction(page, tcode);
//     console.log(await footer(page))
//     await button(page, 'cancel');
//   }
// }
//
// function takeScreenshot(page) {
//   let timestamp = +new Date();
//   let path = 'screenshots/' + timestamp + '.png';
//   (async () => {
//     await page.screenshot({path});
//     console.log(path);
//   })();
// }
