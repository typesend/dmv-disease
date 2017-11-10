const cleanupFiles = require('find-remove');

const setup = function(page) {
  emulation(page);
  screenshotCleanup(page);
}

const emulation = function(page) {
  const ua = [process.env.USER_AGENT_STRING, 'Disease/1.0'].join(' ');
  page.emulate({
    userAgent: ua,
    viewport: { width: 1024, height: 768, deviceScaleFactor: 1}
  });
};

const screenshotCleanup = function(page) {
  cleanupFiles('screenshots', {extensions: ['.png']});
};

module.exports = setup;
