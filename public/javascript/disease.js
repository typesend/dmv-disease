"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = window.ReactBootstrap.Button;

var DiseaseApp = function (_React$Component) {
  _inherits(DiseaseApp, _React$Component);

  function DiseaseApp() {
    _classCallCheck(this, DiseaseApp);

    return _possibleConstructorReturn(this, (DiseaseApp.__proto__ || Object.getPrototypeOf(DiseaseApp)).apply(this, arguments));
  }

  _createClass(DiseaseApp, [{
    key: "render",
    value: function render() {
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
          "p",
          null,
          "Hello ",
          React.createElement(
            Button,
            { bsStyle: "primary", bsSize: "large" },
            this.props.name || "OK"
          )
        )
      );
    }
  }]);

  return DiseaseApp;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginWarning = function (_React$Component) {
  _inherits(LoginWarning, _React$Component);

  function LoginWarning() {
    _classCallCheck(this, LoginWarning);

    return _possibleConstructorReturn(this, (LoginWarning.__proto__ || Object.getPrototypeOf(LoginWarning)).apply(this, arguments));
  }

  _createClass(LoginWarning, [{
    key: "render",
    value: function render() {
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
  }]);

  return LoginWarning;
}(React.Component);
