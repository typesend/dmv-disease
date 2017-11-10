const _ = require('lodash');

async function breadcrumbs(page) {
  // await page.waitForSelector('ul.tabNavigation.generalText');
  let selector = 'ul.tabNavigation.generalText > li';

  let result = await page.$$eval(selector, items => {
    let breadcrumbJSON = function(items) {
      return items.map(function (item) {
        const validItem = (item.innerText !== '' && item.innerText !== '>>');
        if (validItem) {
          return {
            class: item.className,
            innerText: item.innerText
          };
        }
      });
    };
    return breadcrumbJSON(items);
  });
  return _.filter(result, item => item !== null);
}

module.exports = breadcrumbs;
