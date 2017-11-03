const extracts = require('./extracts');

const logJSON = (async (page) => {
  let output = {
    buttons: await extracts.buttons(page),
    footer: await extracts.footer(page)
  };
  console.log('output', output);
  return output;
});

module.exports = logJSON;
