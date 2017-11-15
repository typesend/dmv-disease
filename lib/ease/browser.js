const ease = require('../ease');
const setup = require('./setup');

let browser = {};

const injection = function(frame) {
  (async () => {
    await frame.addScriptTag({'path': 'injections/disease.js'});
    await frame.addStyleTag({'path': 'injections/disease.css'});
  })();
};

browser.initBrowser = async function() {
  global.browser = await ease();
};

browser.initNewPage = async function() {
  global.page = await global.browser.newPage();
  await setup(global.page);
  global.page.on('framenavigated', injection);
};

module.exports = browser;
