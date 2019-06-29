// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/modules/_fails.js"}],"../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/modules/_descriptors.js","./_fails":"../node_modules/core-js/modules/_fails.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js"}],"../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/modules/_is-object.js"}],"../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/modules/_core.js","./_global":"../node_modules/core-js/modules/_global.js","./_library":"../node_modules/core-js/modules/_library.js"}],"../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../node_modules/core-js/modules/_shared.js"}],"../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_has":"../node_modules/core-js/modules/_has.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_function-to-string":"../node_modules/core-js/modules/_function-to-string.js","./_core":"../node_modules/core-js/modules/_core.js"}],"../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/modules/_a-function.js"}],"../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/modules/_global.js","./_core":"../node_modules/core-js/modules/_core.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_ctx":"../node_modules/core-js/modules/_ctx.js"}],"../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../node_modules/core-js/modules/_global.js","./_export":"../node_modules/core-js/modules/_export.js","./_user-agent":"../node_modules/core-js/modules/_user-agent.js"}],"../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/modules/_ctx.js","./_invoke":"../node_modules/core-js/modules/_invoke.js","./_html":"../node_modules/core-js/modules/_html.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_global":"../node_modules/core-js/modules/_global.js","./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../node_modules/core-js/modules/_export.js","./_task":"../node_modules/core-js/modules/_task.js"}],"../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js","./_global":"../node_modules/core-js/modules/_global.js"}],"../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../node_modules/core-js/modules/_wks.js","./_hide":"../node_modules/core-js/modules/_hide.js"}],"../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/modules/_cof.js"}],"../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/modules/_iobject.js","./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/modules/_to-integer.js"}],"../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/modules/_to-absolute-index.js"}],"../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/modules/_shared.js","./_uid":"../node_modules/core-js/modules/_uid.js"}],"../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js"}],"../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/modules/_descriptors.js"}],"../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/modules/_an-object.js","./_object-dps":"../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/modules/_dom-create.js","./_html":"../node_modules/core-js/modules/_html.js"}],"../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/modules/_object-dp.js","./_has":"../node_modules/core-js/modules/_has.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/modules/_object-create.js","./_property-desc":"../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/modules/_defined.js"}],"../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/modules/_has.js","./_to-object":"../node_modules/core-js/modules/_to-object.js","./_shared-key":"../node_modules/core-js/modules/_shared-key.js"}],"../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/modules/_library.js","./_export":"../node_modules/core-js/modules/_export.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_iter-create":"../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/modules/_object-gpo.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/modules/_iter-step.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/modules/_iter-define.js"}],"../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../node_modules/core-js/modules/_object-keys.js","./_redefine":"../node_modules/core-js/modules/_redefine.js","./_global":"../node_modules/core-js/modules/_global.js","./_hide":"../node_modules/core-js/modules/_hide.js","./_iterators":"../node_modules/core-js/modules/_iterators.js","./_wks":"../node_modules/core-js/modules/_wks.js"}],"../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';var p,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ea="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ha(){ha=function(){};ea.Symbol||(ea.Symbol=ia)}var ia=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
function ja(){ha();var a=ea.Symbol.iterator;a||(a=ea.Symbol.iterator=ea.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ka(this)}});ja=function(){}}function ka(a){var b=0;return la(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function la(a){ja();a={next:a};a[ea.Symbol.iterator]=function(){return this};return a}function ma(a){ja();var b=a[Symbol.iterator];return b?b.call(a):ka(a)}
function na(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
(function(){if(!function(){var a=document.createEvent("Event");a.initEvent("foo",!0,!0);a.preventDefault();return a.defaultPrevented}()){var a=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(a.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}var b=/Trident/.test(navigator.userAgent);if(!window.CustomEvent||b&&"function"!==typeof window.CustomEvent)window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");
c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c},window.CustomEvent.prototype=window.Event.prototype;if(!window.Event||b&&"function"!==typeof window.Event){var c=window.Event;window.Event=function(a,b){b=b||{};var c=document.createEvent("Event");c.initEvent(a,!!b.bubbles,!!b.cancelable);return c};if(c)for(var d in c)window.Event[d]=c[d];window.Event.prototype=c.prototype}if(!window.MouseEvent||b&&"function"!==typeof window.MouseEvent){b=window.MouseEvent;window.MouseEvent=function(a,
b){b=b||{};var c=document.createEvent("MouseEvent");c.initMouseEvent(a,!!b.bubbles,!!b.cancelable,b.view||window,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget);return c};if(b)for(d in b)window.MouseEvent[d]=b[d];window.MouseEvent.prototype=b.prototype}Array.from||(Array.from=function(a){return[].slice.call(a)});Object.assign||(Object.assign=function(a,b){for(var c=[].slice.call(arguments,1),d=0,e;d<c.length;d++)if(e=c[d])for(var f=
a,m=e,n=Object.getOwnPropertyNames(m),t=0;t<n.length;t++)e=n[t],f[e]=m[e];return a})})(window.WebComponents);(function(){function a(){}function b(a,b){if(!a.childNodes.length)return[];switch(a.nodeType){case Node.DOCUMENT_NODE:return za.call(a,b);case Node.DOCUMENT_FRAGMENT_NODE:return sb.call(a,b);default:return ba.call(a,b)}}var c="undefined"===typeof HTMLTemplateElement,d=!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment),e=!1;/Trident/.test(navigator.userAgent)&&function(){function a(a,b){if(a instanceof DocumentFragment)for(var d;d=a.firstChild;)c.call(this,d,b);else c.call(this,
a,b);return a}e=!0;var b=Node.prototype.cloneNode;Node.prototype.cloneNode=function(a){a=b.call(this,a);this instanceof DocumentFragment&&(a.__proto__=DocumentFragment.prototype);return a};DocumentFragment.prototype.querySelectorAll=HTMLElement.prototype.querySelectorAll;DocumentFragment.prototype.querySelector=HTMLElement.prototype.querySelector;Object.defineProperties(DocumentFragment.prototype,{nodeType:{get:function(){return Node.DOCUMENT_FRAGMENT_NODE},configurable:!0},localName:{get:function(){},
configurable:!0},nodeName:{get:function(){return"#document-fragment"},configurable:!0}});var c=Node.prototype.insertBefore;Node.prototype.insertBefore=a;var d=Node.prototype.appendChild;Node.prototype.appendChild=function(b){b instanceof DocumentFragment?a.call(this,b,null):d.call(this,b);return b};var f=Node.prototype.removeChild,g=Node.prototype.replaceChild;Node.prototype.replaceChild=function(b,c){b instanceof DocumentFragment?(a.call(this,b,c),f.call(this,c)):g.call(this,b,c);return c};Document.prototype.createDocumentFragment=
function(){var a=this.createElement("df");a.__proto__=DocumentFragment.prototype;return a};var h=Document.prototype.importNode;Document.prototype.importNode=function(a,b){b=h.call(this,a,b||!1);a instanceof DocumentFragment&&(b.__proto__=DocumentFragment.prototype);return b}}();var f=Node.prototype.cloneNode,g=Document.prototype.createElement,h=Document.prototype.importNode,k=Node.prototype.removeChild,l=Node.prototype.appendChild,m=Node.prototype.replaceChild,n=DOMParser.prototype.parseFromString,
t=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),C=Object.getOwnPropertyDescriptor(window.Node.prototype,"childNodes"),ba=Element.prototype.querySelectorAll,za=Document.prototype.querySelectorAll,sb=DocumentFragment.prototype.querySelectorAll,tb=function(){if(!c){var a=document.createElement("template"),b=document.createElement("template");b.content.appendChild(document.createElement("div"));a.content.appendChild(b);a=a.cloneNode(!0);return 0===a.content.childNodes.length||
0===a.content.firstChild.content.childNodes.length||d}}();if(c){var V=document.implementation.createHTMLDocument("template"),D=!0,ca=document.createElement("style");ca.textContent="template{display:none;}";var oa=document.head;oa.insertBefore(ca,oa.firstElementChild);a.prototype=Object.create(HTMLElement.prototype);var Aa=!document.createElement("div").hasOwnProperty("innerHTML");a.I=function(b){if(!b.content&&b.namespaceURI===document.documentElement.namespaceURI){b.content=V.createDocumentFragment();
for(var c;c=b.firstChild;)l.call(b.content,c);if(Aa)b.__proto__=a.prototype;else if(b.cloneNode=function(b){return a.a(this,b)},D)try{T(b),da(b)}catch(Mh){D=!1}a.C(b.content)}};var fa={option:["select"],thead:["table"],col:["colgroup","table"],tr:["tbody","table"],th:["tr","tbody","table"],td:["tr","tbody","table"]},T=function(b){Object.defineProperty(b,"innerHTML",{get:function(){return ub(this)},set:function(b){var c=fa[(/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(b)||["",""])[1].toLowerCase()];if(c)for(var d=
0;d<c.length;d++)b="<"+c[d]+">"+b+"</"+c[d]+">";V.body.innerHTML=b;for(a.C(V);this.content.firstChild;)k.call(this.content,this.content.firstChild);b=V.body;if(c)for(d=0;d<c.length;d++)b=b.lastChild;for(;b.firstChild;)l.call(this.content,b.firstChild)},configurable:!0})},da=function(a){Object.defineProperty(a,"outerHTML",{get:function(){return"<template>"+this.innerHTML+"</template>"},set:function(a){if(this.parentNode){V.body.innerHTML=a;for(a=this.ownerDocument.createDocumentFragment();V.body.firstChild;)l.call(a,
V.body.firstChild);m.call(this.parentNode,a,this)}else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");},configurable:!0})};T(a.prototype);da(a.prototype);a.C=function(c){c=b(c,"template");for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)a.I(f)};document.addEventListener("DOMContentLoaded",function(){a.C(document)});Document.prototype.createElement=function(){var b=g.apply(this,arguments);"template"===b.localName&&a.I(b);return b};DOMParser.prototype.parseFromString=
function(){var b=n.apply(this,arguments);a.C(b);return b};Object.defineProperty(HTMLElement.prototype,"innerHTML",{get:function(){return ub(this)},set:function(b){t.set.call(this,b);a.C(this)},configurable:!0,enumerable:!0});var vf=/[&\u00A0"]/g,Lc=/[&\u00A0<>]/g,Mc=function(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}};ca=function(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b};var wf=ca("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
xf=ca("style script xmp iframe noembed noframes plaintext noscript".split(" ")),ub=function(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):C.get.call(a),e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var k=a;var l=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var T=h.localName,m="<"+T,da=h.attributes,n=0;k=da[n];n++)m+=" "+k.name+'="'+k.value.replace(vf,Mc)+'"';m+=">";h=wf[T]?m:m+ub(h,l)+"</"+T+">";break a;case Node.TEXT_NODE:h=h.data;h=k&&xf[k.localName]?h:h.replace(Lc,Mc);
break a;case Node.COMMENT_NODE:h="\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),Error("not implemented");}}c+=h}return c}}if(c||tb){a.a=function(a,b){var c=f.call(a,!1);this.I&&this.I(c);b&&(l.call(c.content,f.call(a.content,!0)),vb(c.content,a.content));return c};var vb=function(c,d){if(d.querySelectorAll&&(d=b(d,"template"),0!==d.length)){c=b(c,"template");for(var e=0,f=c.length,g,h;e<f;e++)h=d[e],g=c[e],a&&a.I&&a.I(h),m.call(g.parentNode,yf.call(h,!0),g)}},yf=Node.prototype.cloneNode=
function(b){if(!e&&d&&this instanceof DocumentFragment)if(b)var c=zf.call(this.ownerDocument,this,!0);else return this.ownerDocument.createDocumentFragment();else this.nodeType===Node.ELEMENT_NODE&&"template"===this.localName&&this.namespaceURI==document.documentElement.namespaceURI?c=a.a(this,b):c=f.call(this,b);b&&vb(c,this);return c},zf=Document.prototype.importNode=function(c,d){d=d||!1;if("template"===c.localName)return a.a(c,d);var e=h.call(this,c,d);if(d){vb(e,c);c=b(e,'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
for(var f,k=0;k<c.length;k++){f=c[k];d=g.call(document,"script");d.textContent=f.textContent;for(var l=f.attributes,T=0,da;T<l.length;T++)da=l[T],d.setAttribute(da.name,da.value);m.call(f.parentNode,d,f)}}return e}}c&&(window.HTMLTemplateElement=a)})();var pa;Array.isArray?pa=Array.isArray:pa=function(a){return"[object Array]"===Object.prototype.toString.call(a)};var qa=pa;var ra=0,sa,ta="undefined"!==typeof window?window:void 0,ua=ta||{},va=ua.MutationObserver||ua.WebKitMutationObserver,wa="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel;function xa(){return"undefined"!==typeof sa?function(){sa(ya)}:Ba()}function Ca(){var a=0,b=new va(ya),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}
function Da(){var a=new MessageChannel;a.port1.onmessage=ya;return function(){return a.port2.postMessage(0)}}function Ba(){var a=setTimeout;return function(){return a(ya,1)}}var Ea=Array(1E3);function ya(){for(var a=0;a<ra;a+=2)(0,Ea[a])(Ea[a+1]),Ea[a]=void 0,Ea[a+1]=void 0;ra=0}var Fa,Ga;
if("undefined"===typeof self&&"undefined"!==typeof process&&"[object process]"==={}.toString.call(process))Ga=function(){return process.vb(ya)};else{var Ha;if(va)Ha=Ca();else{var Ia;if(wa)Ia=Da();else{var Ja;if(void 0===ta&&"function"===typeof require)try{var Ka=require("vertx");sa=Ka.xb||Ka.wb;Ja=xa()}catch(a){Ja=Ba()}else Ja=Ba();Ia=Ja}Ha=Ia}Ga=Ha}Fa=Ga;function La(a,b){Ea[ra]=a;Ea[ra+1]=b;ra+=2;2===ra&&Fa()};function Ma(a,b){var c=this,d=new this.constructor(Na);void 0===d[Oa]&&Pa(d);var e=c.h;if(e){var f=arguments[e-1];La(function(){return Qa(e,d,f,c.f)})}else Ra(c,d,a,b);return d};function Sa(a){if(a&&"object"===typeof a&&a.constructor===this)return a;var b=new this(Na);Ta(b,a);return b};var Oa=Math.random().toString(36).substring(16);function Na(){}var Va=new Ua;function Wa(a){try{return a.then}catch(b){return Va.error=b,Va}}function Xa(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function Ya(a,b,c){La(function(a){var d=!1,f=Xa(c,b,function(c){d||(d=!0,b!==c?Ta(a,c):q(a,c))},function(b){d||(d=!0,r(a,b))});!d&&f&&(d=!0,r(a,f))},a)}function Za(a,b){1===b.h?q(a,b.f):2===b.h?r(a,b.f):Ra(b,void 0,function(b){return Ta(a,b)},function(b){return r(a,b)})}
function $a(a,b,c){b.constructor===a.constructor&&c===Ma&&b.constructor.resolve===Sa?Za(a,b):c===Va?(r(a,Va.error),Va.error=null):void 0===c?q(a,b):"function"===typeof c?Ya(a,b,c):q(a,b)}function Ta(a,b){if(a===b)r(a,new TypeError("You cannot resolve a promise with itself"));else{var c=typeof b;null===b||"object"!==c&&"function"!==c?q(a,b):$a(a,b,Wa(b))}}function ab(a){a.wa&&a.wa(a.f);bb(a)}function q(a,b){void 0===a.h&&(a.f=b,a.h=1,0!==a.M.length&&La(bb,a))}
function r(a,b){void 0===a.h&&(a.h=2,a.f=b,La(ab,a))}function Ra(a,b,c,d){var e=a.M,f=e.length;a.wa=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.h&&La(bb,a)}function bb(a){var b=a.M,c=a.h;if(0!==b.length){for(var d,e,f=a.f,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?Qa(c,d,e,f):e(f);a.M.length=0}}function Ua(){this.error=null}var cb=new Ua;
function Qa(a,b,c,d){var e="function"===typeof c;if(e){try{var f=c(d)}catch(l){cb.error=l,f=cb}if(f===cb){var g=!0;var h=f.error;f.error=null}else var k=!0;if(b===f){r(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=d,k=!0;void 0===b.h&&(e&&k?Ta(b,f):g?r(b,h):1===a?q(b,f):2===a&&r(b,f))}function db(a,b){try{b(function(b){Ta(a,b)},function(b){r(a,b)})}catch(c){r(a,c)}}var eb=0;function Pa(a){a[Oa]=eb++;a.h=void 0;a.f=void 0;a.M=[]};function fb(a,b){this.La=a;this.F=new a(Na);this.F[Oa]||Pa(this.F);if(qa(b))if(this.V=this.length=b.length,this.f=Array(this.length),0===this.length)q(this.F,this.f);else{this.length=this.length||0;for(a=0;void 0===this.h&&a<b.length;a++)gb(this,b[a],a);0===this.V&&q(this.F,this.f)}else r(this.F,Error("Array Methods must be provided an Array"))}
function gb(a,b,c){var d=a.La,e=d.resolve;e===Sa?(e=Wa(b),e===Ma&&void 0!==b.h?hb(a,b.h,c,b.f):"function"!==typeof e?(a.V--,a.f[c]=b):d===u?(d=new d(Na),$a(d,b,e),ib(a,d,c)):ib(a,new d(function(a){return a(b)}),c)):ib(a,e(b),c)}function hb(a,b,c,d){var e=a.F;void 0===e.h&&(a.V--,2===b?r(e,d):a.f[c]=d);0===a.V&&q(e,a.f)}function ib(a,b,c){Ra(b,void 0,function(b){return hb(a,1,c,b)},function(b){return hb(a,2,c,b)})};function jb(a){return(new fb(this,a)).F};function kb(a){var b=this;return qa(a)?new b(function(c,d){for(var e=a.length,f=0;f<e;f++)b.resolve(a[f]).then(c,d)}):new b(function(a,b){return b(new TypeError("You must pass an array to race."))})};function lb(a){var b=new this(Na);r(b,a);return b};function u(a){this[Oa]=eb++;this.f=this.h=void 0;this.M=[];if(Na!==a){if("function"!==typeof a)throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(this instanceof u)db(this,a);else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");}}u.prototype={constructor:u,then:Ma,a:function(a){return this.then(null,a)}};/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.Promise||(window.Promise=u,u.prototype["catch"]=u.prototype.a,u.prototype.then=u.prototype.then,u.all=jb,u.race=kb,u.resolve=Sa,u.reject=lb);(function(a){function b(a,b){if("function"===typeof window.CustomEvent)return new CustomEvent(a,b);var c=document.createEvent("CustomEvent");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c}function c(a){if(C)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;if("function"===typeof b.closest)b=b.closest("link[rel=import]");else for(;!h(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=m(document,"link[rel=import]:not([import-dependency])"),
c=b.length;c?n(b,function(b){return g(b,function(){0===--c&&a()})}):a()}function e(a){function b(){"loading"!==document.readyState&&document.body&&(document.removeEventListener("readystatechange",b),a())}document.addEventListener("readystatechange",b);b()}function f(a){e(function(){return d(function(){return a&&a()})})}function g(a,b){if(a.__loaded)b&&b();else if("script"===a.localName&&!a.src||"style"===a.localName&&!a.firstChild)a.__loaded=!0,b&&b();else{var c=function(d){a.removeEventListener(d.type,
c);a.__loaded=!0;b&&b()};a.addEventListener("load",c);oa&&"style"===a.localName||a.addEventListener("error",c)}}function h(a){return a.nodeType===Node.ELEMENT_NODE&&"link"===a.localName&&"import"===a.rel}function k(){var a=this;this.a={};this.b=0;this.c=new MutationObserver(function(b){return a.Wa(b)});this.c.observe(document.head,{childList:!0,subtree:!0});this.loadImports(document)}function l(a){n(m(a,"template"),function(a){n(m(a.content,'script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'),
function(a){var b=document.createElement("script");n(a.attributes,function(a){return b.setAttribute(a.name,a.value)});b.textContent=a.textContent;a.parentNode.replaceChild(b,a)});l(a.content)})}function m(a,b){return a.childNodes.length?a.querySelectorAll(b):ba}function n(a,b,c){var d=a?a.length:0,e=c?-1:1;for(c=c?d-1:0;c<d&&0<=c;c+=e)b(a[c],c)}var t=document.createElement("link"),C="import"in t,ba=t.querySelectorAll("*"),za=null;!1==="currentScript"in document&&Object.defineProperty(document,"currentScript",
{get:function(){return za||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var sb=/(url\()([^)]*)(\))/g,tb=/(@import[\s]+(?!url\())([^;]*)(;)/g,V=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,D={Qa:function(a,b){a.href&&a.setAttribute("href",D.ba(a.getAttribute("href"),b));a.src&&a.setAttribute("src",D.ba(a.getAttribute("src"),b));if("style"===a.localName){var c=D.Aa(a.textContent,b,sb);a.textContent=D.Aa(c,b,tb)}},Aa:function(a,b,c){return a.replace(c,
function(a,c,d,e){a=d.replace(/["']/g,"");b&&(a=D.ba(a,b));return c+"'"+a+"'"+e})},ba:function(a,b){if(void 0===D.ha){D.ha=!1;try{var c=new URL("b","http://a");c.pathname="c%20d";D.ha="http://a/c%20d"===c.href}catch(Lc){}}if(D.ha)return(new URL(a,b)).href;c=D.Ia;c||(c=document.implementation.createHTMLDocument("temp"),D.Ia=c,c.sa=c.createElement("base"),c.head.appendChild(c.sa),c.ra=c.createElement("a"));c.sa.href=b;c.ra.href=a;return c.ra.href||a}},ca={async:!0,load:function(a,b,c){if(a)if(a.match(/^data:/)){a=
a.split(",");var d=a[1];d=-1<a[0].indexOf(";base64")?atob(d):decodeURIComponent(d);b(d)}else{var e=new XMLHttpRequest;e.open("GET",a,ca.async);e.onload=function(){var a=e.responseURL||e.getResponseHeader("Location");a&&0===a.indexOf("/")&&(a=(location.origin||location.protocol+"//"+location.host)+a);var d=e.response||e.responseText;304===e.status||0===e.status||200<=e.status&&300>e.status?b(d,a):c(d)};e.send()}else c("error: href must be specified")}},oa=/Trident/.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent);
k.prototype.loadImports=function(a){var b=this;a=m(a,"link[rel=import]");n(a,function(a){return b.o(a)})};k.prototype.o=function(a){var b=this,c=a.href;if(void 0!==this.a[c]){var d=this.a[c];d&&d.__loaded&&(a.__import=d,this.i(a))}else this.b++,this.a[c]="pending",ca.load(c,function(a,d){a=b.Xa(a,d||c);b.a[c]=a;b.b--;b.loadImports(a);b.J()},function(){b.a[c]=null;b.b--;b.J()})};k.prototype.Xa=function(a,b){if(!a)return document.createDocumentFragment();oa&&(a=a.replace(V,function(a,b,c){return-1===
a.indexOf("type=")?b+" type=import-disable "+c:a}));var c=document.createElement("template");c.innerHTML=a;if(c.content)a=c.content,l(a);else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);if(c=a.querySelector("base"))b=D.ba(c.getAttribute("href"),b),c.removeAttribute("href");c=m(a,'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]');
var d=0;n(c,function(a){g(a);D.Qa(a,b);a.setAttribute("import-dependency","");if("script"===a.localName&&!a.src&&a.textContent){if("module"===a.type)throw Error("Inline module scripts are not supported in HTML Imports.");a.setAttribute("src","data:text/javascript;charset=utf-8,"+encodeURIComponent(a.textContent+("\n//# sourceURL="+b+(d?"-"+d:"")+".js\n")));a.textContent="";d++}});return a};k.prototype.J=function(){var a=this;if(!this.b){this.c.disconnect();this.flatten(document);var b=!1,c=!1,d=function(){c&&
b&&(a.loadImports(document),a.b||(a.c.observe(document.head,{childList:!0,subtree:!0}),a.Ua()))};this.Za(function(){c=!0;d()});this.Ya(function(){b=!0;d()})}};k.prototype.flatten=function(a){var b=this;a=m(a,"link[rel=import]");n(a,function(a){var c=b.a[a.href];(a.__import=c)&&c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(b.a[a.href]=a,a.readyState="loading",a.__import=a,b.flatten(c),a.appendChild(c))})};k.prototype.Ya=function(a){function b(e){if(e<d){var f=c[e],h=document.createElement("script");f.removeAttribute("import-dependency");
n(f.attributes,function(a){return h.setAttribute(a.name,a.value)});za=h;f.parentNode.replaceChild(h,f);g(h,function(){za=null;b(e+1)})}else a()}var c=m(document,"script[import-dependency]"),d=c.length;b(0)};k.prototype.Za=function(a){var b=m(document,"style[import-dependency],link[rel=stylesheet][import-dependency]"),d=b.length;if(d){var e=oa&&!!document.querySelector("link[rel=stylesheet][href][type=import-disable]");n(b,function(b){g(b,function(){b.removeAttribute("import-dependency");0===--d&&
a()});if(e&&b.parentNode!==document.head){var f=document.createElement(b.localName);f.__appliedElement=b;f.setAttribute("type","import-placeholder");b.parentNode.insertBefore(f,b.nextSibling);for(f=c(b);f&&c(f);)f=c(f);f.parentNode!==document.head&&(f=null);document.head.insertBefore(b,f);b.removeAttribute("type")}})}else a()};k.prototype.Ua=function(){var a=this,b=m(document,"link[rel=import]");n(b,function(b){return a.i(b)},!0)};k.prototype.i=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState=
"complete"),a.dispatchEvent(b(a.import?"load":"error",{bubbles:!1,cancelable:!1,detail:void 0})))};k.prototype.Wa=function(a){var b=this;n(a,function(a){return n(a.addedNodes,function(a){a&&a.nodeType===Node.ELEMENT_NODE&&(h(a)?b.o(a):b.loadImports(a))})})};var Aa=null;if(C)t=m(document,"link[rel=import]"),n(t,function(a){a.import&&"loading"===a.import.readyState||(a.__loaded=!0)}),t=function(a){a=a.target;h(a)&&(a.__loaded=!0)},document.addEventListener("load",t,!0),document.addEventListener("error",
t,!0);else{var fa=Object.getOwnPropertyDescriptor(Node.prototype,"baseURI");Object.defineProperty((!fa||fa.configurable?Node:Element).prototype,"baseURI",{get:function(){var a=h(this)?this:c(this);return a?a.href:fa&&fa.get?fa.get.call(this):(document.querySelector("base")||window.location).href},configurable:!0,enumerable:!0});Object.defineProperty(HTMLLinkElement.prototype,"import",{get:function(){return this.__import||null},configurable:!0,enumerable:!0});e(function(){Aa=new k})}f(function(){return document.dispatchEvent(b("HTMLImportsLoaded",
{cancelable:!0,bubbles:!0,detail:void 0}))});a.useNative=C;a.whenReady=f;a.importForElement=c;a.loadImports=function(a){Aa&&Aa.loadImports(a)}})(window.HTMLImports=window.HTMLImports||{});/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.WebComponents=window.WebComponents||{flags:{}};var mb=document.querySelector('script[src*="webcomponents-lite.js"]'),nb=/wc-(.+)/,v={};if(!v.noOpts){location.search.slice(1).split("&").forEach(function(a){a=a.split("=");var b;a[0]&&(b=a[0].match(nb))&&(v[b[1]]=a[1]||!0)});if(mb)for(var ob=0,pb;pb=mb.attributes[ob];ob++)"src"!==pb.name&&(v[pb.name]=pb.value||!0);if(v.log&&v.log.split){var qb=v.log.split(",");v.log={};qb.forEach(function(a){v.log[a]=!0})}else v.log={}}
window.WebComponents.flags=v;var rb=v.shadydom;rb&&(window.ShadyDOM=window.ShadyDOM||{},window.ShadyDOM.force=rb);var wb=v.register||v.ce;wb&&window.customElements&&(window.customElements.forcePolyfill=wb);/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function xb(){this.za=this.root=null;this.Z=!1;this.D=this.U=this.la=this.assignedSlot=this.assignedNodes=this.K=null;this.childNodes=this.nextSibling=this.previousSibling=this.lastChild=this.firstChild=this.parentNode=this.N=void 0;this.Ea=this.ua=!1;this.S={}}xb.prototype.toJSON=function(){return{}};function w(a){a.fa||(a.fa=new xb);return a.fa}function x(a){return a&&a.fa};var y=window.ShadyDOM||{};y.Sa=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var yb=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");y.w=!!(yb&&yb.configurable&&yb.get);y.na=y.force||!y.Sa;var zb=navigator.userAgent.match("Trident"),Ab=navigator.userAgent.match("Edge");void 0===y.Ca&&(y.Ca=y.w&&(zb||Ab));function Bb(a){return(a=x(a))&&void 0!==a.firstChild}function z(a){return"ShadyRoot"===a.Ma}function Cb(a){a=a.getRootNode();if(z(a))return a}
var Db=Element.prototype,Eb=Db.matches||Db.matchesSelector||Db.mozMatchesSelector||Db.msMatchesSelector||Db.oMatchesSelector||Db.webkitMatchesSelector;function Fb(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=Object.getOwnPropertyDescriptor(b,e);f&&Object.defineProperty(a,e,f)}}function Gb(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)Fb(a,c[d]);return a}function Hb(a,b){for(var c in b)a[c]=b[c]}
var Ib=document.createTextNode(""),Jb=0,Kb=[];(new MutationObserver(function(){for(;Kb.length;)try{Kb.shift()()}catch(a){throw Ib.textContent=Jb++,a;}})).observe(Ib,{characterData:!0});function Lb(a){Kb.push(a);Ib.textContent=Jb++}var Mb=!!document.contains;function Nb(a,b){for(;b;){if(b==a)return!0;b=b.parentNode}return!1}
function Ob(a){for(var b=a.length-1;0<=b;b--){var c=a[b],d=c.getAttribute("id")||c.getAttribute("name");d&&"length"!==d&&isNaN(d)&&(a[d]=c)}a.item=function(b){return a[b]};a.namedItem=function(b){if("length"!==b&&isNaN(b)&&a[b])return a[b];for(var c=ma(a),d=c.next();!d.done;d=c.next())if(d=d.value,(d.getAttribute("id")||d.getAttribute("name"))==b)return d;return null};return a};var Pb=[],Qb;function Rb(a){Qb||(Qb=!0,Lb(Sb));Pb.push(a)}function Sb(){Qb=!1;for(var a=!!Pb.length;Pb.length;)Pb.shift()();return a}Sb.list=Pb;function Tb(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.Y=new Set}function Ub(a){a.a||(a.a=!0,Lb(function(){Vb(a)}))}function Vb(a){if(a.a){a.a=!1;var b=a.takeRecords();b.length&&a.Y.forEach(function(a){a(b)})}}Tb.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
function Wb(a,b){var c=w(a);c.K||(c.K=new Tb);c.K.Y.add(b);var d=c.K;return{Ja:b,H:d,Na:a,takeRecords:function(){return d.takeRecords()}}}function Xb(a){var b=a&&a.H;b&&(b.Y.delete(a.Ja),b.Y.size||(w(a.Na).K=null))}
function Yb(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})};var A={},Zb=Element.prototype.insertBefore,$b=Element.prototype.replaceChild,ac=Element.prototype.removeChild,bc=Element.prototype.setAttribute,cc=Element.prototype.removeAttribute,dc=Element.prototype.cloneNode,ec=Document.prototype.importNode,fc=Element.prototype.addEventListener,gc=Element.prototype.removeEventListener,hc=Window.prototype.addEventListener,ic=Window.prototype.removeEventListener,jc=Element.prototype.dispatchEvent,kc=Node.prototype.contains||HTMLElement.prototype.contains,lc=Document.prototype.getElementById,
mc=Element.prototype.querySelector,nc=DocumentFragment.prototype.querySelector,oc=Document.prototype.querySelector,pc=Element.prototype.querySelectorAll,qc=DocumentFragment.prototype.querySelectorAll,rc=Document.prototype.querySelectorAll;A.appendChild=Element.prototype.appendChild;A.insertBefore=Zb;A.replaceChild=$b;A.removeChild=ac;A.setAttribute=bc;A.removeAttribute=cc;A.cloneNode=dc;A.importNode=ec;A.addEventListener=fc;A.removeEventListener=gc;A.fb=hc;A.gb=ic;A.dispatchEvent=jc;A.contains=kc;
A.getElementById=lc;A.pb=mc;A.sb=nc;A.nb=oc;A.querySelector=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return mc.call(this,a);case Node.DOCUMENT_NODE:return oc.call(this,a);default:return nc.call(this,a)}};A.qb=pc;A.tb=qc;A.ob=rc;A.querySelectorAll=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return pc.call(this,a);case Node.DOCUMENT_NODE:return rc.call(this,a);default:return qc.call(this,a)}};var sc=/[&\u00A0"]/g,tc=/[&\u00A0<>]/g;function uc(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}function vc(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}var wc=vc("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),xc=vc("style script xmp iframe noembed noframes plaintext noscript".split(" "));
function yc(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var k=a;var l=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var m=h.localName,n="<"+m,t=h.attributes,C=0;k=t[C];C++)n+=" "+k.name+'="'+k.value.replace(sc,uc)+'"';n+=">";h=wc[m]?n:n+yc(h,l)+"</"+m+">";break a;case Node.TEXT_NODE:h=h.data;h=k&&xc[k.localName]?h:h.replace(tc,uc);break a;case Node.COMMENT_NODE:h="\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),
Error("not implemented");}}c+=h}return c};var B={},E=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),F=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1);function zc(a){var b=[];E.currentNode=a;for(a=E.firstChild();a;)b.push(a),a=E.nextSibling();return b}B.parentNode=function(a){E.currentNode=a;return E.parentNode()};B.firstChild=function(a){E.currentNode=a;return E.firstChild()};B.lastChild=function(a){E.currentNode=a;return E.lastChild()};B.previousSibling=function(a){E.currentNode=a;return E.previousSibling()};
B.nextSibling=function(a){E.currentNode=a;return E.nextSibling()};B.childNodes=zc;B.parentElement=function(a){F.currentNode=a;return F.parentNode()};B.firstElementChild=function(a){F.currentNode=a;return F.firstChild()};B.lastElementChild=function(a){F.currentNode=a;return F.lastChild()};B.previousElementSibling=function(a){F.currentNode=a;return F.previousSibling()};B.nextElementSibling=function(a){F.currentNode=a;return F.nextSibling()};
B.children=function(a){var b=[];F.currentNode=a;for(a=F.firstChild();a;)b.push(a),a=F.nextSibling();return Ob(b)};B.innerHTML=function(a){return yc(a,function(a){return zc(a)})};B.textContent=function(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}};var G={},Ac=y.w,Bc=[Node.prototype,Element.prototype,HTMLElement.prototype];function H(a){var b;a:{for(b=0;b<Bc.length;b++){var c=Bc[b];if(c.hasOwnProperty(a)){b=c;break a}}b=void 0}if(!b)throw Error("Could not find descriptor for "+a);return Object.getOwnPropertyDescriptor(b,a)}
var I=Ac?{parentNode:H("parentNode"),firstChild:H("firstChild"),lastChild:H("lastChild"),previousSibling:H("previousSibling"),nextSibling:H("nextSibling"),childNodes:H("childNodes"),parentElement:H("parentElement"),previousElementSibling:H("previousElementSibling"),nextElementSibling:H("nextElementSibling"),innerHTML:H("innerHTML"),textContent:H("textContent"),firstElementChild:H("firstElementChild"),lastElementChild:H("lastElementChild"),children:H("children")}:{},Cc=Ac?{firstElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,
"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"children")}:{},Dc=Ac?{firstElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(Document.prototype,"children")}:{};G.ya=I;G.rb=Cc;G.mb=Dc;G.parentNode=function(a){return I.parentNode.get.call(a)};
G.firstChild=function(a){return I.firstChild.get.call(a)};G.lastChild=function(a){return I.lastChild.get.call(a)};G.previousSibling=function(a){return I.previousSibling.get.call(a)};G.nextSibling=function(a){return I.nextSibling.get.call(a)};G.childNodes=function(a){return Array.prototype.slice.call(I.childNodes.get.call(a))};G.parentElement=function(a){return I.parentElement.get.call(a)};G.previousElementSibling=function(a){return I.previousElementSibling.get.call(a)};G.nextElementSibling=function(a){return I.nextElementSibling.get.call(a)};
G.innerHTML=function(a){return I.innerHTML.get.call(a)};G.textContent=function(a){return I.textContent.get.call(a)};G.children=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return Cc.children.get.call(a);case Node.DOCUMENT_NODE:return Dc.children.get.call(a);default:return I.children.get.call(a)}};
G.firstElementChild=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return Cc.firstElementChild.get.call(a);case Node.DOCUMENT_NODE:return Dc.firstElementChild.get.call(a);default:return I.firstElementChild.get.call(a)}};G.lastElementChild=function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return Cc.lastElementChild.get.call(a);case Node.DOCUMENT_NODE:return Dc.lastElementChild.get.call(a);default:return I.lastElementChild.get.call(a)}};var J=y.Ca?G:B;function Ec(a){for(;a.firstChild;)a.removeChild(a.firstChild)}
var Fc=y.w,Gc=document.implementation.createHTMLDocument("inert"),Hc=Object.getOwnPropertyDescriptor(Node.prototype,"isConnected"),Ic=Hc&&Hc.get,Jc=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),Kc={parentElement:{get:function(){var a=x(this);(a=a&&a.parentNode)&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:J.parentElement(this)},configurable:!0},parentNode:{get:function(){var a=x(this);a=a&&a.parentNode;return void 0!==a?a:J.parentNode(this)},configurable:!0},
nextSibling:{get:function(){var a=x(this);a=a&&a.nextSibling;return void 0!==a?a:J.nextSibling(this)},configurable:!0},previousSibling:{get:function(){var a=x(this);a=a&&a.previousSibling;return void 0!==a?a:J.previousSibling(this)},configurable:!0},nextElementSibling:{get:function(){var a=x(this);if(a&&void 0!==a.nextSibling){for(a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return J.nextElementSibling(this)},configurable:!0},previousElementSibling:{get:function(){var a=
x(this);if(a&&void 0!==a.previousSibling){for(a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return J.previousElementSibling(this)},configurable:!0}},Nc={className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0}},Oc={childNodes:{get:function(){if(Bb(this)){var a=x(this);if(!a.childNodes){a.childNodes=[];for(var b=this.firstChild;b;b=b.nextSibling)a.childNodes.push(b)}var c=a.childNodes}else c=
J.childNodes(this);c.item=function(a){return c[a]};return c},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=x(this);a=a&&a.firstChild;return void 0!==a?a:J.firstChild(this)},configurable:!0},lastChild:{get:function(){var a=x(this);a=a&&a.lastChild;return void 0!==a?a:J.lastChild(this)},configurable:!0},textContent:{get:function(){if(Bb(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&
a.push(d.textContent);return a.join("")}return J.textContent(this)},set:function(a){if("undefined"===typeof a||null===a)a="";switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:if(!Bb(this)&&Fc){var b=this.firstChild;(b!=this.lastChild||b&&b.nodeType!=Node.TEXT_NODE)&&Ec(this);G.ya.textContent.set.call(this,a)}else Ec(this),(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){var a=
x(this);if(a&&void 0!==a.firstChild){for(a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return J.firstElementChild(this)},configurable:!0},lastElementChild:{get:function(){var a=x(this);if(a&&void 0!==a.lastChild){for(a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return J.lastElementChild(this)},configurable:!0},children:{get:function(){return Bb(this)?Ob(Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE})):
J.children(this)},configurable:!0},innerHTML:{get:function(){return Bb(this)?yc("template"===this.localName?this.content:this):J.innerHTML(this)},set:function(a){var b="template"===this.localName?this.content:this;Ec(b);var c=this.localName||"div";c=this.namespaceURI&&this.namespaceURI!==Gc.namespaceURI?Gc.createElementNS(this.namespaceURI,c):Gc.createElement(c);Fc?G.ya.innerHTML.set.call(c,a):c.innerHTML=a;for(a="template"===this.localName?c.content:c;a.firstChild;)b.appendChild(a.firstChild)},configurable:!0}},
Pc={shadowRoot:{get:function(){var a=x(this);return a&&a.za||null},configurable:!0}},Qc={activeElement:{get:function(){var a=Jc&&Jc.get?Jc.get.call(document):y.w?void 0:document.activeElement;if(a&&a.nodeType){var b=!!z(this);if(this===document||b&&this.host!==a&&A.contains.call(this.host,a)){for(b=Cb(a);b&&b!==this;)a=b.host,b=Cb(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}};
function K(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function Rc(a){K(a,Kc);K(a,Nc);K(a,Oc);K(a,Qc)}
function Sc(){var a=Tc.prototype;a.__proto__=DocumentFragment.prototype;K(a,Kc,!0);K(a,Oc,!0);K(a,Qc,!0);Object.defineProperties(a,{nodeType:{value:Node.DOCUMENT_FRAGMENT_NODE,configurable:!0},nodeName:{value:"#document-fragment",configurable:!0},nodeValue:{value:null,configurable:!0}});["localName","namespaceURI","prefix"].forEach(function(b){Object.defineProperty(a,b,{value:void 0,configurable:!0})});["ownerDocument","baseURI","isConnected"].forEach(function(b){Object.defineProperty(a,b,{get:function(){return this.host[b]},
configurable:!0})})}var Uc=y.w?function(){}:function(a){var b=w(a);b.ua||(b.ua=!0,K(a,Kc,!0),K(a,Nc,!0))},Vc=y.w?function(){}:function(a){w(a).Ea||(K(a,Oc,!0),K(a,Pc,!0))};var Wc=J.childNodes;function Xc(a,b,c){Uc(a);c=c||null;var d=w(a),e=w(b),f=c?w(c):null;d.previousSibling=c?f.previousSibling:b.lastChild;if(f=x(d.previousSibling))f.nextSibling=a;if(f=x(d.nextSibling=c))f.previousSibling=a;d.parentNode=b;c?c===e.firstChild&&(e.firstChild=a):(e.lastChild=a,e.firstChild||(e.firstChild=a));e.childNodes=null}
function Yc(a){var b=w(a);if(void 0===b.firstChild){b.childNodes=null;var c=Wc(a);b.firstChild=c[0]||null;b.lastChild=c[c.length-1]||null;Vc(a);for(b=0;b<c.length;b++){var d=c[b],e=w(d);e.parentNode=a;e.nextSibling=c[b+1]||null;e.previousSibling=c[b-1]||null;Uc(d)}}};var Zc=J.parentNode;
function $c(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=x(c);d=d&&d.parentNode;if(void 0!==d&&d!==a||void 0===d&&Zc(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;b.parentNode&&ad(b.parentNode,b);d=!0;var e,f;if(!b.__noInsertionPoint){if(f=e=Cb(a)){var g;"slot"===b.localName?g=[b]:b.querySelectorAll&&
(g=b.querySelectorAll("slot"));f=g&&g.length?g:void 0}if(f){g=e;var h=f;g.a=g.a||[];g.g=g.g||[];g.j=g.j||{};g.a.push.apply(g.a,[].concat(h instanceof Array?h:na(ma(h))))}}("slot"===a.localName||f)&&(e=e||Cb(a))&&bd(e);if(Bb(a)){e=c;Vc(a);f=w(a);void 0!==f.firstChild&&(f.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){f=b.childNodes;for(g=0;g<f.length;g++)Xc(f[g],a,e);e=w(b);f=void 0!==e.firstChild?null:void 0;e.firstChild=e.lastChild=f;e.childNodes=f}else Xc(b,a,e);e=x(a);cd(a)?(bd(e.root),
d=!1):e.root&&(d=!1)}d?(d=z(a)?a.host:a,c?(c=dd(c),A.insertBefore.call(d,b,c)):A.appendChild.call(d,b)):b.ownerDocument!==a.ownerDocument&&a.ownerDocument.adoptNode(b);ed(a,b);return b}
function ad(a,b){if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+b);var c=Cb(b),d=x(a);if(Bb(a)){var e=w(b),f=w(a);b===f.firstChild&&(f.firstChild=e.nextSibling);b===f.lastChild&&(f.lastChild=e.previousSibling);var g=e.previousSibling,h=e.nextSibling;g&&(w(g).nextSibling=h);h&&(w(h).previousSibling=g);e.parentNode=e.previousSibling=e.nextSibling=void 0;void 0!==f.childNodes&&(f.childNodes=null);if(cd(a)){bd(d.root);var k=!0}}fd(b);if(c){(e=a&&"slot"===a.localName)&&
(k=!0);if(c.g){gd(c);f=c.j;for(ba in f)for(g=f[ba],h=0;h<g.length;h++){var l=g[h];if(Nb(b,l)){g.splice(h,1);var m=c.g.indexOf(l);0<=m&&c.g.splice(m,1);h--;m=x(l);if(l=m.D)for(var n=0;n<l.length;n++){var t=l[n],C=hd(t);C&&A.removeChild.call(C,t)}m.D=[];m.assignedNodes=[];m=!0}}var ba=m}else ba=void 0;(ba||e)&&bd(c)}k||(k=z(a)?a.host:a,(!d.root&&"slot"!==b.localName||k===Zc(b))&&A.removeChild.call(k,b));ed(a,null,b);return b}
function fd(a){var b=x(a);if(b&&void 0!==b.N){b=a.childNodes;for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)fd(e)}if(a=x(a))a.N=void 0}function dd(a){var b=a;a&&"slot"===a.localName&&(b=(b=(b=x(a))&&b.D)&&b.length?b[0]:dd(a.nextSibling));return b}function cd(a){return(a=(a=x(a))&&a.root)&&id(a)}
function jd(a,b){if("slot"===b)a=a.parentNode,cd(a)&&bd(x(a).root);else if("slot"===a.localName&&"name"===b&&(b=Cb(a))){if(b.g){gd(b);var c=a.Ha,d=kd(a);if(d!==c){c=b.j[c];var e=c.indexOf(a);0<=e&&c.splice(e,1);c=b.j[d]||(b.j[d]=[]);c.push(a);1<c.length&&(b.j[d]=ld(c))}}bd(b)}}function ed(a,b,c){if(a=(a=x(a))&&a.K)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),Ub(a)}
function md(a){if(a&&a.nodeType){var b=w(a),c=b.N;void 0===c&&(z(a)?(c=a,b.N=c):(c=(c=a.parentNode)?md(c):a,A.contains.call(document.documentElement,a)&&(b.N=c)));return c}}function nd(a,b,c){var d=[];od(a.childNodes,b,c,d);return d}function od(a,b,c,d){for(var e=0,f=a.length,g;e<f&&(g=a[e]);e++){var h;if(h=g.nodeType===Node.ELEMENT_NODE){h=g;var k=b,l=c,m=d,n=k(h);n&&m.push(h);l&&l(n)?h=n:(od(h.childNodes,k,l,m),h=void 0)}if(h)break}}var pd=null;
function qd(a,b,c){pd||(pd=window.ShadyCSS&&window.ShadyCSS.ScopingShim);pd&&"class"===b?pd.setElementClass(a,c):(A.setAttribute.call(a,b,c),jd(a,b))}function rd(a,b){if(a.ownerDocument!==document||"template"===a.localName)return A.importNode.call(document,a,b);var c=A.importNode.call(document,a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=rd(a[b],!0),c.appendChild(d)}return c};var sd="__eventWrappers"+Date.now(),td=function(){var a=Object.getOwnPropertyDescriptor(Event.prototype,"composed");return a?function(b){return a.get.call(b)}:null}(),ud={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,
pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},vd={DOMAttrModified:!0,DOMAttributeNameChanged:!0,DOMCharacterDataModified:!0,DOMElementNameChanged:!0,DOMNodeInserted:!0,DOMNodeInsertedIntoDocument:!0,DOMNodeRemoved:!0,DOMNodeRemovedFromDocument:!0,DOMSubtreeModified:!0};
function wd(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function xd(a,b){if(!z)return a;a=wd(a,!0);for(var c=0,d,e,f,g;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(g=a.indexOf(f),e=f),!z(f)||-1<g)return d}
var yd={get composed(){void 0===this.R&&(td?this.R=td(this):!1!==this.isTrusted&&(this.R=ud[this.type]));return this.R||!1},composedPath:function(){this.ta||(this.ta=wd(this.__target,this.composed));return this.ta},get target(){return xd(this.currentTarget||this.__previousCurrentTarget,this.composedPath())},get relatedTarget(){if(!this.ea)return null;this.va||(this.va=wd(this.ea,!0));return xd(this.currentTarget||this.__previousCurrentTarget,this.va)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);
this.da=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);this.da=this.Da=!0}};function zd(a){function b(b,d){b=new a(b,d);b.R=d&&!!d.composed;return b}Hb(b,a);b.prototype=a.prototype;return b}var Ad={focus:!0,blur:!0};function Bd(a){return a.__target!==a.target||a.ea!==a.relatedTarget}
function Cd(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&(!Bd(a)||a.target!==a.relatedTarget)&&(e.call(b,a),!a.Da);d++);}
function Dd(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];Cd(a,d,"capture");if(a.da)return}Object.defineProperty(a,"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=x(d);f=f&&f.root;if(0===c||f&&f===e)if(Cd(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.da)break}}
function Ed(a,b,c,d,e,f){for(var g=0;g<a.length;g++){var h=a[g],k=h.type,l=h.capture,m=h.once,n=h.passive;if(b===h.node&&c===k&&d===l&&e===m&&f===n)return g}return-1}
function Fd(a,b,c){if(b){var d=typeof b;if("function"===d||"object"===d)if("object"!==d||b.handleEvent&&"function"===typeof b.handleEvent){var e=this instanceof Window?A.fb:A.addEventListener;if(vd[a])return e.call(this,a,b,c);if(c&&"object"===typeof c){var f=!!c.capture;var g=!!c.once;var h=!!c.passive}else f=!!c,h=g=!1;var k=c&&c.ga||this,l=b[sd];if(l){if(-1<Ed(l,k,a,f,g,h))return}else b[sd]=[];l=function(e){g&&this.removeEventListener(a,b,c);e.__target||Gd(e);if(k!==this){var f=Object.getOwnPropertyDescriptor(e,
"currentTarget");Object.defineProperty(e,"currentTarget",{get:function(){return k},configurable:!0})}e.__previousCurrentTarget=e.currentTarget;if(!z(k)||-1!=e.composedPath().indexOf(k))if(e.composed||-1<e.composedPath().indexOf(k))if(Bd(e)&&e.target===e.relatedTarget)e.eventPhase===Event.BUBBLING_PHASE&&e.stopImmediatePropagation();else if(e.eventPhase===Event.CAPTURING_PHASE||e.bubbles||e.target===k||k instanceof Window){var h="function"===d?b.call(k,e):b.handleEvent&&b.handleEvent(e);k!==this&&
(f?(Object.defineProperty(e,"currentTarget",f),f=null):delete e.currentTarget);return h}};b[sd].push({node:k,type:a,capture:f,once:g,passive:h,hb:l});Ad[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][f?"capture":"bubble"].push(l)):e.call(this,a,l,c)}}}
function Hd(a,b,c){if(b){var d=this instanceof Window?A.gb:A.removeEventListener;if(vd[a])return d.call(this,a,b,c);if(c&&"object"===typeof c){var e=!!c.capture;var f=!!c.once;var g=!!c.passive}else e=!!c,g=f=!1;var h=c&&c.ga||this,k=void 0;var l=null;try{l=b[sd]}catch(m){}l&&(f=Ed(l,h,a,e,f,g),-1<f&&(k=l.splice(f,1)[0].hb,l.length||(b[sd]=void 0)));d.call(this,a,k||b,c);k&&Ad[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][e?"capture":"bubble"],k=a.indexOf(k),-1<k&&a.splice(k,1))}}
function Id(){for(var a in Ad)window.addEventListener(a,function(a){a.__target||(Gd(a),Dd(a))},!0)}function Gd(a){a.__target=a.target;a.ea=a.relatedTarget;if(y.w){var b=Object.getPrototypeOf(a);if(!b.hasOwnProperty("__patchProto")){var c=Object.create(b);c.jb=b;Fb(c,yd);b.__patchProto=c}a.__proto__=b.__patchProto}else Fb(a,yd)}var Jd=zd(window.Event),Kd=zd(window.CustomEvent),Ld=zd(window.MouseEvent);
function Md(){window.Event=Jd;window.CustomEvent=Kd;window.MouseEvent=Ld;Id();if(!td&&Object.getOwnPropertyDescriptor(Event.prototype,"isTrusted")){var a=function(){var a=new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(a)};Element.prototype.click?Element.prototype.click=a:HTMLElement.prototype.click&&(HTMLElement.prototype.click=a)}};function Nd(a,b){return{index:a,O:[],X:b}}
function Od(a,b,c,d){var e=0,f=0,g=0,h=0,k=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(g=0;g<k;g++)if(a[g]!==c[g])break a;g=k}if(b==a.length&&d==c.length){h=a.length;for(var l=c.length,m=0;m<k-g&&Pd(a[--h],c[--l]);)m++;h=m}e+=g;f+=g;b-=h;d-=h;if(0==b-e&&0==d-f)return[];if(e==b){for(b=Nd(e,0);f<d;)b.O.push(c[f++]);return[b]}if(f==d)return[Nd(e,b-e)];k=e;g=f;d=d-g+1;h=b-k+1;b=Array(d);for(l=0;l<d;l++)b[l]=Array(h),b[l][0]=l;for(l=0;l<h;l++)b[0][l]=l;for(l=1;l<d;l++)for(m=1;m<h;m++)if(a[k+m-1]===c[g+l-1])b[l][m]=
b[l-1][m-1];else{var n=b[l-1][m]+1,t=b[l][m-1]+1;b[l][m]=n<t?n:t}k=b.length-1;g=b[0].length-1;d=b[k][g];for(a=[];0<k||0<g;)0==k?(a.push(2),g--):0==g?(a.push(3),k--):(h=b[k-1][g-1],l=b[k-1][g],m=b[k][g-1],n=l<m?l<h?l:h:m<h?m:h,n==h?(h==d?a.push(0):(a.push(1),d=h),k--,g--):n==l?(a.push(3),k--,d=l):(a.push(2),g--,d=m));a.reverse();b=void 0;k=[];for(g=0;g<a.length;g++)switch(a[g]){case 0:b&&(k.push(b),b=void 0);e++;f++;break;case 1:b||(b=Nd(e,0));b.X++;e++;b.O.push(c[f]);f++;break;case 2:b||(b=Nd(e,0));
b.X++;e++;break;case 3:b||(b=Nd(e,0)),b.O.push(c[f]),f++}b&&k.push(b);return k}function Pd(a,b){return a===b};var hd=J.parentNode,Qd=J.childNodes,Rd={},Sd=y.deferConnectionCallbacks&&"loading"===document.readyState,Td;function Ud(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}
function Tc(a,b,c){if(a!==Rd)throw new TypeError("Illegal constructor");this.Ma="ShadyRoot";this.host=b;this.c=c&&c.mode;Yc(b);a=w(b);a.root=this;a.za="closed"!==this.c?this:null;a=w(this);a.firstChild=a.lastChild=a.parentNode=a.nextSibling=a.previousSibling=null;a.childNodes=[];this.b=this.W=!1;this.a=this.j=this.g=null;bd(this)}function bd(a){a.W||(a.W=!0,Rb(function(){return Vd(a)}))}
function Vd(a){for(var b;a;){a.W&&(b=a);a:{var c=a;a=c.host.getRootNode();if(z(a))for(var d=c.host.childNodes,e=0;e<d.length;e++)if(c=d[e],"slot"==c.localName)break a;a=void 0}}b&&b._renderRoot()}
Tc.prototype._renderRoot=function(){var a=Sd;Sd=!0;this.W=!1;if(this.g){gd(this);for(var b=0,c;b<this.g.length;b++){c=this.g[b];var d=x(c),e=d.assignedNodes;d.assignedNodes=[];d.D=[];if(d.la=e)for(d=0;d<e.length;d++){var f=x(e[d]);f.U=f.assignedSlot;f.assignedSlot===c&&(f.assignedSlot=null)}}for(c=this.host.firstChild;c;c=c.nextSibling)Wd(this,c);for(b=0;b<this.g.length;b++){c=this.g[b];e=x(c);if(!e.assignedNodes.length)for(d=c.firstChild;d;d=d.nextSibling)Wd(this,d,c);(d=(d=x(c.parentNode))&&d.root)&&
id(d)&&d._renderRoot();Xd(this,e.D,e.assignedNodes);if(d=e.la){for(f=0;f<d.length;f++)x(d[f]).U=null;e.la=null;d.length>e.assignedNodes.length&&(e.Z=!0)}e.Z&&(e.Z=!1,Yd(this,c))}b=this.g;c=[];for(e=0;e<b.length;e++)d=b[e].parentNode,(f=x(d))&&f.root||!(0>c.indexOf(d))||c.push(d);for(b=0;b<c.length;b++){e=c[b];d=e===this?this.host:e;f=[];e=e.childNodes;for(var g=0;g<e.length;g++){var h=e[g];if("slot"==h.localName){h=x(h).D;for(var k=0;k<h.length;k++)f.push(h[k])}else f.push(h)}e=void 0;g=Qd(d);h=Od(f,
f.length,g,g.length);for(var l=k=0;k<h.length&&(e=h[k]);k++){for(var m=0,n;m<e.O.length&&(n=e.O[m]);m++)hd(n)===d&&A.removeChild.call(d,n),g.splice(e.index+l,1);l-=e.X}for(l=0;l<h.length&&(e=h[l]);l++)for(k=g[e.index],m=e.index;m<e.index+e.X;m++)n=f[m],A.insertBefore.call(d,n,k),g.splice(m,0,n)}}if(!this.b)for(n=this.host.childNodes,c=0,b=n.length;c<b;c++)e=n[c],d=x(e),hd(e)!==this.host||"slot"!==e.localName&&d.assignedSlot||A.removeChild.call(this.host,e);this.b=!0;Sd=a;Td&&Td()};
function Wd(a,b,c){var d=w(b),e=d.U;d.U=null;c||(c=(a=a.j[b.slot||"__catchall"])&&a[0]);c?(w(c).assignedNodes.push(b),d.assignedSlot=c):d.assignedSlot=void 0;e!==d.assignedSlot&&d.assignedSlot&&(w(d.assignedSlot).Z=!0)}function Xd(a,b,c){for(var d=0,e;d<c.length&&(e=c[d]);d++)if("slot"==e.localName){var f=x(e).assignedNodes;f&&f.length&&Xd(a,b,f)}else b.push(c[d])}function Yd(a,b){A.dispatchEvent.call(b,new Event("slotchange"));b=x(b);b.assignedSlot&&Yd(a,b.assignedSlot)}
function gd(a){if(a.a&&a.a.length){for(var b=a.a,c,d=0;d<b.length;d++){var e=b[d];Yc(e);Yc(e.parentNode);var f=kd(e);a.j[f]?(c=c||{},c[f]=!0,a.j[f].push(e)):a.j[f]=[e];a.g.push(e)}if(c)for(var g in c)a.j[g]=ld(a.j[g]);a.a=[]}}function kd(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.Ha=b}function ld(a){return a.sort(function(a,c){a=Ud(a);for(var b=Ud(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})}
function id(a){gd(a);return!(!a.g||!a.g.length)}
if(window.customElements&&y.na){var Zd=new Map;Td=function(){var a=Array.from(Zd);Zd.clear();a=ma(a);for(var b=a.next();!b.done;b=a.next()){b=ma(b.value);var c=b.next().value;b.next().value?c.Fa():c.Ga()}};Sd&&document.addEventListener("readystatechange",function(){Sd=!1;Td()},{once:!0});var $d=function(a,b,c){var d=0,e="__isConnected"+d++;if(b||c)a.prototype.connectedCallback=a.prototype.Fa=function(){Sd?Zd.set(this,!0):this[e]||(this[e]=!0,b&&b.call(this))},a.prototype.disconnectedCallback=a.prototype.Ga=
function(){Sd?this.isConnected||Zd.set(this,!1):this[e]&&(this[e]=!1,c&&c.call(this))};return a},define=window.customElements.define;Object.defineProperty(window.CustomElementRegistry.prototype,"define",{value:function(a,b){var c=b.prototype.connectedCallback,d=b.prototype.disconnectedCallback;define.call(window.customElements,a,$d(b,c,d));b.prototype.connectedCallback=c;b.prototype.disconnectedCallback=d}})};function ae(a){var b=a.getRootNode();z(b)&&Vd(b);return(a=x(a))&&a.assignedSlot||null}
var be={addEventListener:Fd.bind(window),removeEventListener:Hd.bind(window)},ce={addEventListener:Fd,removeEventListener:Hd,appendChild:function(a){return $c(this,a)},insertBefore:function(a,b){return $c(this,a,b)},removeChild:function(a){return ad(this,a)},replaceChild:function(a,b){$c(this,a,b);ad(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=A.cloneNode.call(this,a);else if(b=A.cloneNode.call(this,!1),a&&b.nodeType!==Node.ATTRIBUTE_NODE){a=this.childNodes;for(var c=
0,d;c<a.length;c++)d=a[c].cloneNode(!0),b.appendChild(d)}return b},getRootNode:function(){return md(this)},contains:function(a){return Nb(this,a)},dispatchEvent:function(a){Sb();return A.dispatchEvent.call(this,a)}};
Object.defineProperties(ce,{isConnected:{get:function(){if(Ic&&Ic.call(this))return!0;if(this.nodeType==Node.DOCUMENT_FRAGMENT_NODE)return!1;var a=this.ownerDocument;if(Mb){if(A.contains.call(a,this))return!0}else if(a.documentElement&&A.contains.call(a.documentElement,this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(z(a)?a.host:void 0);return!!(a&&a instanceof Document)},configurable:!0}});
var de={get assignedSlot(){return ae(this)}},ee={querySelector:function(a){return nd(this,function(b){return Eb.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a,b){if(b){b=Array.prototype.slice.call(A.querySelectorAll.call(this,a));var c=this.getRootNode();return b.filter(function(a){return a.getRootNode()==c})}return nd(this,function(b){return Eb.call(b,a)})}},fe={assignedNodes:function(a){if("slot"===this.localName){var b=this.getRootNode();z(b)&&Vd(b);return(b=x(this))?
(a&&a.flatten?b.D:b.assignedNodes)||[]:[]}}},ge=Gb({setAttribute:function(a,b){qd(this,a,b)},removeAttribute:function(a){A.removeAttribute.call(this,a);jd(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";return new Tc(Rd,this,a)},get slot(){return this.getAttribute("slot")},set slot(a){qd(this,"slot",a)},get assignedSlot(){return ae(this)}},ee,fe);Object.defineProperties(ge,Pc);
var he=Gb({importNode:function(a,b){return rd(a,b)},getElementById:function(a){return nd(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},ee);Object.defineProperties(he,{_activeElement:Qc.activeElement});
for(var ie=HTMLElement.prototype.blur,je={blur:function(){var a=x(this);(a=(a=a&&a.root)&&a.activeElement)?a.blur():ie.call(this)}},ke={},le=ma(Object.getOwnPropertyNames(Document.prototype)),me=le.next();!me.done;ke={u:ke.u},me=le.next())ke.u=me.value,"on"===ke.u.substring(0,2)&&Object.defineProperty(je,ke.u,{set:function(a){return function(b){var c=w(this),d=a.u.substring(2);c.S[a.u]&&this.removeEventListener(d,c.S[a.u]);this.addEventListener(d,b,{});c.S[a.u]=b}}(ke),get:function(a){return function(){var b=
x(this);return b&&b.S[a.u]}}(ke),configurable:!0});var ne={addEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ga=this;this.host.addEventListener(a,b,c)},removeEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ga=this;this.host.removeEventListener(a,b,c)},getElementById:function(a){return nd(this,function(b){return b.id==a},function(a){return!!a})[0]||null}};
function L(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}};if(y.na){var ShadyDOM={inUse:y.na,patch:function(a){Vc(a);Uc(a);return a},isShadyRoot:z,enqueue:Rb,flush:Sb,settings:y,filterMutations:Yb,observeChildren:Wb,unobserveChildren:Xb,nativeMethods:A,nativeTree:J,deferConnectionCallbacks:y.deferConnectionCallbacks};window.ShadyDOM=ShadyDOM;Md();var oe=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;L(Tc.prototype,ne);L(window.Node.prototype,ce);L(window.Window.prototype,be);L(window.Text.prototype,de);L(window.DocumentFragment.prototype,
ee);L(window.Element.prototype,ge);L(window.Document.prototype,he);window.HTMLSlotElement&&L(window.HTMLSlotElement.prototype,fe);L(oe.prototype,je);y.w&&(Rc(window.Node.prototype),Rc(window.Text.prototype),Rc(window.DocumentFragment.prototype),Rc(window.Element.prototype),Rc(oe.prototype),Rc(window.Document.prototype),window.HTMLSlotElement&&Rc(window.HTMLSlotElement.prototype));Sc();window.ShadowRoot=Tc};var pe=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function qe(a){var b=pe.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function M(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}
function re(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
function se(a,b,c){c=void 0===c?new Set:c;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)se(d,b,c);d=re(a,e);continue}else if("template"===f){d=re(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)se(e,b,c)}d=d.firstChild?d.firstChild:re(a,d)}}function N(a,b,c){a[b]=c};function te(){this.a=new Map;this.o=new Map;this.i=[];this.c=!1}function ue(a,b,c){a.a.set(b,c);a.o.set(c.constructor,c)}function ve(a,b){a.c=!0;a.i.push(b)}function we(a,b){a.c&&se(b,function(b){return a.b(b)})}te.prototype.b=function(a){if(this.c&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this.i.length;b++)this.i[b](a)}};function O(a,b){var c=[];se(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state?a.connectedCallback(d):xe(a,d)}}
function P(a,b){var c=[];se(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state&&a.disconnectedCallback(d)}}
function Q(a,b,c){c=void 0===c?{}:c;var d=c.eb||new Set,e=c.ca||function(b){return xe(a,b)},f=[];se(b,function(b){if("link"===b.localName&&"import"===b.getAttribute("rel")){var c=b.import;c instanceof Node&&(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0);c&&"complete"===c.readyState?c.__CE_documentLoadHandled=!0:b.addEventListener("load",function(){var c=b.import;if(!c.__CE_documentLoadHandled){c.__CE_documentLoadHandled=!0;var f=new Set(d);f.delete(c);Q(a,c,{eb:f,ca:e})}})}else f.push(b)},d);
if(a.c)for(b=0;b<f.length;b++)a.b(f[b]);for(b=0;b<f.length;b++)e(f[b])}
function xe(a,b){if(void 0===b.__CE_state){var c=b.ownerDocument;if(c.defaultView||c.__CE_isImportDocument&&c.__CE_hasRegistry)if(c=a.a.get(b.localName)){c.constructionStack.push(b);var d=c.constructor;try{try{if(new d!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(g){throw b.__CE_state=2,g;}b.__CE_state=1;b.__CE_definition=c;if(c.attributeChangedCallback)for(c=c.observedAttributes,d=0;d<c.length;d++){var e=c[d],
f=b.getAttribute(e);null!==f&&a.attributeChangedCallback(b,e,null,f,null)}M(b)&&a.connectedCallback(b)}}}te.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};te.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
te.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,c,d,e)};function ye(a){var b=document;this.l=a;this.a=b;this.H=void 0;Q(this.l,this.a);"loading"===this.a.readyState&&(this.H=new MutationObserver(this.b.bind(this)),this.H.observe(this.a,{childList:!0,subtree:!0}))}function ze(a){a.H&&a.H.disconnect()}ye.prototype.b=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||ze(this);for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)Q(this.l,c[d])};function Ae(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}Ae.prototype.resolve=function(a){if(this.a)throw Error("Already resolved.");this.a=a;this.b&&this.b(a)};function R(a){this.ia=!1;this.l=a;this.ma=new Map;this.ja=function(a){return a()};this.T=!1;this.ka=[];this.Ka=new ye(a)}p=R.prototype;
p.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!qe(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.l.a.get(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.ia)throw Error("A custom element is already being defined.");this.ia=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error("The '"+a+"' callback must be a function.");
return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=d("connectedCallback");var g=d("disconnectedCallback");var h=d("adoptedCallback");var k=d("attributeChangedCallback");var l=b.observedAttributes||[]}catch(m){return}finally{this.ia=!1}b={localName:a,constructor:b,connectedCallback:f,disconnectedCallback:g,adoptedCallback:h,attributeChangedCallback:k,observedAttributes:l,constructionStack:[]};ue(this.l,a,b);this.ka.push(b);
this.T||(this.T=!0,this.ja(function(){return Be(c)}))};p.ca=function(a){Q(this.l,a)};
function Be(a){if(!1!==a.T){a.T=!1;for(var b=a.ka,c=[],d=new Map,e=0;e<b.length;e++)d.set(b[e].localName,[]);Q(a.l,document,{ca:function(b){if(void 0===b.__CE_state){var e=b.localName,f=d.get(e);f?f.push(b):a.l.a.get(e)&&c.push(b)}}});for(e=0;e<c.length;e++)xe(a.l,c[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=d.get(f.localName);for(var g=0;g<f.length;g++)xe(a.l,f[g]);(e=a.ma.get(e))&&e.resolve(void 0)}}}p.get=function(a){if(a=this.l.a.get(a))return a.constructor};
p.whenDefined=function(a){if(!qe(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.ma.get(a);if(b)return b.c;b=new Ae;this.ma.set(a,b);this.l.a.get(a)&&!this.ka.some(function(b){return b.localName===a})&&b.resolve(void 0);return b.c};p.$a=function(a){ze(this.Ka);var b=this.ja;this.ja=function(c){return a(function(){return b(c)})}};window.CustomElementRegistry=R;R.prototype.define=R.prototype.define;R.prototype.upgrade=R.prototype.ca;
R.prototype.get=R.prototype.get;R.prototype.whenDefined=R.prototype.whenDefined;R.prototype.polyfillWrapFlushCallback=R.prototype.$a;var Ce=window.Document.prototype.createElement,De=window.Document.prototype.createElementNS,Ee=window.Document.prototype.importNode,Fe=window.Document.prototype.prepend,Ge=window.Document.prototype.append,He=window.DocumentFragment.prototype.prepend,Ie=window.DocumentFragment.prototype.append,Je=window.Node.prototype.cloneNode,Ke=window.Node.prototype.appendChild,Le=window.Node.prototype.insertBefore,Me=window.Node.prototype.removeChild,Ne=window.Node.prototype.replaceChild,Oe=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),Pe=window.Element.prototype.attachShadow,Qe=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Re=window.Element.prototype.getAttribute,Se=window.Element.prototype.setAttribute,Te=window.Element.prototype.removeAttribute,Ue=window.Element.prototype.getAttributeNS,Ve=window.Element.prototype.setAttributeNS,We=window.Element.prototype.removeAttributeNS,Xe=window.Element.prototype.insertAdjacentElement,Ye=window.Element.prototype.insertAdjacentHTML,Ze=window.Element.prototype.prepend,
$e=window.Element.prototype.append,af=window.Element.prototype.before,bf=window.Element.prototype.after,cf=window.Element.prototype.replaceWith,df=window.Element.prototype.remove,ef=window.HTMLElement,ff=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),gf=window.HTMLElement.prototype.insertAdjacentElement,hf=window.HTMLElement.prototype.insertAdjacentHTML;var jf=new function(){};function kf(){var a=lf;window.HTMLElement=function(){function b(){var b=this.constructor,d=a.o.get(b);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(0===e.length)return e=Ce.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.b(e),e;d=e.length-1;var f=e[d];if(f===jf)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[d]=jf;Object.setPrototypeOf(f,b.prototype);a.b(f);return f}b.prototype=ef.prototype;Object.defineProperty(b.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});return b}()};function mf(a,b,c){function d(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var f=[],l=0;l<d.length;l++){var m=d[l];m instanceof Element&&M(m)&&f.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)e.push(m);else e.push(m)}b.apply(this,d);for(d=0;d<f.length;d++)P(a,f[d]);if(M(this))for(d=0;d<e.length;d++)f=e[d],f instanceof Element&&O(a,f)}}void 0!==c.aa&&(b.prepend=d(c.aa));void 0!==c.append&&(b.append=d(c.append))};function nf(){var a=lf;N(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var c=a.a.get(b);if(c)return new c.constructor}b=Ce.call(this,b);a.b(b);return b});N(Document.prototype,"importNode",function(b,c){b=Ee.call(this,b,c);this.__CE_hasRegistry?Q(a,b):we(a,b);return b});N(Document.prototype,"createElementNS",function(b,c){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var d=a.a.get(c);if(d)return new d.constructor}b=De.call(this,b,c);a.b(b);return b});
mf(a,Document.prototype,{aa:Fe,append:Ge})};function of(){var a=lf;function b(b,d){Object.defineProperty(b,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var e=this.childNodes,h=e.length;if(0<h&&M(this)){c=Array(h);for(var k=0;k<h;k++)c[k]=e[k]}}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)P(a,c[b])}}})}N(Node.prototype,"insertBefore",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);
b=Le.call(this,b,d);if(M(this))for(d=0;d<c.length;d++)O(a,c[d]);return b}c=M(b);d=Le.call(this,b,d);c&&P(a,b);M(this)&&O(a,b);return d});N(Node.prototype,"appendChild",function(b){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Ke.call(this,b);if(M(this))for(var e=0;e<c.length;e++)O(a,c[e]);return b}c=M(b);e=Ke.call(this,b);c&&P(a,b);M(this)&&O(a,b);return e});N(Node.prototype,"cloneNode",function(b){b=Je.call(this,b);this.ownerDocument.__CE_hasRegistry?Q(a,b):
we(a,b);return b});N(Node.prototype,"removeChild",function(b){var c=M(b),e=Me.call(this,b);c&&P(a,b);return e});N(Node.prototype,"replaceChild",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Ne.call(this,b,d);if(M(this))for(P(a,d),d=0;d<c.length;d++)O(a,c[d]);return b}c=M(b);var f=Ne.call(this,b,d),g=M(this);g&&P(a,d);c&&P(a,b);g&&O(a,b);return f});Oe&&Oe.get?b(Node.prototype,Oe):ve(a,function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=
[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)Me.call(this,this.firstChild);Ke.call(this,document.createTextNode(a))}})})};function pf(a){var b=Element.prototype;function c(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e-0]=arguments[e];e=[];for(var h=[],k=0;k<d.length;k++){var l=d[k];l instanceof Element&&M(l)&&h.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)e.push(l);else e.push(l)}b.apply(this,d);for(d=0;d<h.length;d++)P(a,h[d]);if(M(this))for(d=0;d<e.length;d++)h=e[d],h instanceof Element&&O(a,h)}}void 0!==af&&(b.before=c(af));void 0!==af&&(b.after=c(bf));void 0!==
cf&&N(b,"replaceWith",function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=[];for(var g=[],h=0;h<c.length;h++){var k=c[h];k instanceof Element&&M(k)&&g.push(k);if(k instanceof DocumentFragment)for(k=k.firstChild;k;k=k.nextSibling)d.push(k);else d.push(k)}h=M(this);cf.apply(this,c);for(c=0;c<g.length;c++)P(a,g[c]);if(h)for(P(a,this),c=0;c<d.length;c++)g=d[c],g instanceof Element&&O(a,g)});void 0!==df&&N(b,"remove",function(){var b=M(this);df.call(this);b&&P(a,this)})};function qf(){var a=lf;function b(b,c){Object.defineProperty(b,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(b){var d=this,e=void 0;M(this)&&(e=[],se(this,function(a){a!==d&&e.push(a)}));c.set.call(this,b);if(e)for(var f=0;f<e.length;f++){var g=e[f];1===g.__CE_state&&a.disconnectedCallback(g)}this.ownerDocument.__CE_hasRegistry?Q(a,this):we(a,this);return b}})}function c(b,c){N(b,"insertAdjacentElement",function(b,d){var e=M(d);b=c.call(this,b,d);e&&P(a,d);M(b)&&O(a,
d);return b})}function d(b,c){function d(b,c){for(var d=[];b!==c;b=b.nextSibling)d.push(b);for(c=0;c<d.length;c++)Q(a,d[c])}N(b,"insertAdjacentHTML",function(a,b){a=a.toLowerCase();if("beforebegin"===a){var e=this.previousSibling;c.call(this,a,b);d(e||this.parentNode.firstChild,this)}else if("afterbegin"===a)e=this.firstChild,c.call(this,a,b),d(this.firstChild,e);else if("beforeend"===a)e=this.lastChild,c.call(this,a,b),d(e||this.firstChild,null);else if("afterend"===a)e=this.nextSibling,c.call(this,
a,b),d(this.nextSibling,e);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}Pe&&N(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=Pe.call(this,a)});Qe&&Qe.get?b(Element.prototype,Qe):ff&&ff.get?b(HTMLElement.prototype,ff):ve(a,function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return Je.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName,c=b?this.content:
this,d=De.call(document,this.namespaceURI,this.localName);for(d.innerHTML=a;0<c.childNodes.length;)Me.call(c,c.childNodes[0]);for(a=b?d.content:d;0<a.childNodes.length;)Ke.call(c,a.childNodes[0])}})});N(Element.prototype,"setAttribute",function(b,c){if(1!==this.__CE_state)return Se.call(this,b,c);var d=Re.call(this,b);Se.call(this,b,c);c=Re.call(this,b);a.attributeChangedCallback(this,b,d,c,null)});N(Element.prototype,"setAttributeNS",function(b,c,d){if(1!==this.__CE_state)return Ve.call(this,b,c,
d);var e=Ue.call(this,b,c);Ve.call(this,b,c,d);d=Ue.call(this,b,c);a.attributeChangedCallback(this,c,e,d,b)});N(Element.prototype,"removeAttribute",function(b){if(1!==this.__CE_state)return Te.call(this,b);var c=Re.call(this,b);Te.call(this,b);null!==c&&a.attributeChangedCallback(this,b,c,null,null)});N(Element.prototype,"removeAttributeNS",function(b,c){if(1!==this.__CE_state)return We.call(this,b,c);var d=Ue.call(this,b,c);We.call(this,b,c);var e=Ue.call(this,b,c);d!==e&&a.attributeChangedCallback(this,
c,d,e,b)});gf?c(HTMLElement.prototype,gf):Xe?c(Element.prototype,Xe):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");hf?d(HTMLElement.prototype,hf):Ye?d(Element.prototype,Ye):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");mf(a,Element.prototype,{aa:Ze,append:$e});pf(a)};var rf=window.customElements;if(!rf||rf.forcePolyfill||"function"!=typeof rf.define||"function"!=typeof rf.get){var lf=new te;kf();nf();mf(lf,DocumentFragment.prototype,{aa:He,append:Ie});of();qf();document.__CE_hasRegistry=!0;var customElements=new R(lf);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};function sf(){this.end=this.start=0;this.rules=this.parent=this.previous=null;this.cssText=this.parsedCssText="";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=""}
function tf(a){a=a.replace(uf,"").replace(Af,"");var b=Bf,c=a,d=new sf;d.start=0;d.end=c.length;for(var e=d,f=0,g=c.length;f<g;f++)if("{"===c[f]){e.rules||(e.rules=[]);var h=e,k=h.rules[h.rules.length-1]||null;e=new sf;e.start=f+1;e.parent=h;e.previous=k;h.rules.push(e)}else"}"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}
function Bf(a,b){var c=b.substring(a.start,a.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?a.previous.end:a.parent.start,a.start-1),c=Cf(c),c=c.replace(Df," "),c=c.substring(c.lastIndexOf(";")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf("@"),a.atRule?0===c.indexOf("@media")?a.type=Ef:c.match(Ff)&&(a.type=Gf,a.keyframesName=a.selector.split(Df).pop()):a.type=0===c.indexOf("--")?Hf:If);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)Bf(f,
b);return a}function Cf(a){return a.replace(/\\([0-9a-f]{1,6})\s/gi,function(a,c){a=c;for(c=6-a.length;c--;)a="0"+a;return"\\"+a})}
function Jf(a,b,c){c=void 0===c?"":c;var d="";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf("--"));if(f){f=0;for(var g=e.length,h;f<g&&(h=e[f]);f++)d=Jf(h,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(Kf,"").replace(Lf,""),b=b.replace(Mf,"").replace(Nf,"")),(d=b.trim())&&(d="  "+d+"\n")}d&&(a.selector&&(c+=a.selector+" {\n"),c+=d,a.selector&&(c+="}\n\n"));return c}
var If=1,Gf=7,Ef=4,Hf=1E3,uf=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,Af=/@import[^;]*;/gim,Kf=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,Lf=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,Mf=/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,Nf=/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,Ff=/^@[^\s]*keyframes/,Df=/\s+/g;var S=!(window.ShadyDOM&&window.ShadyDOM.inUse),Of;function Pf(a){Of=a&&a.shimcssproperties?!1:S||!(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)||!window.CSS||!CSS.supports||!CSS.supports("box-shadow","0 0 0 var(--foo)"))}window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?Of=window.ShadyCSS.nativeCss:window.ShadyCSS?(Pf(window.ShadyCSS),window.ShadyCSS=void 0):Pf(window.WebComponents&&window.WebComponents.flags);var U=Of;var Qf=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,Rf=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,Sf=/(--[\w-]+)\s*([:,;)]|$)/gi,Tf=/(animation\s*:)|(animation-name\s*:)/,Uf=/@media\s(.*)/,Vf=/\{[^}]*\}/g;var Wf=new Set;function Xf(a,b){if(!a)return"";"string"===typeof a&&(a=tf(a));b&&Yf(a,b);return Jf(a,U)}function Zf(a){!a.__cssRules&&a.textContent&&(a.__cssRules=tf(a.textContent));return a.__cssRules||null}function $f(a){return!!a.parent&&a.parent.type===Gf}function Yf(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===Ef){var g=a.selector.match(Uf);g&&(window.matchMedia(g[1]).matches||(e=!0))}f===If?b(a):c&&f===Gf?c(a):f===Hf&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var h;e<f&&(h=a[e]);e++)Yf(h,b,c,d)}}}
function ag(a,b,c,d){var e=document.createElement("style");b&&e.setAttribute("scope",b);e.textContent=a;bg(e,c,d);return e}var cg=null;function dg(a){a=document.createComment(" Shady DOM styles for "+a+" ");var b=document.head;b.insertBefore(a,(cg?cg.nextSibling:null)||b.firstChild);return cg=a}function bg(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);cg?a.compareDocumentPosition(cg)===Node.DOCUMENT_POSITION_PRECEDING&&(cg=a):cg=a}
function eg(a,b){for(var c=0,d=a.length;b<d;b++)if("("===a[b])c++;else if(")"===a[b]&&0===--c)return b;return-1}function fg(a,b){var c=a.indexOf("var(");if(-1===c)return b(a,"","","");var d=eg(a,c+3),e=a.substring(c+4,d);c=a.substring(0,c);a=fg(a.substring(d+1),b);d=e.indexOf(",");return-1===d?b(c,e.trim(),"",a):b(c,e.substring(0,d).trim(),e.substring(d+1).trim(),a)}function gg(a,b){S?a.setAttribute("class",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,"class",b)}
function hg(a){var b=a.localName,c="";b?-1<b.indexOf("-")||(c=b,b=a.getAttribute&&a.getAttribute("is")||""):(b=a.is,c=a.extends);return{is:b,P:c}}function ig(a){for(var b=[],c="",d=0;0<=d&&d<a.length;d++)if("("===a[d]){var e=eg(a,d);c+=a.slice(d,e+1);d=e}else","===a[d]?(b.push(c),c=""):c+=a[d];c&&b.push(c);return b};function jg(){}function kg(a,b){var c=W;a.__styleScoped?a.__styleScoped=null:lg(c,a,function(a){mg(a,b||"")})}function lg(a,b,c){b.nodeType===Node.ELEMENT_NODE&&c(b);if(b="template"===b.localName?(b.content||b.kb||b).childNodes:b.children||b.childNodes)for(var d=0;d<b.length;d++)lg(a,b[d],c)}
function mg(a,b,c){if(b)if(a.classList)c?(a.classList.remove("style-scope"),a.classList.remove(b)):(a.classList.add("style-scope"),a.classList.add(b));else if(a.getAttribute){var d=a.getAttribute(ng);c?d&&(b=d.replace("style-scope","").replace(b,""),gg(a,b)):gg(a,(d?d+" ":"")+"style-scope "+b)}}function og(a,b,c){var d=W;a.__styleScoped?a.__styleScoped=null:lg(d,a,function(a){mg(a,b,!0);mg(a,c)})}function pg(a,b){var c=W;a.__styleScoped?a.__styleScoped=null:lg(c,a,function(a){mg(a,b||"",!0)})}
function qg(a,b,c){var d=W,e=a.__cssBuild;S||"shady"===e?b=Xf(b,c):(a=hg(a),b=rg(d,b,a.is,a.P,c)+"\n\n");return b.trim()}function rg(a,b,c,d,e){var f=sg(c,d);c=c?tg+c:"";return Xf(b,function(b){b.c||(b.selector=b.s=ug(a,b,a.b,c,f),b.c=!0);e&&e(b,c,f)})}function sg(a,b){return b?"[is="+a+"]":a}function ug(a,b,c,d,e){var f=ig(b.selector);if(!$f(b)){b=0;for(var g=f.length,h;b<g&&(h=f[b]);b++)f[b]=c.call(a,h,d,e)}return f.filter(function(a){return!!a}).join(vg)}
function wg(a){return a.replace(xg,function(a,c,d){-1<d.indexOf("+")?d=d.replace(/\+/g,"___"):-1<d.indexOf("___")&&(d=d.replace(/___/g,"+"));return":"+c+"("+d+")"})}function yg(a){for(var b=[],c;c=a.match(zg);){var d=c.index,e=eg(a,d);if(-1===e)throw Error(c.input+" selector missing ')'");c=a.slice(d,e+1);a=a.replace(c,"\ue000");b.push(c)}return{pa:a,matches:b}}function Ag(a,b){var c=a.split("\ue000");return b.reduce(function(a,b,f){return a+b+c[f+1]},c[0])}
jg.prototype.b=function(a,b,c){var d=!1;a=a.trim();var e=xg.test(a);e&&(a=a.replace(xg,function(a,b,c){return":"+b+"("+c.replace(/\s/g,"")+")"}),a=wg(a));var f=zg.test(a);if(f){var g=yg(a);a=g.pa;g=g.matches}a=a.replace(Bg,Cg+" $1");a=a.replace(Dg,function(a,e,f){d||(a=Eg(f,e,b,c),d=d||a.stop,e=a.Pa,f=a.value);return e+f});f&&(a=Ag(a,g));e&&(a=wg(a));return a};
function Eg(a,b,c,d){var e=a.indexOf(Fg);0<=a.indexOf(Cg)?a=Gg(a,d):0!==e&&(a=c?Hg(a,c):a);c=!1;0<=e&&(b="",c=!0);if(c){var f=!0;c&&(a=a.replace(Ig,function(a,b){return" > "+b}))}a=a.replace(Jg,function(a,b,c){return'[dir="'+c+'"] '+b+", "+b+'[dir="'+c+'"]'});return{value:a,Pa:b,stop:f}}function Hg(a,b){a=a.split(Kg);a[0]+=b;return a.join(Kg)}
function Gg(a,b){var c=a.match(Lg);return(c=c&&c[2].trim()||"")?c[0].match(Mg)?a.replace(Lg,function(a,c,f){return b+f}):c.split(Mg)[0]===b?c:Ng:a.replace(Cg,b)}function Og(a){a.selector===Pg&&(a.selector="html")}jg.prototype.c=function(a){return a.match(Cg)?"":a.match(Fg)?this.b(a,Qg):Hg(a.trim(),Qg)};ea.Object.defineProperties(jg.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"style-scope"}}});
var xg=/:(nth[-\w]+)\(([^)]+)\)/,Qg=":not(.style-scope)",vg=",",Dg=/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,Mg=/[[.:#*]/,Cg=":host",Pg=":root",Fg="::slotted",Bg=new RegExp("^("+Fg+")"),Lg=/(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,Ig=/(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,Jg=/(.*):dir\((?:(ltr|rtl))\)/,tg=".",Kg=":",ng="class",Ng="should_not_match",zg=/:(?:matches|any|-(?:webkit|moz)-any)/,W=new jg;function Rg(a,b,c,d){this.B=a||null;this.b=b||null;this.oa=c||[];this.L=null;this.P=d||"";this.a=this.v=this.G=null}function X(a){return a?a.__styleInfo:null}function Sg(a,b){return a.__styleInfo=b}Rg.prototype.c=function(){return this.B};Rg.prototype._getStyleRules=Rg.prototype.c;function Tg(a){var b=this.matches||this.matchesSelector||this.mozMatchesSelector||this.msMatchesSelector||this.oMatchesSelector||this.webkitMatchesSelector;return b&&b.call(this,a)}var Ug=navigator.userAgent.match("Trident");function Vg(){}function Wg(a){var b={},c=[],d=0;Yf(a,function(a){Xg(a);a.index=d++;a=a.m.cssText;for(var c;c=Sf.exec(a);){var e=c[1];":"!==c[2]&&(b[e]=!0)}},function(a){c.push(a)});a.b=c;a=[];for(var e in b)a.push(e);return a}
function Xg(a){if(!a.m){var b={},c={};Yg(a,c)&&(b.A=c,a.rules=null);b.cssText=a.parsedCssText.replace(Vf,"").replace(Qf,"");a.m=b}}function Yg(a,b){var c=a.m;if(c){if(c.A)return Object.assign(b,c.A),!0}else{c=a.parsedCssText;for(var d;a=Qf.exec(c);){d=(a[2]||a[3]).trim();if("inherit"!==d||"unset"!==d)b[a[1].trim()]=d;d=!0}return d}}
function Zg(a,b,c){b&&(b=0<=b.indexOf(";")?$g(a,b,c):fg(b,function(b,e,f,g){if(!e)return b+g;(e=Zg(a,c[e],c))&&"initial"!==e?"apply-shim-inherit"===e&&(e="inherit"):e=Zg(a,c[f]||f,c)||f;return b+(e||"")+g}));return b&&b.trim()||""}
function $g(a,b,c){b=b.split(";");for(var d=0,e,f;d<b.length;d++)if(e=b[d]){Rf.lastIndex=0;if(f=Rf.exec(e))e=Zg(a,c[f[1]],c);else if(f=e.indexOf(":"),-1!==f){var g=e.substring(f);g=g.trim();g=Zg(a,g,c)||g;e=e.substring(0,f)+g}b[d]=e&&e.lastIndexOf(";")===e.length-1?e.slice(0,-1):e||""}return b.join(";")}
function ah(a,b){var c={},d=[];Yf(a,function(a){a.m||Xg(a);var e=a.s||a.parsedSelector;b&&a.m.A&&e&&Tg.call(b,e)&&(Yg(a,c),a=a.index,e=parseInt(a/32,10),d[e]=(d[e]||0)|1<<a%32)},null,!0);return{A:c,key:d}}
function bh(a,b,c,d){b.m||Xg(b);if(b.m.A){var e=hg(a);a=e.is;e=e.P;e=a?sg(a,e):"html";var f=b.parsedSelector,g=":host > *"===f||"html"===f,h=0===f.indexOf(":host")&&!g;"shady"===c&&(g=f===e+" > *."+e||-1!==f.indexOf("html"),h=!g&&0===f.indexOf(e));"shadow"===c&&(g=":host > *"===f||"html"===f,h=h&&!g);if(g||h)c=e,h&&(b.s||(b.s=ug(W,b,W.b,a?tg+a:"",e)),c=b.s||e),d({pa:c,Va:h,ub:g})}}
function ch(a,b){var c={},d={},e=b&&b.__cssBuild;Yf(b,function(b){bh(a,b,e,function(e){Tg.call(a.lb||a,e.pa)&&(e.Va?Yg(b,c):Yg(b,d))})},null,!0);return{ab:d,Ta:c}}
function dh(a,b,c,d){var e=hg(b),f=sg(e.is,e.P),g=new RegExp("(?:^|[^.#[:])"+(b.extends?"\\"+f.slice(0,-1)+"\\]":f)+"($|[.:[\\s>+~])");e=X(b).B;var h=eh(e,d);return qg(b,e,function(b){var e="";b.m||Xg(b);b.m.cssText&&(e=$g(a,b.m.cssText,c));b.cssText=e;if(!S&&!$f(b)&&b.cssText){var k=e=b.cssText;null==b.xa&&(b.xa=Tf.test(e));if(b.xa)if(null==b.$){b.$=[];for(var n in h)k=h[n],k=k(e),e!==k&&(e=k,b.$.push(n))}else{for(n=0;n<b.$.length;++n)k=h[b.$[n]],e=k(e);k=e}b.cssText=k;b.s=b.s||b.selector;e="."+
d;n=ig(b.s);k=0;for(var t=n.length,C;k<t&&(C=n[k]);k++)n[k]=C.match(g)?C.replace(f,e):e+" "+C;b.selector=n.join(",")}})}function eh(a,b){a=a.b;var c={};if(!S&&a)for(var d=0,e=a[d];d<a.length;e=a[++d]){var f=e,g=b;f.i=new RegExp("\\b"+f.keyframesName+"(?!\\B|-)","g");f.a=f.keyframesName+"-"+g;f.s=f.s||f.selector;f.selector=f.s.replace(f.keyframesName,f.a);c[e.keyframesName]=fh(e)}return c}function fh(a){return function(b){return b.replace(a.i,a.a)}}
function gh(a,b){var c=hh,d=Zf(a);a.textContent=Xf(d,function(a){var d=a.cssText=a.parsedCssText;a.m&&a.m.cssText&&(d=d.replace(Kf,"").replace(Lf,""),a.cssText=$g(c,d,b))})}ea.Object.defineProperties(Vg.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"x-scope"}}});var hh=new Vg;var ih={},jh=window.customElements;if(jh&&!S){var kh=jh.define;jh.define=function(a,b,c){ih[a]||(ih[a]=dg(a));kh.call(jh,a,b,c)}};function lh(){this.cache={}}lh.prototype.store=function(a,b,c,d){var e=this.cache[a]||[];e.push({A:b,styleElement:c,v:d});100<e.length&&e.shift();this.cache[a]=e};lh.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d],f;a:{for(f=0;f<c.length;f++){var g=c[f];if(e.A[g]!==b[g]){f=!1;break a}}f=!0}if(f)return e}};function mh(){}
function nh(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var g=e;var h=[];g.classList?h=Array.from(g.classList):g instanceof window.SVGElement&&g.hasAttribute("class")&&(h=g.getAttribute("class").split(/\s+/));g=h;h=g.indexOf(W.a);if((g=-1<h?g[h+1]:"")&&f===e.ownerDocument)pg(e,g);else if(f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(f=
f.host))for(f=hg(f).is,f!==g&&og(e,g,f),e=window.ShadyDOM.nativeMethods.querySelectorAll.call(e,":not(."+W.a+")"),f=0;f<e.length;f++)if(g=e[f],h=g.getRootNode().host)h=hg(h).is,mg(g,h)}}}}
if(!S){var oh=new MutationObserver(nh),ph=function(a){oh.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)ph(document);else{var qh=function(){ph(document.body)};window.HTMLImports?window.HTMLImports.whenReady(qh):requestAnimationFrame(function(){if("loading"===document.readyState){var a=function(){qh();document.removeEventListener("readystatechange",a)};document.addEventListener("readystatechange",a)}else qh()})}mh=function(){nh(oh.takeRecords())}}
var rh=mh;var sh={};var th=Promise.resolve();function uh(a){if(a=sh[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function vh(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}function wh(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.b||(a.b=!0,th.then(function(){a._applyShimCurrentVersion=a._applyShimNextVersion;a.b=!1}))};var xh=new lh;function Y(){this.J={};this.c=document.documentElement;var a=new sf;a.rules=[];this.i=Sg(this.c,new Rg(a));this.o=!1;this.b=this.a=null}p=Y.prototype;p.qa=function(){rh()};p.Ra=function(a){return Zf(a)};p.cb=function(a){return Xf(a)};p.prepareTemplate=function(a,b,c){this.prepareTemplateDom(a,b);this.prepareTemplateStyles(a,b,c)};
p.prepareTemplateStyles=function(a,b,c){if(!a.o){S||ih[b]||(ih[b]=dg(b));a.o=!0;a.name=b;a.extends=c;sh[b]=a;var d=(d=a.content.querySelector("style"))?d.getAttribute("css-build")||"":"";var e=[];for(var f=a.content.querySelectorAll("style"),g=0;g<f.length;g++){var h=f[g];if(h.hasAttribute("shady-unscoped")){if(!S){var k=h.textContent;Wf.has(k)||(Wf.add(k),k=h.cloneNode(!0),document.head.appendChild(k));h.parentNode.removeChild(h)}}else e.push(h.textContent),h.parentNode.removeChild(h)}e=e.join("").trim();
c={is:b,extends:c,ib:d};yh(this);f=Rf.test(e)||Qf.test(e);Rf.lastIndex=0;Qf.lastIndex=0;e=tf(e);f&&U&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.J=d;d=[];U||(d=Wg(a._styleAst));if(!d.length||U)e=S?a.content:null,b=ih[b]||null,f=qg(c,a._styleAst),b=f.length?ag(f,c.is,e,b):void 0,a.a=b;a.i=d}};p.prepareTemplateDom=function(a,b){S||a.c||(a.c=!0,kg(a.content,b))};
function zh(a){!a.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&(a.b=window.ShadyCSS.CustomStyleInterface,a.b.transformCallback=function(b){a.Ba(b)},a.b.validateCallback=function(){requestAnimationFrame(function(){(a.b.enqueued||a.o)&&a.flushCustomStyles()})})}function yh(a){!a.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(a.a=window.ShadyCSS.ApplyShim,a.a.invalidCallback=uh);zh(a)}
p.flushCustomStyles=function(){yh(this);if(this.b){var a=this.b.processStyles();if(this.b.enqueued){if(U)for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);if(c&&U&&this.a){var d=Zf(c);yh(this);this.a.transformRules(d);c.textContent=Xf(d)}}else for(Ah(this,this.c,this.i),b=0;b<a.length;b++)(c=this.b.getStyleForCustomStyle(a[b]))&&gh(c,this.i.G);this.b.enqueued=!1;this.o&&!U&&this.styleDocument()}}};
p.styleElement=function(a,b){var c=hg(a).is,d=X(a);if(!d){var e=hg(a);d=e.is;e=e.P;var f=ih[d]||null;d=sh[d];if(d){var g=d._styleAst;var h=d.i}g=new Rg(g,f,h,e);d&&Sg(a,g);d=g}a!==this.c&&(this.o=!0);b&&(d.L=d.L||{},Object.assign(d.L,b));if(U){if(d.L){b=d.L;for(var k in b)null===k?a.style.removeProperty(k):a.style.setProperty(k,b[k])}if(((k=sh[c])||a===this.c)&&k&&k.a&&!vh(k)){if(vh(k)||k._applyShimValidatingVersion!==k._applyShimNextVersion)yh(this),this.a&&this.a.transformRules(k._styleAst,c),k.a.textContent=
qg(a,d.B),wh(k);S&&(c=a.shadowRoot)&&(c.querySelector("style").textContent=qg(a,d.B));d.B=k._styleAst}}else if(this.qa(),Ah(this,a,d),d.oa&&d.oa.length){c=d;k=hg(a).is;d=(b=xh.fetch(k,c.G,c.oa))?b.styleElement:null;g=c.v;(h=b&&b.v)||(h=this.J[k]=(this.J[k]||0)+1,h=k+"-"+h);c.v=h;h=c.v;e=hh;e=d?d.textContent||"":dh(e,a,c.G,h);f=X(a);var l=f.a;l&&!S&&l!==d&&(l._useCount--,0>=l._useCount&&l.parentNode&&l.parentNode.removeChild(l));S?f.a?(f.a.textContent=e,d=f.a):e&&(d=ag(e,h,a.shadowRoot,f.b)):d?d.parentNode||
(Ug&&-1<e.indexOf("@media")&&(d.textContent=e),bg(d,null,f.b)):e&&(d=ag(e,h,null,f.b));d&&(d._useCount=d._useCount||0,f.a!=d&&d._useCount++,f.a=d);h=d;S||(d=c.v,f=e=a.getAttribute("class")||"",g&&(f=e.replace(new RegExp("\\s*x-scope\\s*"+g+"\\s*","g")," ")),f+=(f?" ":"")+"x-scope "+d,e!==f&&gg(a,f));b||xh.store(k,c.G,h,c.v)}};function Bh(a,b){return(b=b.getRootNode().host)?X(b)?b:Bh(a,b):a.c}
function Ah(a,b,c){a=Bh(a,b);var d=X(a);a=Object.create(d.G||null);var e=ch(b,c.B);b=ah(d.B,b).A;Object.assign(a,e.Ta,b,e.ab);b=c.L;for(var f in b)if((e=b[f])||0===e)a[f]=e;f=hh;b=Object.getOwnPropertyNames(a);for(e=0;e<b.length;e++)d=b[e],a[d]=Zg(f,a[d],a);c.G=a}p.styleDocument=function(a){this.styleSubtree(this.c,a)};
p.styleSubtree=function(a,b){var c=a.shadowRoot;(c||a===this.c)&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};p.Ba=function(a){var b=this,c=Zf(a);Yf(c,function(a){if(S)Og(a);else{var c=W;a.selector=a.parsedSelector;Og(a);a.selector=a.s=ug(c,a,c.c,void 0,void 0)}U&&(yh(b),b.a&&b.a.transformRule(a))});U?a.textContent=Xf(c):this.i.B.rules.push(c)};
p.getComputedStyleValue=function(a,b){var c;U||(c=(X(a)||X(Bh(this,a))).G[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?c.trim():""};p.bb=function(a,b){var c=a.getRootNode();b=b?b.split(/\s/):[];c=c.host&&c.host.localName;if(!c){var d=a.getAttribute("class");if(d){d=d.split(/\s/);for(var e=0;e<d.length;e++)if(d[e]===W.a){c=d[e+1];break}}}c&&b.push(W.a,c);U||(c=X(a))&&c.v&&b.push(hh.a,c.v);gg(a,b.join(" "))};p.Oa=function(a){return X(a)};Y.prototype.flush=Y.prototype.qa;
Y.prototype.prepareTemplate=Y.prototype.prepareTemplate;Y.prototype.styleElement=Y.prototype.styleElement;Y.prototype.styleDocument=Y.prototype.styleDocument;Y.prototype.styleSubtree=Y.prototype.styleSubtree;Y.prototype.getComputedStyleValue=Y.prototype.getComputedStyleValue;Y.prototype.setElementClass=Y.prototype.bb;Y.prototype._styleInfoForNode=Y.prototype.Oa;Y.prototype.transformCustomStyleForDocument=Y.prototype.Ba;Y.prototype.getStyleAst=Y.prototype.Ra;Y.prototype.styleAstToString=Y.prototype.cb;
Y.prototype.flushCustomStyles=Y.prototype.flushCustomStyles;Object.defineProperties(Y.prototype,{nativeShadow:{get:function(){return S}},nativeCss:{get:function(){return U}}});var Z=new Y,Ch,Dh;window.ShadyCSS&&(Ch=window.ShadyCSS.ApplyShim,Dh=window.ShadyCSS.CustomStyleInterface);
window.ShadyCSS={ScopingShim:Z,prepareTemplate:function(a,b,c){Z.flushCustomStyles();Z.prepareTemplate(a,b,c)},prepareTemplateDom:function(a,b){Z.prepareTemplateDom(a,b)},prepareTemplateStyles:function(a,b,c){Z.flushCustomStyles();Z.prepareTemplateStyles(a,b,c)},styleSubtree:function(a,b){Z.flushCustomStyles();Z.styleSubtree(a,b)},styleElement:function(a){Z.flushCustomStyles();Z.styleElement(a)},styleDocument:function(a){Z.flushCustomStyles();Z.styleDocument(a)},flushCustomStyles:function(){Z.flushCustomStyles()},
getComputedStyleValue:function(a,b){return Z.getComputedStyleValue(a,b)},nativeCss:U,nativeShadow:S};Ch&&(window.ShadyCSS.ApplyShim=Ch);Dh&&(window.ShadyCSS.CustomStyleInterface=Dh);var Eh=window.customElements,Fh=window.HTMLImports,Gh=window.HTMLTemplateElement;window.WebComponents=window.WebComponents||{};if(Eh&&Eh.polyfillWrapFlushCallback){var Hh,Ih=function(){if(Hh){Gh.C&&Gh.C(window.document);var a=Hh;Hh=null;a();return!0}},Jh=Fh.whenReady;Eh.polyfillWrapFlushCallback(function(a){Hh=a;Jh(Ih)});Fh.whenReady=function(a){Jh(function(){Ih()?Fh.whenReady(a):a()})}}
Fh.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})});var Kh=document.createElement("style");Kh.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var Lh=document.querySelector("head");Lh.insertBefore(Kh,Lh.firstChild);}).call(this);



},{"process":"../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel/node_modules/process/browser.js"}],"polyfills.ts":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("@webcomponents/webcomponentsjs");
},{"core-js/modules/web.timers":"../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"../node_modules/core-js/modules/web.dom.iterable.js","@webcomponents/webcomponentsjs":"../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"}],"../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45901" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel/src/builtins/hmr-runtime.js","polyfills.ts"], null)
//# sourceMappingURL=/flags/polyfills.94ad76bc.js.map