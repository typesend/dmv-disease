var Button = window.ReactBootstrap.Button;

class DiseaseApp extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>
            <img src="/images/wood_tick.png" className="dim tick"/>
            <span className="dim">Disease</span>
            <img src="/images/dmv.png" className="logo"/>
          </h1>
          <LoginWarning />
        </div>
        <div className="row">
          <LoginForm/>
        </div>
      </div>
    );
  }
}
