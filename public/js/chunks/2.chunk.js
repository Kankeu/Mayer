webpackJsonp([2],{

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ArticlesController": 72,
	"./ArticlesController.js": 72,
	"./CommandesController": 73,
	"./CommandesController.js": 73,
	"./CommentsController": 74,
	"./CommentsController.js": 74,
	"./DimensionsController": 75,
	"./DimensionsController.js": 75,
	"./LikesController": 76,
	"./LikesController.js": 76,
	"./PanierController": 77,
	"./PanierController.js": 77,
	"./UserArticlesController": 78,
	"./UserArticlesController.js": 78
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
webpackContext.id = 47;

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_MagazinStore__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_PanierMutations__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_CommentaireMutations__ = __webpack_require__(82);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }






var state = {
    articles: [],
    commentaires: [],
    paniers: [],
    commandes: []
};

var mutations = _extends({
    ADD_ARTICLES: function ADD_ARTICLES(state, articles) {
        var _state$articles;

        (_state$articles = state.articles).push.apply(_state$articles, _toConsumableArray(articles));
    },
    LIKE: function LIKE(state, _ref) {
        var id = _ref.id,
            type = _ref.type;

        var items = [];
        if (type === "article") items.push(state.articles.find(function (article) {
            return article.id === id;
        }));
        if (type === "commentaire") items.push(state.commentaires.find(function (commentaire) {
            return commentaire.id === id;
        }));
        if (!items[0]) items = state.commentaires.map(function (commentaire) {
            var reponse = commentaire.reponses.find(function (reponse) {
                return reponse.id === id;
            });if (reponse) return reponse;
        });
        if (!items[0] || items[0].parent_id) {
            var result = state.commentaires.find(function (commentaire) {
                return commentaire.previewsreponse && commentaire.previewsreponse.id === id;
            });
            if (result) items.push(result.previewsreponse);
        }
        items.map(function (item) {
            if (item) {
                if (item.liked === 1) {
                    item.liked = 0;item.likes_count--;return true;
                }
                if (item.liked === 0) {
                    item.liked = 1;item.likes_count++;return true;
                }
            }
        });
    },
    ADD_DIMENSION: function ADD_DIMENSION(state, _ref2) {
        var article_id = _ref2.article_id,
            dimension = _ref2.dimension;

        var article = state.articles.find(function (article) {
            return article.id === article_id;
        });
        article.dimension = dimension;
    }
}, __WEBPACK_IMPORTED_MODULE_3__modules_CommentaireMutations__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__modules_PanierMutations__["a" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].Store({
    state: state,
    mutations: mutations,
    strict: true,
    modules: {
        MagazinStore: __WEBPACK_IMPORTED_MODULE_1__modules_MagazinStore__["a" /* default */]
    }
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v2.4.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

function assertRawModule (path, rawModule) {
  ['getters', 'actions', 'mutations'].forEach(function (key) {
    if (!rawModule[key]) { return }

    forEachValue(rawModule[key], function (value, type) {
      assert(
        typeof value === 'function',
        makeAssertionMessage(path, key, type, value)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value) {
  var buf = key + " should be function but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";

  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state();
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.4.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var status = [];

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        this.state = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.articles;
    }

    _createClass(Model, [{
        key: "getAllArticles",
        value: function getAllArticles(order) {
            if (!order) return this.state;
            var articles = _.cloneDeep(this.state);
            if (order === "desc") return articles.sort(function (a, b) {
                return b.id - a.id;
            });
            if (order === "asc") return articles.sort(function (a, b) {
                return a.id - b.id;
            });
        }
    }, {
        key: "saveArticles",
        value: function saveArticles(articles) {
            __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_ARTICLES', articles);
        }
    }, {
        key: "getMoreArticles",
        value: function getMoreArticles(id) {
            return this.state.filter(function (article) {
                return article.id < id;
            });
        }
    }]);

    return Model;
}();

var ArticlesController = function (_Model) {
    _inherits(ArticlesController, _Model);

    function ArticlesController(request, next) {
        _classCallCheck(this, ArticlesController);

        var _this = _possibleConstructorReturn(this, (ArticlesController.__proto__ || Object.getPrototypeOf(ArticlesController)).call(this));

        _this.request = request;
        _this.next = next;
        return _this;
    }

    _createClass(ArticlesController, [{
        key: "index",
        value: function index() {
            var _this2 = this;

            if (this.getAllArticles().length === 0) {
                this.next(function (response) {
                    if (response.body && response.body.length > 0) _this2.saveArticles(response.body);
                });
                return true;
            }
            this.next(this.request.respondWith(this.getAllArticles("desc"), {
                status: 200,
                statusText: "Already have"
            }));
        }
    }, {
        key: "store",
        value: function store() {}
    }, {
        key: "show",
        value: function show(id) {
            this.next();
        }
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "destroy",
        value: function destroy(id) {}
    }]);

    return ArticlesController;
}(Model);

/* harmony default export */ __webpack_exports__["default"] = (ArticlesController);

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        this.state = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.commandes;
    }

    _createClass(Model, [{
        key: "getCommandes",
        value: function getCommandes() {
            return this.state.filter;
        }
    }]);

    return Model;
}();

var CommandesController = function (_Model) {
    _inherits(CommandesController, _Model);

    function CommandesController(request, next) {
        _classCallCheck(this, CommandesController);

        var _this = _possibleConstructorReturn(this, (CommandesController.__proto__ || Object.getPrototypeOf(CommandesController)).call(this));

        _this.request = request;
        _this.next = next;
        return _this;
    }

    _createClass(CommandesController, [{
        key: "index",
        value: function index() {
            for (var _len = arguments.length, id = Array(_len), _key = 0; _key < _len; _key++) {
                id[_key] = arguments[_key];
            }

            console.log(id);
            this.next();
        }
    }, {
        key: "update",
        value: function update() {
            this.next();
        }
    }]);

    return CommandesController;
}(Model);

/* harmony default export */ __webpack_exports__["default"] = (CommandesController);

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var status = {
  show: [],
  have: function have(parent_id) {
    return this.show.find(function (item) {
      return item.parent_id === parent_id;
    });
  }
};

var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.state = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.commentaires;
  }

  _createClass(Model, [{
    key: 'saveCommentaires',
    value: function saveCommentaires(commentaires, count) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_COMMENTAIRES', { commentaires: commentaires, count: count });
    }
  }, {
    key: 'saveReponses',
    value: function saveReponses(reponses, count, parent_id) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_REPONSES_COMMENTAIRES', { reponses: reponses, count: count, parent_id: parent_id });
    }
  }, {
    key: 'destroyCommentaire',
    value: function destroyCommentaire(id) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('DELETE_COMMENTAIRES', id);
    }
  }, {
    key: 'getCommentaires',
    value: function getCommentaires(article_id) {
      return this.state.filter(function (commentaire) {
        return commentaire.article_id === article_id;
      });
    }
  }, {
    key: 'getMoreCommentaires',
    value: function getMoreCommentaires(article_id, id) {
      return this.state.filter(function (commentaire) {
        return commentaire.article_id === article_id && commentaire.id > id;
      });
    }
  }, {
    key: 'getMoreResponses',
    value: function getMoreResponses(article_id, parent_id, response_id) {
      return this.state.find(function (commentaire) {
        return commentaire.id === parent_id;
      }).reponses;
    }
  }]);

  return Model;
}();

var CommentsController = function (_Model) {
  _inherits(CommentsController, _Model);

  function CommentsController(request, next) {
    _classCallCheck(this, CommentsController);

    var _this = _possibleConstructorReturn(this, (CommentsController.__proto__ || Object.getPrototypeOf(CommentsController)).call(this));

    _this.request = request;
    _this.next = next;
    return _this;
  }

  _createClass(CommentsController, [{
    key: 'index',
    value: function index(article_id) {
      var _this2 = this;

      var commentaires = this.getCommentaires(article_id);
      if (commentaires.length === 0) {
        this.next(function (response) {
          response.body.data.map(function (data) {
            return data.reponses = [];
          });
          if (response.body.data && response.body.data.length > 0) _this2.saveCommentaires(response.body.data);
        });
        return true;
      }
      var response = { data: commentaires };
      this.next(this.request.respondWith(response, {
        status: 200,
        statusText: "Already have"
      }));
    }
  }, {
    key: 'show',
    value: function show(article_id, parent_id) {
      var _this3 = this;

      if (!(status.have.call(status, parent_id) && this.getMoreResponses(article_id, parent_id))) {
        this.next(function (response) {
          if (response.body && response.body.length > 0) _this3.saveReponses(response.body, null, parent_id);
          status.show.push({ "parent_id": parent_id });
        });
        return true;
      }
      this.next(this.request.respondWith(this.getMoreResponses(article_id, parent_id), {
        status: 200,
        statusText: "Already have"
      }));
    }
  }, {
    key: 'store',
    value: function store() {
      var _this4 = this;

      this.next(function (response) {
        if (response.body && response.body.length > 0) {
          response.body[0].user = window.user;
          if (!response.body[0].parent_id) _this4.saveCommentaires(response.body, true);
          if (response.body[0].parent_id) _this4.saveReponses(response.body, true, response.body[0].parent_id);
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(article_id, id) {
      this.next();
      this.destroyCommentaire(id);
    }
  }, {
    key: 'loadMore',
    value: function loadMore(article_id) {
      var _this5 = this;

      this.next(function (response) {
        response.body.data.map(function (data) {
          return data.reponses = [];
        });
        if (response.body.data && response.body.data.length > 0) _this5.saveCommentaires(response.body.data);
      });
    }
  }]);

  return CommentsController;
}(Model);

/* harmony default export */ __webpack_exports__["default"] = (CommentsController);

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var model = function () {
    function model() {
        _classCallCheck(this, model);
    }

    _createClass(model, [{
        key: 'saveDimension',
        value: function saveDimension(payload) {
            __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_DIMENSION', payload);
        }
    }]);

    return model;
}();

var DimensionsController = function (_model) {
    _inherits(DimensionsController, _model);

    function DimensionsController(request, next) {
        _classCallCheck(this, DimensionsController);

        var _this = _possibleConstructorReturn(this, (DimensionsController.__proto__ || Object.getPrototypeOf(DimensionsController)).call(this));

        _this.request = request;
        _this.next = next;
        return _this;
    }

    _createClass(DimensionsController, [{
        key: 'store',
        value: function store() {
            var _this2 = this;

            console.log(this.request);
            this.next(function (response) {
                if (response.body && response.body.length > 0) _this2.saveDimension({ article_id: JSON.parse(_this2.request.getBody()).article_id, dimension: response.body });
            });
        }
    }]);

    return DimensionsController;
}(model);

/* harmony default export */ __webpack_exports__["default"] = (DimensionsController);

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var model = function () {
  function model() {
    _classCallCheck(this, model);
  }

  _createClass(model, [{
    key: 'like',
    value: function like(id, type) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('LIKE', { id: id, type: type });
    }
  }]);

  return model;
}();

var LikesController = function (_model) {
  _inherits(LikesController, _model);

  function LikesController(request, next) {
    _classCallCheck(this, LikesController);

    var _this = _possibleConstructorReturn(this, (LikesController.__proto__ || Object.getPrototypeOf(LikesController)).call(this));

    _this.request = request;
    _this.next = next;
    return _this;
  }

  _createClass(LikesController, [{
    key: 'article',
    value: function article(id) {
      this.like(id, "article");
      this.next();
    }
  }, {
    key: 'commentaire',
    value: function commentaire(id) {
      this.like(id, "commentaire");
      this.next();
    }
  }]);

  return LikesController;
}(model);

/* harmony default export */ __webpack_exports__["default"] = (LikesController);

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.state = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.paniers;
    this.articles = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.articles;
  }

  _createClass(Model, [{
    key: 'getPanier',
    value: function getPanier() {
      return this.state;
    }
  }, {
    key: 'getArticle',
    value: function getArticle(article_id) {
      return this.articles.find(function (article) {
        return article.id === article_id;
      });
    }
  }, {
    key: 'saveCommandes',
    value: function saveCommandes(article_id, commandes) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_PANIER', { article_id: article_id, commandes: commandes });
    }
  }, {
    key: 'ConfirmPanier',
    value: function ConfirmPanier(id) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('CONFIRM_PANIER', id);
    }
  }, {
    key: 'destroyCommande',
    value: function destroyCommande(article_id) {
      __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('DELETE_PANIER', article_id);
    }
  }]);

  return Model;
}();

var PanierController = function (_Model) {
  _inherits(PanierController, _Model);

  function PanierController(request, next) {
    _classCallCheck(this, PanierController);

    var _this = _possibleConstructorReturn(this, (PanierController.__proto__ || Object.getPrototypeOf(PanierController)).call(this));

    _this.request = request;
    _this.next = next;
    return _this;
  }

  _createClass(PanierController, [{
    key: 'index',
    value: function index() {
      var _this2 = this;

      if (this.getPanier().length === 0) {
        this.next(function (response) {
          if (response.body && response.body.length > 0) {
            _this2.saveCommandes(null, response.body);
          }
        });
      } else {
        this.next(this.request.respondWith(this.getPanier(), {
          status: 200,
          statusText: "Already have"
        }));
      }
    }
  }, {
    key: 'store',
    value: function store() {
      var _this3 = this;

      this.next(function (response) {
        if (response.body && response.body.length > 0 && response.status === 200) {
          var article_id = response.body[0].article_id;
          console.log(response.body);
          response.body[0].article = _this3.getArticle(article_id);
          _this3.saveCommandes(article_id, response.body);
        }
      });
    }
  }, {
    key: 'show',
    value: function show(id) {}
  }, {
    key: 'update',
    value: function update(id) {
      this.next();
      this.ConfirmPanier(id);
    }
  }, {
    key: 'destroy',
    value: function destroy(id) {
      this.next();
      this.destroyCommande(id);
    }
  }]);

  return PanierController;
}(Model);

/* harmony default export */ __webpack_exports__["default"] = (PanierController);

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Store__ = __webpack_require__(55);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var status = [];

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);

        this.state = __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].state.articles.filter(function (article) {
            return article.user_id === window.user.id;
        });
    }

    _createClass(Model, [{
        key: "getAllArticles",
        value: function getAllArticles(order) {
            if (!order) return this.state;
            var articles = _.cloneDeep(this.state);
            if (order === "desc") return articles.sort(function (a, b) {
                return b.id - a.id;
            });
            if (order === "asc") return articles.sort(function (a, b) {
                return a.id - b.id;
            });
        }
    }, {
        key: "saveArticles",
        value: function saveArticles(articles) {
            __WEBPACK_IMPORTED_MODULE_0__store_Store__["a" /* default */].commit('ADD_ARTICLES', articles);
        }
    }, {
        key: "getMoreArticles",
        value: function getMoreArticles(id) {
            return this.state.filter(function (article) {
                return article.id < id;
            });
        }
    }]);

    return Model;
}();

var UserArticlesController = function (_Model) {
    _inherits(UserArticlesController, _Model);

    function UserArticlesController(request, next) {
        _classCallCheck(this, UserArticlesController);

        var _this = _possibleConstructorReturn(this, (UserArticlesController.__proto__ || Object.getPrototypeOf(UserArticlesController)).call(this));

        _this.request = request;
        _this.next = next;
        return _this;
    }

    _createClass(UserArticlesController, [{
        key: "index",
        value: function index() {
            var _this2 = this;

            if (this.getAllArticles().length === 0) {
                this.next(function (response) {
                    if (response.body && response.body.length > 0) _this2.saveArticles(response.body);
                });
                return true;
            }
            this.next(this.request.respondWith(this.getAllArticles("desc"), {
                status: 200,
                statusText: "Already have"
            }));
        }
    }, {
        key: "store",
        value: function store() {}
    }, {
        key: "show",
        value: function show(id) {
            var _this3 = this;

            if (status['loadMore'] !== "end") {
                this.next(function (response) {
                    if (response.body["status"] === "end") {
                        status['loadMore'] = "end";
                    } else {
                        _this3.saveArticles(response.body);
                    }
                });
            } else {
                this.next(this.request.respondWith({}, { status: 200, statusText: "ok" }));
            }
        }
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "destroy",
        value: function destroy(id) {}
    }]);

    return UserArticlesController;
}(Model);

/* harmony default export */ __webpack_exports__["default"] = (UserArticlesController);

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var actions = {
    add_article: function add_article(_ref, data) {
        var commit = _ref.commit,
            getters = _ref.getters;

        data.article.user = window.user;
        data.article.panier = [];
        data.article.likes = [];
        data.article.liked_count = 0;
        data.article.likes_count = 0;
        data.article.commander_count = 0;
        data.article.commentaires_count = 0;
        var images = [];
        data.images.map(function (file) {
            images.push({ id: "000", article_id: data.article.id, path: URL.createObjectURL(file) });
        });
        data.article.images = images;
        commit('PREPEND_ARTICLES', data.article, { root: true });
        commit('BoutiqueStore/PREPEND_ARTICLES', data.article, { root: true });
    }
};

var store = {
    namespaced: true,
    actions: actions
};
/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* harmony default export */ __webpack_exports__["a"] = ({
    ADD_PANIER: function ADD_PANIER(state, _ref) {
        var _state$paniers;

        var article_id = _ref.article_id,
            commandes = _ref.commandes;

        (_state$paniers = state.paniers).push.apply(_state$paniers, _toConsumableArray(commandes));
        if (article_id) state.articles.filter(function (article) {
            return article.id === article_id;
        }).map(function (article) {
            return article.panier = commandes;
        });
    },
    CONFIRM_PANIER: function CONFIRM_PANIER(state, id) {
        var index = state.paniers.indexOf(state.paniers.find(function (item) {
            return item.id === id;
        }));
        if (index >= 0) state.paniers.splice(index, 1);
        state.articles.filter(function (article) {
            return article.id = id;
        }).map(function (article) {
            article.panier_count++;
        });
    },
    DELETE_PANIER: function DELETE_PANIER(state, id) {
        var commande = state.paniers.find(function (item) {
            return item.id === id;
        });
        if (!commande) return false;
        state.articles.filter(function (article) {
            return article.id === commande.article_id;
        }).map(function (article) {
            if (commande.etat === true) article.panier_count--;article.panier = [];
        });
        var index = state.paniers.indexOf(commande);
        if (index >= 0) state.paniers.splice(index, 1);
    }
});

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* harmony default export */ __webpack_exports__["a"] = ({
    ADD_COMMENTAIRES: function ADD_COMMENTAIRES(state, _ref) {
        var _state$commentaires;

        var commentaires = _ref.commentaires,
            count = _ref.count;

        (_state$commentaires = state.commentaires).push.apply(_state$commentaires, _toConsumableArray(commentaires));
        if (count) state.articles.find(function (article) {
            return article.id === commentaires[0].article_id;
        }).commentaires_count++;
    },
    ADD_REPONSES_COMMENTAIRES: function ADD_REPONSES_COMMENTAIRES(state, _ref2) {
        var _commentaire$reponses;

        var reponses = _ref2.reponses,
            count = _ref2.count,
            parent_id = _ref2.parent_id;

        var commentaire = state.commentaires.find(function (commentaire) {
            return commentaire.id === parent_id;
        });
        if (!commentaire.reponses) commentaire.reponses = [];
        (_commentaire$reponses = commentaire.reponses).push.apply(_commentaire$reponses, _toConsumableArray(reponses));
        if (count) commentaire.reponses_count++;
    },
    DELETE_COMMENTAIRES: function DELETE_COMMENTAIRES(state, id) {
        var index = null;
        var commentaire = state.commentaires.find(function (commentaire) {
            return commentaire.id === id || commentaire.reponses && commentaire.reponses.find(function (reponse) {
                return reponse.id === id;
            });
        });
        if (!commentaire.reponses) commentaire.reponses = [];
        var reponse = commentaire.reponses.find(function (reponse) {
            return reponse.id === id;
        });
        if (reponse) commentaire.reponses_count--;
        if (reponse && index >= 0) {
            index = commentaire.reponses.indexOf(reponse);
            if (index >= 0) return commentaire.reponses.splice(index, 1);
        }
        state.articles.find(function (article) {
            return article.id === commentaire.article_id;
        }).commentaires_count--;
        index = state.commentaires.indexOf(commentaire);
        if (index >= 0) state.commentaires.splice(index, 1);
    }
});

/***/ })

});