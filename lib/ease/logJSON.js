const extracts = require('./extracts');

const logJSON = (async (page) => {
  let output = {
    breadcrumbs: await extracts.breadcrumbs(page),
    messages: await extracts.messages(page),
    form: await extracts.form(page),
    footer: await extracts.footer(page),
    activeElement: await extracts.activeElement(page),
    page: await extracts.pageDetails(page),
    screenshot: await extracts.screenshot(page)
  };
  console.log('output', output);
  return output;
});

module.exports = logJSON;
