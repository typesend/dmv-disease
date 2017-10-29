const puppeteer = require('puppeteer');
const headlessMode = (process.env.HEADLESS == 'true');

console.log('headlessMode', headlessMode);
