var FormGroup = window.ReactBootstrap.FormGroup;
var Button = window.ReactBootstrap.Button;
var ControlLabel = window.ReactBootstrap.ControlLabel;
var FormControl = window.ReactBootstrap.FormControl;
var HelpBlock = window.ReactBootstrap.HelpBlock;


class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <FieldGroup
            id="username"
            type="text"
            label="Username"
          />
          <FieldGroup
            id="password"
            label="Password"
            type="password"
            help="Enter your EASE username and password."
          />
          <Button type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

function FieldGroup({ id, label, help, placeholder, type }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl placeholder={placeholder} type={type} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
