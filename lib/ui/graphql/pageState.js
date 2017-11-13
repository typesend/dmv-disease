var pageState = function() {
  let pageStateQuery = `query pageState {
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
  graphql("/graphql").run(pageStateQuery).then(function (result) {
    renderComponentFor(result);
  });
}
