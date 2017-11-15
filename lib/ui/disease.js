$(() => {
  setTimeout(() => {
    $('#username').val("mwbcd1");
    $('#password').val("DMVnet01");
    $('button').focus();
  }, 600);
});

const graphql = window.graphql("/graphql");

window.disease = { actions: {} };

disease.submitButton = function (button) {
  console.log('submitButton', button.value);
  const mutation = `
    mutation submitButton {
      submitButton(value: "${button.value}") {
        footer {
          screenName
          transactionCode
        }
      }
    }
  `;
  disease.easeAction(graphql(mutation));
};

disease.click = function (element) {
  console.log('click', element.id);
  const mutation = `
    mutation click {
      click(selector: "#${element.id}") {
        screenshot {
          timestamp
        }
      }
    }
  `;
  disease.easeAction(graphql(mutation));
};

disease.typeInto = function (input) {
  console.log('typeInto', input.value);
  const mutation = `
    mutation typeInto {
      typeInto(selector: "#${input.id}", value: "${input.value}") {
        value
        oldValue
      }
    }
  `;
  disease.easeAction(graphql(mutation));
};

disease.selectOption = function (select) {
  console.log('selectOption', select.value, select.id);
  const mutation = `
    mutation typeInto {
      selectOption(selector: "#${select.id}", value: "${select.value}") {
        values
        selector
      }
    }
  `;
  disease.easeAction(graphql(mutation));
};

disease.easeAction = function (mutation, mutationVars = []) {
  let promise = mutation(...mutationVars);
  $('img.logo').addClass("logo-spinning");
  promise.then(this.renderState);
  promise.catch(e => {
    console.error(e);
    $('img.logo').removeClass("logo-spinning");
  });
};

disease.renderState = function (actionResult) {
  console.log('actionResult', actionResult);
  let getUpdatedPageState = disease.pageStateQuery();
  getUpdatedPageState.then(function (pageState) {
    console.log({pageState});
    $('#ease-container').html(`
      <h2>${pageState.page.title}</h2>
      <img class="screenshot"
        src="${pageState.screenshot.src}"
        title="${pageState.screenshot.timestamp}"/>
      ${disease.renderComponentFor(pageState)}
    `);
  });
};

disease.renderComponentFor = function (pageState) {
  $('img.logo').removeClass("logo-spinning");
  const formElements = this.formElements(pageState);
  const messages = this.messages(pageState);
  return `
    <h4>${pageState.meta.screenName}</h4>
    <div class="messages">
      ${messages}
    </div>
    <form>
      ${formElements}
    </form>
  `;
};

disease.formElements = function(pageState) {
  let result = '';
  let fields = _.filter(pageState.form, el => {
    const isNamedCorrectly = !(el.name && el.name.indexOf('MAIN_FORM') == -1);
    const isNotHidden = !(el.type == 'hidden');
    const tagNameChecksOut = _.includes(['input','select','span','label'], el.tagName);
    return isNamedCorrectly && isNotHidden && tagNameChecksOut;
  });
  fields = _.groupBy(fields, 'fieldset.legend');
  console.log('fields', fields)

  _.forOwn(fields, (elements, groupName) => {
    if (groupName != 'undefined') {
      result += `<h3>${groupName}</h3>`;
    }
    for (el of elements) {
      let renderedElement;
      try {
        renderedElement = disease.renderers[el.tagName](el);
      } catch (e) {
        console.warn(e, el.tagName, el);
        renderedElement = disease.renderers['unknownElement'](el);
      }
      result += renderedElement;
    }
  });

  return `<p>${result}</p>`;
};

disease.renderers = {

  label: function (el) {
    tagToRender = `<label for="${el.for}">${el.innerText}</label>`;
    return '<br/>' + tagToRender;
  },

  input: function (el) {
    if (null == el.type) {
      el.type = 'text';
    }
    return this[el.type](el);
  },

  submit: function (el) {
    tagToRender = `<input name="${el.name}" type="button" onclick="window.disease.submitButton(this)" value="${el.value}" ${el.disabled ? 'disabled' : ''}>`;
    return '<br/>' + tagToRender;
  },

  checkbox: function (el) {
    tagToRender = `<input id="${el.id}" name="${el.name}" class="${el.class}" type="checkbox" onclick="window.disease.click(this)" value="${el.value}" ${el.checked ? 'checked' : ''} ${el.disabled ? 'disabled' : ''}>`;
    return '<br/>' + tagToRender;
  },

  text: function (el) {
    tagToRender = `<input id="${el.id}" name="${el.name}" class="${el.class}" type="text" value="${el.value}" onchange="window.disease.typeInto(this)" size="${el.size}" ${el.disabled ? 'disabled' : ''}>`;
    return '<br/>' + tagToRender;
  },

  password: function (el) {
    tagToRender = `<input id="${el.id}" name="${el.name}" class="${el.class}" type="password" value="${el.value}" onchange="window.disease.typeInto(this)" size="${el.size}" ${el.disabled ? 'disabled' : ''}>`;
    return '<br/>' + tagToRender;
  },

  select: function (el) {
    tagToRender = `<select id="${el.id}" name="${el.name}" class="${el.class}" onchange="window.disease.selectOption(this)">`;
    for (item of el.options) {
      tagToRender += `<option value="${item.value}" ${item.selected ? 'selected' : ''}>${item.innerText}</option>`;
    }
    tagToRender += `</select>`;
    return '<br/>' + tagToRender;
  },

  span: function (el) {
    return '<br/>' + `<pre>${el.innerText}</pre>`;
  },

  unknownElement: function (el) {
    return `<pre>unknownElement: ${el.type}</pre>`;
  },

};

disease.messages = function(pageState) {
  const els = _.map(pageState.messages, (m) => {
    return `
      <div class="message ${m.class}">${m.innerText}</div>
    `;
  });
  return els.join('');
};

disease.actions.login = function (username, password, env) {
  $('#login-container input').attr('disabled','disabled');
  let v = {
    "username": username,
    "password": password,
    "env": env
  };
  let m = `
    mutation login($username: String!, $password: String!, $env: Environment!) {
      login(username: $username, password: $password, env: $env) {
        footer {
          screenName
        }
        messages {
          tagName
          innerText
          class
        }
      }
    }
  `;
  let result = graphql(m, v);
  result.then(() => {
    $('#login-container').hide();
    $('#login-warning').hide();
  });
  return result;
}

disease.pageStateQuery = function() {
  let query = `query pageState {
    page {
      title
      url
    }
    screenshot {
      src: screenshot
      timestamp
    }
    meta: footer {
      screenName
      transactionCode
      office
      employee
      processType
      workType
      workDate
      time
      easeVersion
    }
    messages {
      innerText
      tagName
      class
    }
    activeElement {
      id
      name
      tagName
      type
      class
      maxlength
      size
      title
    }
    form {
      id
      name
      fieldset {
        legend
        class
        id
      }
      tagName
      type
      for
      innerText
      value
      disabled
      class
      tabindex
      maxlength
      size
      checked
      options {
        innerText
        value
        selected
      }
    }
  }`;
  return graphql.run(query);
};
