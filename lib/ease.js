const puppeteer = require('puppeteer');
const headlessMode = (process.env.HEADLESS === 'true');

async function ease() {
  let browser = await puppeteer.launch({
    headless: headlessMode,
    slowMo: (headlessMode ? undefined : 10),
    timeout: 10000,
    handleSIGINT: false,
    ignoreHTTPSErrors: true,
    args: [
      '--remote-debugging-address=0.0.0.0',
      '--remote-debugging-port=' + (+process.env.PORT - 1),
      '--disable-infobars',
      '--no-startup-window',
    ]
  });
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
