require('dotenv').config()

const Geppetto = require('./lib/geppetto');
let EASE = new Geppetto;

console.log("Starting...");

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    EASE.close();
    process.exit();
});

(async () => {
  await EASE.initialize(process.env.EASE_URL);
  EASE.tab.waitFor(500);

  await EASE.login(process.env.EASE_USER, process.env.EASE_PASS);
  // await EASE.modeSelection();

  EASE.close();
})();
