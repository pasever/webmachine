webpackHotUpdate(2,{

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _About = __webpack_require__(106);

var _About2 = _interopRequireDefault(_About);

var _Contact = __webpack_require__(107);

var _Contact2 = _interopRequireDefault(_Contact);

var _Footer = __webpack_require__(108);

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = __webpack_require__(109);

var _Header2 = _interopRequireDefault(_Header);

var _Portfolio = __webpack_require__(110);

var _Portfolio2 = _interopRequireDefault(_Portfolio);

var _Market = __webpack_require__(111);

var _Market2 = _interopRequireDefault(_Market);

var _Testimonials = __webpack_require__(112);

var _Testimonials2 = _interopRequireDefault(_Testimonials);

var _reactChatWidget = __webpack_require__(113);

var _v = __webpack_require__(114);

var _v2 = _interopRequireDefault(_v);

var _mark = __webpack_require__(118);

var _mark2 = _interopRequireDefault(_mark);

var _config = __webpack_require__(33);

var _config2 = _interopRequireDefault(_config);

__webpack_require__(119);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

////////////////////////////////////////////////////////////////////////
/////////////////      homepage and chat widget       //////////////////
/////////////////    Connecting Business to CUI     ///////////////////
//////////////////////////////////////////////////////////////////////

// chatwidget elements
var apiProfile = "http://localhost:3000";
var user = "+12123334444";
var platform = "+12125557777";

var token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

// This chat widget issues and api/sms call to the server and is handled via the sms route 
// In addition, the webtoken entered here serves as the unique identifier for org auth and config process
var platformObj = _config2.default.platform();
var origin = _config2.default.origin;

var headers = {
  'Accept': 'application/json',
  'Authorization': token
};
var msgObj = {
  MessageSid: (0, _v2.default)(),
  SmsSid: (0, _v2.default)(),
  AccountSid: (0, _v2.default)(),
  MessagingServiceSid: (0, _v2.default)(),
  From: user,
  To: platform,
  Body: "",
  NumMedia: "",
  NumSegments: "",
  MediaContentType: " ",
  MediaUrl: " ",
  FromCity: "Charlotte",
  FromState: "NC",
  FromZip: "28222",
  FromCounty: "USA",
  SmsStatus: "",
  ToCity: "Charlotte",
  ToState: "NC",
  ToZip: "28222",
  ToCountry: "USA",
  AddOns: " ",
  ApiVersion: "v1",
  PostDate: Date.now(),
  ChaoticSid: (0, _v2.default)(),
  ChaoticSource: "web",
  Token: undefined
  //

};
var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleNewUserMessage = function (newMessage) {
      console.log('New message incoming! ' + newMessage);
      // validate the secret key from the array of platform configuration objects
      console.log(platformObj);
      var tokenkey = platformObj.filter(function (p) {
        return p.web == newMessage;
      });

      if (!msgObj.Token) {
        if (tokenkey.length > 0) {
          console.log("Token found");
          console.log(tokenkey);
          (0, _reactChatWidget.addResponseMessage)("Thank you!");
          (0, _reactChatWidget.addResponseMessage)("How can I help you?");
          msgObj.Token = tokenkey[0].web;
        } else {
          console.log("Token Not Found");
          console.log(tokenkey);
          (0, _reactChatWidget.addResponseMessage)("Password not valid");
          (0, _reactChatWidget.addResponseMessage)('Please try again');
          (0, _reactChatWidget.addResponseMessage)('Hint: demo');
        }
        return;
      }

      msgObj.Body = newMessage;
      fetch(apiProfile + '/api/sms', {
        method: 'POST',
        headers: _extends({}, headers, {
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(msgObj)
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        response.forEach(function (r) {
          console.log(r);
          var rKey = Object.keys(r)[0];
          if (rKey == "link") {
            (0, _reactChatWidget.addLinkSnippet)({
              title: 'You can learn more here:',
              link: r.link
            });
          } else {
            var message = r[rKey];
            (0, _reactChatWidget.addResponseMessage)(message);
          }
        });
      });
      //addResponseMessage(response.message)
      /*
      if (response.link) {
        addLinkSnippet({
          title: 'Click on the link',
          link: response.link
        })
      }
      */
    };

    _this.state = {
      portfolioData: {}
    };
    return _this;
  }

  _createClass(App, [{
    key: 'getPortfolioData',
    value: function getPortfolioData() {
      var _this2 = this;

      //Ajax request
      fetch(origin + '/web/static/portfolioData.json').then(function (r) {
        return r.json();
      }).then(function (json) {
        _this2.db = json;
        _this2.setState({ portfolioData: json });
        console.log(_this2.state.portfolioData);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getPortfolioData();
      (0, _reactChatWidget.addResponseMessage)("Let's get started! Please enter your password");
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.state.portfolioData);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'App' },
          _react2.default.createElement(_Header2.default, { data: this.state.portfolioData.main }),
          _react2.default.createElement(_About2.default, { data: this.state.portfolioData.main }),
          _react2.default.createElement(_Market2.default, { data: this.state.portfolioData.market }),
          _react2.default.createElement(_Portfolio2.default, { data: this.state.portfolioData.portfolio }),
          _react2.default.createElement(_Testimonials2.default, { data: this.state.portfolioData.testimonials }),
          _react2.default.createElement(_Contact2.default, { data: this.state.portfolioData.main }),
          _react2.default.createElement(_Footer2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'App' },
          _react2.default.createElement(_reactChatWidget.Widget, {
            handleNewUserMessage: this.handleNewUserMessage,
            profileAvatar: _mark2.default,
            title: 'Strategic Machines',
            subtitle: 'Connecting Business to the Conversational Economy'
          })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ })

})