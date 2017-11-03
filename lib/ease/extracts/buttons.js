const _ = require('lodash');

async function buttons(page) {
  await page.waitForSelector('#panelGrid_command');
  let selector = 'input[type=submit].commandButton';

  let result = await page.$$eval(selector, buttons => {
    let buttonJSON = function(buttons) {
      return buttons.map(function (button) {
        return {
          value: button.value,
          disabled: button.disabled
        };
      });
    };
    return buttonJSON(buttons);
  });
  return result;
}

module.exports = buttons;
