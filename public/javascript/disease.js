var Button = window.ReactBootstrap.Button;

class DiseaseApp extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "h1",
          null,
          React.createElement("img", { src: "/images/wood_tick.png", className: "dim tick" }),
          React.createElement(
            "span",
            { className: "dim" },
            "Disease"
          ),
          React.createElement("img", { src: "/images/dmv.png", className: "logo" })
        ),
        React.createElement(LoginWarning, null)
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(LoginForm, null)
      )
    );
  }
}
var FormGroup = window.ReactBootstrap.FormGroup;
var Button = window.ReactBootstrap.Button;
var ControlLabel = window.ReactBootstrap.ControlLabel;
var FormControl = window.ReactBootstrap.FormControl;
var HelpBlock = window.ReactBootstrap.HelpBlock;

class LoginForm extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        null,
        React.createElement(FieldGroup, {
          id: "username",
          type: "text",
          label: "Username"
        }),
        React.createElement(FieldGroup, {
          id: "password",
          label: "Password",
          type: "password",
          help: "Enter your EASE username and password."
        }),
        React.createElement(
          Button,
          { type: "submit" },
          "Login"
        )
      )
    );
  }
}

function FieldGroup({ id, label, help, placeholder, type }) {
  return React.createElement(
    FormGroup,
    { controlId: id },
    React.createElement(
      ControlLabel,
      null,
      label
    ),
    React.createElement(FormControl, { placeholder: placeholder, type: type }),
    help && React.createElement(
      HelpBlock,
      null,
      help
    )
  );
}
class LoginWarning extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "alert alert-danger", role: "alert" },
      React.createElement(
        "center",
        null,
        "WARNING!",
        React.createElement("br", null),
        "UNAUTHORIZED ACCESS OR MISUSE OF DATA MAY",
        React.createElement("br", null),
        "RESULT IN SERIOUS ILLNESS AND/OR CRIMINAL PROSECUTION.",
        React.createElement("br", null),
        "ALL ACTIVITY IS SUBJECT TO MONITORING."
      )
    );
  }
}
