/* this script is injected into Firefox pages */

console.log('DISEASE HAS BEEN INJECTED', window.name)

window.disease = disease = {};

disease.formElementsToJSON = function() {
  let elements = document.forms[0].querySelectorAll('input, select, label, span.suggest-hidden');
  let results = [...elements].map(el => {
    let elementJSON = { tagName: el.tagName.toLowerCase() };

    el.getAttributeNames().forEach(attr => {
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
  console.log('formElementsToJSON', results);
  return results;
}
