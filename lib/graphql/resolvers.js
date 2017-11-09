const GraphQLJSON = require('graphql-type-json');
const extracts = require('../ease/extracts');

module.exports = {

  JSON: GraphQLJSON,

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

  screenshot: async function() {
    let result = await extracts.screenshot(page);
    return result;
  },

  typeInto: async function({selector, value}) {
    const page = global.page;
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
    await page.waitForSelector(selector);

    if (values) {
      await page.select(selector, ...values);
      return {values, selector};
    } else {
      await page.select(selector, value);
      return {value, selector};
    }
  },

  submit: async function({value}) {
    const page = global.page;
    const selector = 'input[type=submit][value="' + value + '"].commandButton';
    await page.waitForSelector(selector);

    let button = await page.$(selector);
    await button.click();

    await page.waitForNavigation({waitUntil: 'load'});
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
    return this.document();
  },

  endpoint: function() {
    return global.browser.wsEndpoint();
  },

};
