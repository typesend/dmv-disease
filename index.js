require('dotenv').config();

const ease = require('./lib/ease');
const setup = require('./lib/ease/setup');
const login = require('./lib/ease/login');

process.on('SIGINT', function() {
  (async () => {
    await browser.close();
  })();
  process.exit();
});

(async () => {
  const browser = await ease();
  const page = await browser.newPage();

  await setup(page);
  await login(page, process.env.EASE_USER, process.env.EASE_PASS);

  await page.waitFor(1000);
  await browser.exit();
})();
