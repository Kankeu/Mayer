webpackJsonp([10],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticlesController = function ArticlesController(request, next) {
    _classCallCheck(this, ArticlesController);

    console.log(request);
    next();
};

/* harmony default export */ __webpack_exports__["default"] = (ArticlesController);

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./controllers/ArticlesController": 106,
	"./controllers/ArticlesController.js": 106
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
webpackContext.id = 109;

/***/ })

});