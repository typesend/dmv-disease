const footer = require('./extracts/footer');

const startingURL = process.env.EASE_URL;
const selectorPrefix = '#MAIN_FORM\\:';

async function login(page, username, password) {
  await fillAndSubmitForm(page, username, password);
  if (await sessionCreated(page)) {
    await modeSelection(page, {processType: 'C', workType: 'D'});
  } else {
    console.error('EASE LOGIN FAILED');
  }
}

async function fillAndSubmitForm(page, username, password) {
  await page.goto(startingURL);
  await page.waitForSelector('#password');
  let affordances = {};

  affordances.username = await page.$('#username');
  affordances.password = await page.$('#password');
  affordances.submit = await page.$('input[type=submit]');

  await affordances.username.type(username);
  await affordances.password.type(password);
  await affordances.submit.click();

  await page.waitForSelector('table#panelGrid_footer');
}

async function sessionCreated(page) {
  let url = await page.url();
  let errorCondition = (url.indexOf('/pkmslogin.form') >= 0)
  return !errorCondition;
}

async function modeSelection(page, options) {
  await page.waitForSelector(selectorPrefix + 'operationalMode');

  await page.select(selectorPrefix + 'operationalMode', options.processType);
  await page.select(selectorPrefix + 'functionalMode', options.workType);
  let enterButton = await page.$(selectorPrefix + 'button1');
  await enterButton.click();
}

module.exports = login;
