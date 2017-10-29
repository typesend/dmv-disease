const cleanupFiles = require('find-remove');

const setup = function(page) {
  console.log('setup');

  console.log('  cleaning up screenshots');
  cleanupFiles('screenshots', {extensions: ['.png']});
}

module.exports = setup;
