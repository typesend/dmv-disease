const extracts = require('../ease/extracts');
const { urlFor } = require('../ease/environments');

module.exports = {

  document: async function() {
    const page = global.page;
    return output = {
      breadcrumbs: await extracts.breadcrumbs(page),
      messages: await extracts.messages(page),
      form: await extracts.form(page),
      footer: await extracts.footer(page),
      activeElement: await extracts.activeElement(page),
      page: await extracts.pageDetails(page),
      screenshot: await extracts.screenshot(page)
    };
  },

  login: async function({username, password, env}) {
    const page = global.page;
    const startingURL = urlFor(env);

    console.log("LOGIN");

    await page.goto(startingURL);
    await page.waitForSelector('#password');

    let evalString = `window.disease.login('${username}','${password}')`;
    let evalResult = await page.evaluate(evalString);

    let success = !(page.url().indexOf('/pkmslogin.form') >= 0);
    if (success) {
      global.easeUser = username;
    }

    await page.waitForNavigation({waitUntil: 'networkidle'});
    return this.document();
  },

  logout: async function() {
    const page = global.page;

    // cancel any active transaction
    await page.evaluate(`document.querySelector('input[value=CANCEL]').click()`);

    // logout
    await page.evaluate(`window.disease.goto('/pkmslogout')`);

    // ensure all cookies deleted
    let cookies = await page.cookies();
    cookies = cookies.map((c) => { return {name: c.name}; });
    await page.deleteCookie(...cookies);

    // redirect to blank page
    await page.evaluate(`window.disease.blankPage()`);

    let result = {logout: true, easeUser: global.easeUser};

    global.easeUser = undefined;

    await page.waitForNavigation({waitUntil: 'load'});
    await page.evaluate(`document.title = 'EASE'`);
    return result;
  },

  screenshot: async function() {
    let result = await extracts.screenshot(page);
    return result;
  },

  typeInto: async function({selector, value}) {
    const page = global.page;
    page.waitForSelector(selector, {timeout: 20}).catch()

    await page.focus(selector);
    let oldValue = await page.evaluate((f) => {
      let it = document.querySelector(f);
      let oldValue = it.value;
      it.value = '';
      return oldValue;
    }, selector);
    await page.type(selector, value);
    return {oldValue, value, selector};
  },

  selectOption: async function({selector, value, values}) {
    const page = global.page;
    page.waitForSelector(selector, {timeout: 20}).catch()

    await page.focus(selector);
    if (values) {
      await page.select(selector, ...values);
      return {values, selector};
    } else {
      await page.select(selector, value);
      return {value, selector};
    }
  },

  submitButton: async function({value}) {
    const page = global.page;
    const selector = 'input[type=submit][value="' + value + '"].commandButton';
    page.waitForSelector(selector, {timeout: 20}).catch();

    await page.focus(selector);
    let button = await page.$(selector);
    await button.click();

    await page.waitForNavigation({waitUntil: 'load'});
    await button.dispose();
    return this.document();
  },

  click: async function({prefix, selector, selectors}) {
    const page = global.page;
    const options = {button: 'left', clickCount: 1, delay: 5};

    if (selector && selectors) {
      selectors.push(selector);
    } else if (selector && !selectors) {
      selectors = [selector];
    }
    selectors = (prefix ? selectors.map((s) => prefix + s) : selectors);

    for (selector of selectors) {
      page.waitForSelector(selector, {timeout: 20}).catch()
      await page.focus(selector);
      await page.click(selector, options);
    }

    return this.document();
  },

  selectTransaction: async function({ttc}) {
    const page = global.page;
    const selectorPrefix = '#MAIN_FORM\\:';
    const fieldSelector = selectorPrefix + 'typeTransactionCode';
    await page.waitForSelector(fieldSelector);

    await page.evaluate((f) => {
      let it = document.querySelector(f);
      it.value = '';
    }, fieldSelector);
    await page.type(fieldSelector, ttc);

    let enterButton = await page.$(selectorPrefix + 'button1');
    await enterButton.click();

    await page.waitForNavigation({waitUntil: 'load'});
    await enterButton.dispose();
    return this.document();
  },

  endpoint: async function() {
    return Promise.resolve(global.browser.wsEndpoint());
  },

  page: async function() {
    const pageDetails = await extracts.pageDetails(global.page);
    return pageDetails;
  },

  messages: async function() {
    const messages = await extracts.messages(global.page);
    return messages;
  },

  form: async function() {
    const form = await extracts.form(global.page);
    return form;
  },

  footer: async function() {
    const footer = await extracts.footer(global.page);
    return footer;
  },

  activeElement: async function() {
    const activeElement = await extracts.activeElement(global.page);
    return activeElement;
  },

  html: async function({selector}) {
    const page = global.page;
    const dataURI = function(mimeType, strValue) {
      let buffer = new Buffer(strValue);
      return [`data:${mimeType};base64`, buffer.toString('base64')].join(',');
    };

    page.waitForSelector(selector, {timeout: 20}).catch()
    let items = await page.evaluate(`window.disease.html('${selector}')`);
    let result = items.map((item) => {
      return {
        innerText: dataURI('text/plain', item.innerText),
        outerHTML: dataURI('text/html', item.outerHTML),
        selector
      };
    });

    return result;
  },

};
