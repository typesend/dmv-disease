const ease = require('../ease');
const setup = require('./setup');

let browser = {};

const injection = function(frame) {
  (async () => {
    await frame.addScriptTag({'path': 'injections/disease.js'});
    await frame.addStyleTag({'path': 'injections/disease.css'});
  })();
};

browser.initBrowser = async function(scope) {
  (async (the) => {
    the.browser = await ease();
    the.page = await the.browser.newPage();
    await setup(the.page);
    the.page.on('framenavigated', injection);
  })(scope);
  return scope.browser;
};

module.exports = browser;
