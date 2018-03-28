webpackHotUpdate(2,{

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
   _inherits(Header, _Component);

   function Header() {
      _classCallCheck(this, Header);

      return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
   }

   _createClass(Header, [{
      key: "render",
      value: function render() {
         if (this.props.data) {
            var name = this.props.data.name;
            var occupation = this.props.data.occupation;
            var description = this.props.data.description;
            var city = this.props.data.address.city;
            var networks = this.props.data.social.map(function (network) {
               return _react2.default.createElement(
                  "li",
                  { key: network.name },
                  _react2.default.createElement(
                     "a",
                     { href: network.url },
                     _react2.default.createElement("i", { className: network.className })
                  )
               );
            });
         }
         return _react2.default.createElement(
            "header",
            { id: "home" },
            _react2.default.createElement(
               "nav",
               { id: "nav-wrap" },
               _react2.default.createElement(
                  "a",
                  { className: "mobile-btn", href: "#nav-wrap", title: "Show navigation" },
                  "Show navigation"
               ),
               _react2.default.createElement(
                  "a",
                  { className: "mobile-btn", href: "", title: "Hide navigation" },
                  "Hide navigation"
               ),
               _react2.default.createElement(
                  "ul",
                  { id: "nav", className: "nav" },
                  _react2.default.createElement(
                     "li",
                     { className: "current" },
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#home" },
                        "Homer"
                     )
                  ),
                  _react2.default.createElement(
                     "li",
                     null,
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#about" },
                        "About Us"
                     )
                  ),
                  _react2.default.createElement(
                     "li",
                     null,
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#resume" },
                        "Market Place"
                     )
                  ),
                  _react2.default.createElement(
                     "li",
                     null,
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#portfolio" },
                        "Works"
                     )
                  ),
                  _react2.default.createElement(
                     "li",
                     null,
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#testimonials" },
                        "Testimonials"
                     )
                  ),
                  _react2.default.createElement(
                     "li",
                     null,
                     _react2.default.createElement(
                        "a",
                        { className: "smoothscroll", href: "#contact" },
                        "Contact"
                     )
                  )
               )
            ),
            _react2.default.createElement(
               "div",
               { className: "row banner" },
               _react2.default.createElement(
                  "div",
                  { className: "banner-text" },
                  _react2.default.createElement(
                     "h1",
                     { className: "responsive-headline" },
                     " We are ",
                     name,
                     " ."
                  ),
                  _react2.default.createElement(
                     "h3",
                     null,
                     " ",
                     _react2.default.createElement(
                        "span",
                        null,
                        occupation,
                        " "
                     ),
                     " ",
                     _react2.default.createElement("br", null),
                     " ",
                     description
                  ),
                  _react2.default.createElement("hr", null),
                  _react2.default.createElement(
                     "ul",
                     { className: "social" },
                     networks
                  )
               )
            ),
            _react2.default.createElement(
               "p",
               { className: "scrolldown" },
               _react2.default.createElement(
                  "a",
                  { className: "smoothscroll", href: "#about" },
                  _react2.default.createElement("i", { className: "icon-down-circle" })
               )
            )
         );
      }
   }]);

   return Header;
}(_react.Component);

exports.default = Header;

/***/ })

})