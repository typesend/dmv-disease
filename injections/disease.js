console.log('DISEASE HAS BEEN INJECTED', window.name)

const blacklistedAttrs = [
  'onfocus', 'onblur', 'onkeydown',
  'onkeypress', 'onkeyup', 'onchange'
];

window.disease = disease = {};

disease.goto = function(relativeURL) {
  let {href} = new URL(relativeURL, document.baseURI);
  return window.location = href;
};

disease.blankPage = function() {
  window.location = 'about:blank';
};

disease.login = function(username, password) {
  let u = document.querySelector('#username').value = username;
  let p = document.querySelector('#password').value = password;
  document.querySelector('input[type=submit]').click();
  return {username: u, password: p};
};

disease.activeElement = function() {
  let el = document.activeElement;
  let elementJSON = { tagName: el.tagName.toLowerCase() };
  el.getAttributeNames().forEach(attr => {
    if (blacklistedAttrs.includes(attr)) return;
    elementJSON[attr] = el.getAttribute(attr);
  });
  return elementJSON;
};

disease.html = function(selector) {
  const elements = Array.prototype.slice.call(document.querySelectorAll(selector));
  return elements.map((el) => {
    let outerHTML = el.outerHTML;
    let innerText = el.innerText;
    return {selector, outerHTML, innerText};
  });
};

disease.messages = function() {
  let selectors = [
    'div#messages > ol.errorMessagesOl > li',
    'span.uiErrorInfoMessageForModeSelection',
    '#MAIN_FORM\\:panelGrid_recordConditions li.recordConditions',
    'input[value="easeSessionExpire"] ~ span.generalText'
  ];
  let elements = document.querySelectorAll(selectors.join(', '));
  let results = [...elements].map(el => {
    let elementJSON = { tagName: el.tagName.toLowerCase() };
    el.getAttributeNames().forEach(attr => {
      elementJSON[attr] = el.getAttribute(attr);
    });
    elementJSON.innerText = el.innerText;
    return elementJSON;
  });
  return results;
};

disease.formElementsToJSON = function() {
  if (!document.forms[0]) return null;

  let elements = document.forms[0].querySelectorAll('input, select, label, span.suggest-hidden');
  let results = [...elements].map(el => {
    let elementJSON = { tagName: el.tagName.toLowerCase() };

    el.getAttributeNames().forEach(attr => {
      if (blacklistedAttrs.includes(attr)) return;
      elementJSON[attr] = el.getAttribute(attr);
    });

    if ('label' === elementJSON.tagName) {
      elementJSON.innerText = el.innerText;
    }

    if ('select' === elementJSON.tagName) {
      elementJSON.disabled = el.disabled;
      elementJSON.options = [...el.options].map(option => {
        const innerText = option.innerText;
        const value = option.value;
        const selected = option.selected;
        return {innerText, value, selected};
      });
    }

    if ('checkbox' === el.type) {
      elementJSON.checked = el.checked;
      elementJSON.disabled = el.disabled;
    }

    if ('submit' === el.type) {
      elementJSON.value = el.value;
      elementJSON.disabled = el.disabled;
    }

    if ('input' === el.type) {
      elementJSON.disabled = el.disabled;
    }

    if ('span' === elementJSON.tagName) {
      elementJSON.innerText = el.innerText;
    }

    let closestFieldset = el.closest('fieldset');
    if (closestFieldset) {
      elementJSON.fieldset = {
        id: closestFieldset.id,
        class: closestFieldset.className,
        legend: closestFieldset.querySelector('legend').innerText
      };
    }

    return elementJSON;
  });
  return results;
};
