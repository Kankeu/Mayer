webpackJsonp([9],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(23);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var ArticlesController = function () {
    function ArticlesController(request, next) {
        var _this = this;

        _classCallCheck(this, ArticlesController);

        this.request = request;
        this.next = next;
        this.state = _extends({}, Object.keys(__WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].getters).map(function (keys) {
            if (keys.split('/')[0] === "BoutiqueStore") return __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].getters[keys];
        }));
        Object.keys(this.state).map(function (key) {
            if (_this.state[key] === undefined) delete _this.state[key];
        });
    }

    _createClass(ArticlesController, [{
        key: 'index',
        value: function index() {
            console.log(__WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */], this.state);
            this.next();
        }
    }]);

    return ArticlesController;
}();

/* harmony default export */ __webpack_exports__["default"] = (ArticlesController);

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ArticlesController": 106,
	"./ArticlesController.js": 106
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 110;

/***/ })

});