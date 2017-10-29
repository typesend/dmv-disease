const puppeteer = require('puppeteer');
const headlessMode = (process.env.HEADLESS === 'true');

async function ease() {
  let browser = await puppeteer.launch({
    headless: headlessMode,
    slowMo: (headlessMode ? 0 : 10)
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
