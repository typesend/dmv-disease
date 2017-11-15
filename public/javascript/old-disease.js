
const graphql = window.graphql("/graphql");

$(() => {
  setTimeout(() => {
    $('#username').val("mwbcd1");
    $('#password').val("DMVnet01");
    $('button').focus();
  }, 1500);
});

window.disease = {};
window.disease.actions = {};

disease.easeAction = function (mutation, mutationVars = []) {
  let promise = mutation(...mutationVars);
  $('img.logo').addClass("logo-spinning");
  promise.then(this.renderState);
  promise.catch(e => console.log(e));
};

disease.renderState = function (actionResult) {
  console.log(actionResult);
  let getUpdatedPageState = disease.pageStateQuery();
  getUpdatedPageState.then(function (pageState) {
    console.log('pageState', pageState);
    $('#container').append(`
      <div class="component">
        <div class="strike">
          <span>${pageState.page.title}</span>
        </div>
        <img class="screenshot"
          src="${pageState.screenshot.src}"
          title="${pageState.screenshot.timestamp}"/>
        ${disease.renderComponentFor(pageState)}
      </div>
    `);
  });
};

disease.pageStateQuery = function () {
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

disease.actions.login = function (username, password, env) {
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
  return graphql(m, v);
};

disease.actions.modeSelection = function (processType = "C", workType = "D", workDate = "11152017") {
  let v = {
    "processType": processType,
    "workType": workType,
    "workDate": workDate
  };
  let m = `
  mutation modeSelection($processType: String!, $workType: String!, $workDate: String!) {
    processType: selectOption(selector: "#MAIN_FORM:operationalMode", value: $processType) {
      values
      selector
    }
    workType: selectOption(selector: "#MAIN_FORM:functionalMode", value: $workType) {
      values
      selector
    }
    workDate: selectOption(selector: "#MAIN_FORM:workDate", value: $workDate) {
      values
      selector
    }
    firstSubmit: submitButton(value: "ENTER") {
      footer {
        screenName
        transactionCode
        easeVersion
      }
      messages {
        tagName
        innerText
        class
      }
    }
    secondSubmitToBypassWorkDateWarning: submitButton(value: "ENTER") {
      footer {
        screenName
        transactionCode
        easeVersion
      }
      messages {
        tagName
        innerText
        class
      }
    }
  }`;
  return graphql(m, v);
};

disease.actions.selectTransaction = function (ttc) {
  let v = { "ttc": ttc };
  let m = `
  mutation selectTransaction($ttc: String!) {
    selectTransaction(ttc: $ttc) {
      meta: footer {
        screenName
        transactionCode
        easeVersion
      }
    }
  }`;
  return graphql(m, v);
};

disease.renderComponentFor = function (pageState) {
  $('img.logo').removeClass("logo-spinning");
  const formElements = this.formElements(pageState);
  const messages = this.messages(pageState);
  return `
    <h2>${pageState.meta.screenName}</h2>
    <div class="messages">${messages}</div>
    <form>
      ${formElements}
    </form>
  `;
};

disease.formElements = function (pageState) {
  let results = _.reduce(pageState.form, (formElements, el) => {
    if (el.name && el.name.indexOf('MAIN_FORM') == -1) return formElements;
    if (el.type == 'hidden') return formElements;

    if (_.includes(['input', 'select'], el.tagName)) {
      let tagToRender;
      if (el.tagName == 'input') {
        tagToRender = `<input name="${el.name}" type="${el.type}" value="${el.value}" size="${el.size}" ${el.disabled == 'true' ? 'disabled=disabled' : ''}>`;
      }
      if (el.tagName == 'select') {
        tagToRender = `<select name="${el.name}">`;
        for (item of el.options) {
          tagToRender += `<option value="${item.value}" ${item.selected ? 'selected' : ''}>${item.innerText}</option>`;
        }
        tagToRender += `</select>`;
      }
      formElements.push(tagToRender);
    }

    return formElements;
  }, []);
  return `<p>${results.join('')}</p>`;
};

disease.messages = function (pageState) {
  const els = _.map(pageState.messages, m => {
    if (m.innerText == '' || !!m.innerText) return '';
    return `
      <span class="message ${m.class}">${m.innerText}</span>
    `;
  });
  return els.join('');
};