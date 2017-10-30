const cleanupFiles = require('find-remove');

const setup = function(page) {
  console.log('setup');
  emulation(page);
  screenshotCleanup(page);
}

const emulation = function(page) {
  page.emulate({
    userAgent: process.env.USER_AGENT_STRING,
    viewport: { width: 1024, height: 768, deviceScaleFactor: 1}
  });
};

const screenshotCleanup = function(page) {
  console.log('cleaning up screenshots');
  cleanupFiles('screenshots', {extensions: ['.png']});
};

module.exports = setup;
