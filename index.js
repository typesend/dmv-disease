require('dotenv').config();

const ease = require('./lib/ease');
const setup = require('./lib/ease/setup');
const login = require('./lib/ease/login');
const selectTransaction = require('./lib/ease/select');
const footer = require('./lib/ease/footer');

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
  console.log('injection ->', frame.name(), frame.url());
  (async () => {
    await frame.addScriptTag({'path': 'injections/disease.js'});
    await frame.addStyleTag({'path': 'injections/disease.css'});
  })();
}

(async () => {
  const browser = await ease();
  const page = await browser.newPage();
  page.on('framenavigated', injection);

  await setup(page);
  await login(page, process.env.EASE_USER, process.env.EASE_PASS);

  const tcode = 'DLA';
  await selectTransaction(page, tcode);
  console.log(await footer(page))

  await page.waitFor(1000);
  await browser.exit();
})();
