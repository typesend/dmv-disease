const puppeteer = require('puppeteer');
const headlessMode = (process.env.HEADLESS === 'true');

async function ease() {
  let browser = await puppeteer.launch({
    headless: headlessMode,
    slowMo: (headlessMode ? 0 : 10)
  });
  return browser;
}

module.exports = ease;
