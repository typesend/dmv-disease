const puppeteer = require('puppeteer');
const headlessMode = (process.env.HEADLESS === 'true');

async function ease() {
  let browser = await puppeteer.launch({
    headless: headlessMode,
    slowMo: (headlessMode ? 0 : 10),
    timeout: 10000,
    handleSIGINT: false,
    ignoreHTTPSErrors: true
  });
  console.log('endpoint', browser.wsEndpoint());
  browser.exit = exit;
  return browser;
}

function exit() {
  if (!headlessMode) return;
  (async () => {
    await this.close();
  })();
}

module.exports = ease;
