webpackJsonp([4],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("50b63b1e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-19fea62e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Commandes.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-19fea62e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Commandes.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModalChat__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModalChat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ModalChat__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ModalChat: __WEBPACK_IMPORTED_MODULE_0__ModalChat___default.a },
    data: function data() {
        return {
            commandes: [],
            errors: false,
            empty: false,
            loader: false,
            user: window.user,
            commande: null,
            event: null,
            switcher: false
        };
    },

    methods: {
        onPagination: function onPagination(tr) {
            console.log(tr);
        },
        openModal: function openModal(item) {
            this.commande = item;
            this.switcher = !this.switcher;
        },
        loadCommandes: function loadCommandes() {
            var _this = this;

            this.loader = true;
            this.$commande.get().then(function (response) {
                response.json().then(function (data) {
                    _this.page = data.next_page_url;
                    _this.commandes = data.data;
                    console.log(_this.commandes);
                    if (_this.commandes.length === 0) {
                        _this.empty = true;
                    }
                    _this.loader = false;
                });
            });
        },
        confirm: function confirm(item, event) {
            var el = this.parentNode(event.target, "md-column");
            var data = { reponse: true, article_id: item.article.id
                //el.style.transition = "transform 1s, opacity 1s"
                //el.style.transform = "translate3d("+(window.innerWidth-el.getBoundingClientRect().left-el.getBoundingClientRect().width*0.2)+"px,"+(-el.getBoundingClientRect().top)+"px,0) scale(.2)"
                //el.style.opacity = 0
            };this.$commande.update({ id: item.id }, data).then(function (response) {
                item.reponse = 1;
            });
            //setTimeout(()=>{this.commandes.splice(this.commandes.indexOf(item),1)},900)
        },
        remove: function remove(item, event) {
            var _this2 = this;

            //this.$commande.delete({id:item.id})
            var el = this.parentNode(event.target, "md-column");
            el.style.transition = "transform 1s, opacity 1s";
            el.style.transform = "translate3d(" + -(window.innerWidth - el.getBoundingClientRect().left - el.getBoundingClientRect().width * 0.2) + "px," + -el.getBoundingClientRect().top + "px,0) scale(.2) rotate3d(0,0,1,360deg)";
            el.style.opacity = 0;
            setTimeout(function () {
                _this2.commandes.splice(_this2.commandes.indexOf(item), 1);
            }, 900);
        },
        rotate: function rotate(item) {
            if (!item.textAttached) {
                item.name = "rotate-in";
                Vue.set(item, 'textAttached', true);
            } else {
                item.name = "rotate-out";
                item.textAttached = false;
            }
        },
        openDialog: function openDialog(ref, item, event) {
            this.commande = item;
            this.event = event;
            this.$refs[ref].open();
        },
        closeDialog: function closeDialog(ref) {
            this.$refs[ref].close();
        },
        onClose: function onClose(type) {
            if (type === 'ok') {
                this.remove(this.commande, this.event);
            }
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        Echo.channel('channel-commande' + user.id).listen('CommandeEvent', function (e) {
            _this3.commandes.unshift(e.commande.commande);
        });
        this.$commande = this.$resource('/commandes{/id}');
        this.loadCommandes();
    }
});

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(106)
/* template */
var __vue_template__ = __webpack_require__(107)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-74932e9a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/compte/commandes/ModalChat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ModalChat.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74932e9a", Component.options)
  } else {
    hotAPI.reload("data-v-74932e9a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(105);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("39edae7c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74932e9a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModalChat.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74932e9a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ModalChat.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.block[data-v-74932e9a]{\n    display: block;\n}\n.absolute[data-v-74932e9a]{\n    position: absolute;\n}\n.marginL[data-v-74932e9a]{\n    margin-left: 16px;\n}\n.md-card .md-card-media-cover[data-v-74932e9a]{\n    position: initial;\n}\n.prev-v-img svg[data-v-74932e9a],\n.next-v-img svg[data-v-74932e9a] {\n    margin: 5px auto;\n}\n.prev-v-img[data-v-74932e9a],\n.next-v-img[data-v-74932e9a] {\n    color: white;\n    width: 35px;\n    height: 35px;\n    position: absolute;\n    top: 50%;\n    margin-top: -100px;\n    font-size: 15px;\n    font-family: 'Avenir', Helvetica, Arial, sans-serif;\n    text-align: center;\n    background-color: rgba(0, 0, 0, .3);\n    z-index: 10006;\n    opacity: .3;\n    -webkit-transition: opacity .3s ease-in-out;\n    transition: opacity .3s ease-in-out;\n    cursor: pointer;\n}\n.prev-v-img[data-v-74932e9a]:hover,\n.next-v-img[data-v-74932e9a]:hover {\n    opacity: 1;\n}\n.prev-v-img[data-v-74932e9a] {\n    left: 10px;\n}\n.next-v-img[data-v-74932e9a] {\n    right: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        commande: Object,
        switcher: Boolean
    },
    data: function data() {
        return {
            open: null
        };
    },

    watch: {
        switcher: function switcher(data) {
            this.$refs['commandeModal'].open();
        }
    }
});

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.open, expression: "open" }
      ]
    },
    [
      _c(
        "md-dialog",
        {
          ref: "commandeModal",
          on: {
            open: function($event) {
              _vm.open = true
            },
            close: function($event) {
              _vm.open = false
            }
          }
        },
        [
          _c(
            "md-dialog-actions",
            [
              _c(
                "md-button",
                {
                  staticClass: "md-primary",
                  on: {
                    click: function($event) {
                      _vm.$refs["commandeModal"].close()
                    }
                  }
                },
                [_vm._v("X")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.commande
            ? _c("md-dialog-title", { staticClass: "absolute" }, [
                _vm._v("Commande de "),
                _c("a", { attrs: { href: "#" } }, [
                  _vm._v(
                    _vm._s(_vm.commande.user.name) +
                      " " +
                      _vm._s(_vm.commande.user.forename)
                  )
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.commande
            ? _c(
                "md-dialog-content",
                { staticStyle: { overflow: "hidden" } },
                [
                  _c(
                    "md-layout",
                    { attrs: { "md-gutter": "" } },
                    [
                      _c(
                        "md-layout",
                        { staticClass: "block", attrs: { "md-flex": "50" } },
                        [
                          _c(
                            "md-card",
                            [
                              _c("md-card-media", [
                                _c("img", {
                                  attrs: {
                                    src: _vm.commande.article.images[0].path
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c(
                                "md-card-content",
                                { staticStyle: { height: "70px" } },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.commande.message) +
                                      "\n                "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "md-card-actions",
                                [
                                  _c(
                                    "md-button",
                                    {
                                      on: {
                                        click: function($event) {
                                          _vm.openDialog(
                                            "delete",
                                            _vm.commande,
                                            $event
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("Supprimer")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "md-button",
                                    {
                                      staticClass: "md-primary md-raised",
                                      nativeOn: {
                                        click: function($event) {
                                          _vm.confirm(_vm.commande, $event)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v("Confirmer"),
                                      _vm.commande.reponse === 1
                                        ? _c("md-icon", [_vm._v("done")])
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "md-layout",
                        { staticClass: "block", attrs: { "md-flex": "50" } },
                        [
                          _c(
                            "md-list",
                            {
                              staticClass: "custom-list md-triple-line",
                              staticStyle: {
                                "overflow-y": "auto",
                                height: "484.33px",
                                width: "100%"
                              }
                            },
                            [
                              _vm._l(5, function(n, i) {
                                return _c(
                                  "md-list-item",
                                  { key: i },
                                  [
                                    _c("md-avatar", [
                                      _c("img", {
                                        attrs: {
                                          src: _vm.user.avatar,
                                          alt: "People"
                                        }
                                      })
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "md-list-text-container" },
                                      [
                                        _c("span", [_vm._v("Vous")]),
                                        _vm._v(" "),
                                        _c("p", [
                                          _vm._v(
                                            "I'll be in your neighborhood doing errands..."
                                          )
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("md-divider", {
                                      staticClass: "md-inset"
                                    })
                                  ],
                                  1
                                )
                              }),
                              _vm._v(" "),
                              _vm._l(5, function(n, i) {
                                return _c(
                                  "md-list-item",
                                  { key: i },
                                  [
                                    _c("md-avatar", [
                                      _c("img", {
                                        attrs: {
                                          src: _vm.commande.user.avatar,
                                          alt: "People"
                                        }
                                      })
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "md-list-text-container" },
                                      [
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.commande.user.name) +
                                              " " +
                                              _vm._s(_vm.commande.user.forename)
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("p", [
                                          _vm._v(
                                            "Wish I could come, but I'm out of town ..."
                                          )
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("md-divider", {
                                      staticClass: "md-inset"
                                    })
                                  ],
                                  1
                                )
                              })
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "md-input-container",
                            { staticClass: "marginL" },
                            [
                              _c("label", [_vm._v("Message")]),
                              _vm._v(" "),
                              _c("md-textarea")
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("span", { staticClass: "prev-v-img" }, [
        _c(
          "svg",
          { attrs: { width: "25", height: "25", viewBox: "0 0 1792 1915" } },
          [
            _c("path", {
              attrs: {
                d:
                  "M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z",
                fill: "#fff"
              }
            })
          ]
        )
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "next-v-img" }, [
        _c(
          "svg",
          { attrs: { width: "25", height: "25", viewBox: "0 0 1792 1915" } },
          [
            _c("path", {
              attrs: {
                d:
                  "M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z",
                fill: "#fff"
              }
            })
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74932e9a", module.exports)
  }
}

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "md-layout",
    { attrs: { "md-gutter": "" } },
    [
      _c("md-layout", { attrs: { "md-flex": 15, "md-column": "" } }),
      _vm._v(" "),
      _c(
        "md-layout",
        {
          attrs: {
            "md-column": "",
            "md-flex-small": "100",
            "md-flex-xsmall": "100",
            "md-flex-medium": 100
          }
        },
        [
          _vm.loader ? _c("div", { staticClass: "panier_loading" }) : _vm._e(),
          _vm._v(" "),
          _c(
            "md-table-card",
            [
              _c(
                "md-toolbar",
                [
                  _c("h1", { staticClass: "md-title" }, [
                    _vm._v("Commandes reçues")
                  ]),
                  _vm._v(" "),
                  _c(
                    "md-menu",
                    [
                      _c(
                        "md-button",
                        {
                          staticClass: "md-icon-button",
                          attrs: { "md-menu-trigger": "" }
                        },
                        [_c("md-icon", [_vm._v("filter_list")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "md-menu-content",
                        [
                          _c("md-menu-item", [_vm._v("supprimer tous")]),
                          _vm._v(" "),
                          _c("md-menu-item", [_vm._v("ranger par")])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "md-table-alternate-header",
                { attrs: { "md-selected-label": "selected" } },
                [
                  _c(
                    "md-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.openDialog("delete", _vm.item, $event)
                        }
                      }
                    },
                    [
                      _vm._v("\n                Supprimer\n                "),
                      _c("md-icon", [_vm._v("delete")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("md-button", { staticClass: "md-raised md-primary" }, [
                    _vm._v("Confirmer")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "md-table",
                { attrs: { "md-sort": "date", "md-sort-type": "desc" } },
                [
                  _c(
                    "md-table-header",
                    [
                      _c(
                        "md-table-row",
                        [
                          _c("md-table-head", [_vm._v("Articles")]),
                          _vm._v(" "),
                          _c(
                            "md-table-head",
                            { attrs: { "md-sort-by": "vente" } },
                            [_vm._v("Prix de ventes")]
                          ),
                          _vm._v(" "),
                          _c(
                            "md-table-head",
                            { attrs: { "md-sort-by": "achat" } },
                            [_vm._v("Prix de d'achats")]
                          ),
                          _vm._v(" "),
                          _c(
                            "md-table-head",
                            [
                              _c("md-icon", [_vm._v("message")]),
                              _vm._v(" "),
                              _c("span", [_vm._v("Messages")])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "md-table-head",
                            { attrs: { "md-sort-by": "date" } },
                            [_vm._v("Dates")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "md-table-body",
                    _vm._l(_vm.commandes, function(item) {
                      return _c(
                        "md-table-row",
                        {
                          key: item.id,
                          staticStyle: { cursor: "pointer" },
                          attrs: { "md-item": item, "md-selection": "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.openModal(item)
                            }
                          }
                        },
                        [
                          _c("md-table-cell", [
                            _vm._v(_vm._s(item.article.nom))
                          ]),
                          _vm._v(" "),
                          _c("md-table-cell", [
                            _vm._v(_vm._s(item.article.prix))
                          ]),
                          _vm._v(" "),
                          _c("md-table-cell", [
                            _vm._v(_vm._s(item.article.prix))
                          ]),
                          _vm._v(" "),
                          _c("md-table-cell", [_vm._v(_vm._s(item.message))]),
                          _vm._v(" "),
                          _c(
                            "md-table-cell",
                            {
                              directives: [
                                {
                                  name: "observable",
                                  rawName: "v-observable.params",
                                  value: {
                                    callback: _vm.timerRelatif,
                                    data: item
                                  },
                                  expression:
                                    "{callback:timerRelatif,data:item}",
                                  modifiers: { params: true }
                                }
                              ]
                            },
                            [_vm._v(_vm._s(item.created_at))]
                          )
                        ],
                        1
                      )
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("md-table-pagination", {
                attrs: {
                  "md-size": "3",
                  "md-total": "12",
                  "md-page": "4",
                  "md-label": "Lignes",
                  "md-separator": "sur",
                  "md-page-options": [12, 9, 6, 3]
                },
                on: { pagination: _vm.onPagination }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("modal-chat", {
            attrs: { commande: _vm.commande, switcher: _vm.switcher }
          }),
          _vm._v(" "),
          _c("md-dialog-confirm", {
            ref: "delete",
            attrs: {
              "md-title": "Suppression",
              "md-content-html":
                "Etes vous sur de bien vouloir supprimer cette commande?",
              "md-ok-text": "confirmer",
              "md-cancel-text": "annuler"
            },
            on: { close: _vm.onClose }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("md-layout", { attrs: { "md-flex": 15, "md-column": "" } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19fea62e", module.exports)
  }
}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(100)
}
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(102)
/* template */
var __vue_template__ = __webpack_require__(108)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-19fea62e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/compte/commandes/Commandes.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Commandes.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19fea62e", Component.options)
  } else {
    hotAPI.reload("data-v-19fea62e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});