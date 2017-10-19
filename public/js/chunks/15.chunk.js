webpackJsonp([15],{

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(94)
/* template */
var __vue_template__ = __webpack_require__(95)
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


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
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

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n*[data-v-19fea62e] {\n  font-size: 16px;\n}\n.md-card .md-card-media-cover[data-v-19fea62e] {\n  position: initial;\n}\n._message[data-v-19fea62e] {\n  transform: rotate3d(0, 1, 0, 180deg);\n}\n._message .md-card-content[data-v-19fea62e] {\n  overflow-x: hidden;\n  overflow-y: auto;\n  word-wrap: break-word;\n  word-break: break-word;\n}\n.panier_loading[data-v-19fea62e] {\n  position: fixed;\n  box-sizing: border-box;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  width: 40px;\n  height: 40px;\n  padding: 10px;\n  margin-left: -20px;\n  margin-top: -20px;\n  background-color: rgba(0, 0, 0, 0.5);\n  border-radius: 40px;\n}\n.panier_loading[data-v-19fea62e]:after {\n    content: '';\n    display: block;\n    width: 20px;\n    height: 20px;\n    background-color: #fff;\n    border-radius: 20px;\n    animation: panier-loading-data-v-19fea62e 0.3s ease infinite;\n}\n@keyframes panier-loading-data-v-19fea62e {\n0% {\n    opacity: 0.5;\n    transform: scale(0.75);\n}\n50% {\n    opacity: 1;\n    transform: scale(1);\n}\n100% {\n    opacity: 0.5;\n    transform: scale(0.75);\n}\n}\n.md-card[data-v-19fea62e] {\n  overflow: hidden;\n}\n.md-title[data-v-19fea62e] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.menu[data-v-19fea62e] {\n  position: fixed;\n  right: 0px;\n  top: 30%;\n  width: 80px;\n}\n.menu ul[data-v-19fea62e] {\n  position: absolute;\n  height: 100%;\n  display: flex;\n  justify-content: space-between;\n  flex-flow: column;\n  padding: 15px;\n}\n.menu ul li label[data-v-19fea62e] {\n  transition: transform 0.3s;\n  padding: 15px;\n  border-radius: 4px;\n  background-color: rgba(255, 193, 18, 0.5);\n}\n.menu ul li label[data-v-19fea62e]:hover {\n  transform: scale(1.2);\n  background-color: #ffc112;\n}\n.rotate-in[data-v-19fea62e] {\n  transform: rotate3d(0, 1, 0, 180deg);\n  transition: transform 1s;\n}\n.card-message[data-v-19fea62e] {\n  transform: rotate3d(0, 1, 0, 180deg);\n}\n.card-message .md-card-header[data-v-19fea62e] {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n.md-card-content[data-v-19fea62e] {\n  word-wrap: break-word;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.rotate-out[data-v-19fea62e] {\n  transform: rotate3d(0, 1, 0, 0deg);\n  transition: transform 1s;\n}\n.grille[data-v-19fea62e] {\n  justify-content: space-around;\n}\n.article[data-v-19fea62e] {\n  margin-bottom: 10px;\n}\n.md-column[data-v-19fea62e] {\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 94:
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
    data: function data() {
        return {
            commandes: [],
            errors: false,
            empty: false,
            loader: false,
            user: window.user,
            commande: null,
            event: null,
            nutrition: [{
                dessert: 'Frozen yogurt',
                type: 'ice_cream',
                calories: '159',
                fat: '6.0',
                comment: 'Icy'
            }, {
                dessert: 'Ice cream sandwich',
                type: 'ice_cream',
                calories: '237',
                fat: '9.0',
                comment: 'Super Tasty'
            }, {
                dessert: 'Eclair',
                type: 'pastry',
                calories: '262',
                fat: '16.0',
                comment: ''
            }, {
                dessert: 'Cupcake',
                type: 'pastry',
                calories: '305',
                fat: '3.7',
                comment: ''
            }, {
                dessert: 'Gingerbread',
                type: 'other',
                calories: '356',
                fat: '16.0',
                comment: ''
            }]
        };
    },

    methods: {
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
        this.$commande = this.$resource('/articles/commandes{/id}');
        this.loadCommandes();
    }
});

/***/ }),

/***/ 95:
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
          _vm.empty
            ? _c("div", { staticClass: "alert alert-warning" }, [
                _c("ul", [
                  _c("li", [
                    _vm._v(" :( Votre panier est vide "),
                    _c(
                      "a",
                      { staticClass: "pull-right", attrs: { href: "" } },
                      [_vm._v("Quelques suggestions :)")]
                    )
                  ])
                ])
              ])
            : _c(
                "md-layout",
                { staticClass: "grille", attrs: { "md-gutter": "" } },
                [
                  _vm._l(_vm.commandes, function(item) {
                    return _c(
                      "md-layout",
                      {
                        key: item.id,
                        attrs: {
                          "md-flex": 30,
                          "md-column": "",
                          "md-flex-small": 100,
                          "md-flex-xsmall": 100,
                          "md-flex-medium": 30
                        }
                      },
                      [
                        item.message
                          ? _c(
                              "md-tooltip",
                              { attrs: { "md-direction": "top" } },
                              [
                                _vm._v(
                                  "Double clicquez pour retourner la carte"
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "md-card",
                          { attrs: { "md-with-hover": "" } },
                          [
                            _c(
                              "md-menu",
                              {
                                ref: "menu",
                                refInFor: true,
                                attrs: {
                                  "md-size": "4",
                                  "md-direction": "top right"
                                }
                              },
                              [
                                _c(
                                  "md-card-header",
                                  [
                                    _c(
                                      "md-card-header-text",
                                      { attrs: { "md-menu-trigger": "" } },
                                      [
                                        _c("md-avatar", [
                                          _c("img", {
                                            attrs: { src: item.user.avatar }
                                          })
                                        ]),
                                        _vm._v(" "),
                                        _c("p", { staticClass: "md-title" }, [
                                          _vm._v(_vm._s(item.article.nom))
                                        ]),
                                        _vm._v(" "),
                                        _c("p", { staticClass: "md-subhead" }, [
                                          _vm._v(_vm._s(item.article.prix))
                                        ])
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("md-menu-content", [
                                  _c(
                                    "div",
                                    { staticClass: "author-card" },
                                    [
                                      _c(
                                        "md-avatar",
                                        { staticClass: "md-large" },
                                        [
                                          _c("img", {
                                            attrs: { src: item.user.avatar }
                                          })
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "author-card-info" },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm._f("uppercase")(
                                                  item.user.name
                                                )
                                              ) +
                                                " " +
                                                _vm._s(item.user.forename)
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "author-card-links"
                                            },
                                            [
                                              _c(
                                                "a",
                                                {
                                                  attrs: {
                                                    href: "",
                                                    target: "_blank",
                                                    rel: "noopener"
                                                  }
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(item.user.email)
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                class: item.name,
                                on: {
                                  dblclick: function($event) {
                                    _vm.rotate(item)
                                  }
                                }
                              },
                              [
                                !item.textAttached
                                  ? _c(
                                      "md-card-media",
                                      _vm._l(item.article.images, function(
                                        image,
                                        n
                                      ) {
                                        return _c("img", {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: n === 0,
                                              expression: "n===0"
                                            }
                                          ],
                                          attrs: { src: image.path }
                                        })
                                      })
                                    )
                                  : _c(
                                      "div",
                                      { staticClass: "_message" },
                                      [
                                        _c("md-card-header", [
                                          _c(
                                            "div",
                                            { staticClass: "md-title" },
                                            [_vm._v("Message")]
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("md-card-content", [
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(
                                                item.message
                                                  ? item.message
                                                  : "Pas de message attaché à cette commande."
                                              ) +
                                              "\n                            "
                                          )
                                        ])
                                      ],
                                      1
                                    )
                              ],
                              1
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
                                        _vm.openDialog("delete", item, $event)
                                      }
                                    }
                                  },
                                  [_vm._v("Supprimer")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "md-button-toggle",
                                  {
                                    staticClass: "md-primary",
                                    nativeOn: {
                                      click: function($event) {
                                        _vm.confirm(item, $event)
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "md-button",
                                      { staticClass: "md-toggle" },
                                      [
                                        _vm._v("Confirmer"),
                                        item.reponse === 1
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
                        )
                      ],
                      1
                    )
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
                2
              ),
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
                    "md-button",
                    { staticClass: "md-icon-button" },
                    [_c("md-icon", [_vm._v("filter_list")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "md-button",
                    { staticClass: "md-icon-button" },
                    [_c("md-icon", [_vm._v("search")])],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "md-table",
                [
                  _c(
                    "md-table-header",
                    [
                      _c(
                        "md-table-row",
                        [
                          _c("md-table-head", [_vm._v("Articles")]),
                          _vm._v(" "),
                          _c("md-table-head", [_vm._v("Prix de vente")]),
                          _vm._v(" "),
                          _c("md-table-head", [_vm._v("Prix de d'achat")]),
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
                          _c("md-table-head", [_vm._v("Dates")])
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
                          attrs: {
                            "md-item": item,
                            "md-auto-select": "",
                            "md-selection": ""
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
                  "md-size": "5",
                  "md-total": "10",
                  "md-page": "1",
                  "md-label": "Rows",
                  "md-separator": "of",
                  "md-page-options": [5, 10, 25, 50]
                }
              })
            ],
            1
          )
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

/***/ })

});