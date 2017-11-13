var modeSelection = function () {
  let modeSelectionMutation = `
  mutation modeSelection {
    processType: selectOption(selector: "#MAIN_FORM\\:operationalMode", values: ["C"]) {
      values
      selector
    }
    workType: selectOption(selector: "#MAIN_FORM\\:functionalMode", values: ["D"]) {
      values
      selector
    }
    workDate: selectOption(selector: "#MAIN_FORM\\:workDate", values: ["01022018"]) {
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
  }
  `;
  graphql("/graphql")(modeSelectionMutation).then(function (result) {
    console.log('modeSelectionMutation', result);
    window.pageState();
  }).catch(e => {
    console.log('modeSelectionMutation ERROR', e);
  });
};