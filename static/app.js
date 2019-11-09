/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/index.ts":
/*!*************************!*\
  !*** ./client/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar message_1 = __webpack_require__(/*! ../game/message */ \"./game/message.ts\");\nvar world_1 = __webpack_require__(/*! ../game/world */ \"./game/world.ts\");\nvar tile_1 = __webpack_require__(/*! ../game/tile */ \"./game/tile.ts\");\nvar v4_1 = __importDefault(__webpack_require__(/*! uuid/v4 */ \"./node_modules/uuid/v4.js\"));\nvar action_1 = __webpack_require__(/*! ../game/action */ \"./game/action.ts\");\nvar token = window.localStorage.getItem('token');\nif (token == null) {\n    token = v4_1.default();\n    window.localStorage.setItem('token', token);\n    console.log(\"Generating new token \" + token);\n}\nfunction send(action) {\n    var m = new message_1.Message(v4_1.default(), action);\n    socket.emit('message', m.serialize());\n}\nfunction pxs(val) {\n    return val.toString() + 'px';\n}\nvar chars = ['&#8283;', '&#8483;', '&#775;', '&#803;', '&#856;'];\nfunction renderWorld(w, x, y) {\n    var width = 50;\n    var height = 50;\n    var tiles = [];\n    for (var i = 0; i < width; i++) {\n        tiles[i] = [];\n        for (var j = 0; j < height; j++) {\n            tiles[i][j] = new tile_1.Tile();\n            // tiles[i][j].character = '.';\n            //tiles[i][j].character = '@';\n            // add 85 to what you think it is\n            //tiles[i][j].character = '&#261;';\n            //tiles[i][j].character = '&#8492;';\n            //tiles[i][j].character = '&#8483;';\n            tiles[i][j].character = chars[Math.floor((Math.random() * 5))];\n        }\n    }\n    var world = new world_1.World(tiles);\n    w = world;\n    var body = document.getElementsByTagName('body')[0];\n    console.log(body);\n    console.log(tiles);\n    // Create a div to contain the world\n    var worldDiv = document.createElement(\"div\");\n    worldDiv.style.width = pxs(15 * tiles[0].length);\n    worldDiv.style.height = pxs(15 * tiles.length);\n    worldDiv.style.position = \"relative\";\n    worldDiv.style.margin = \"auto\";\n    //worldDiv.style.left = pxs(x);\n    //worldDiv.style.top = pxs(y);\n    // Start creating a div for each row and then each cell of the row\n    for (var i = 0; i < w.tiles.length; i++) {\n        var rowDiv = document.createElement(\"div\");\n        rowDiv.style.height = pxs(15);\n        rowDiv.style.display = 'flex';\n        for (var j = 0; j < w.tiles[0].length; j++) {\n            var elementDiv = document.createElement(\"div\");\n            elementDiv.style.height = pxs(15); //'15px'; \n            elementDiv.style.width = pxs(15); //'15px';\n            elementDiv.innerHTML = tiles[i][j].character;\n            elementDiv.style.textAlign = \"center\";\n            elementDiv.style.userSelect = \"none\";\n            rowDiv.appendChild(elementDiv);\n        }\n        worldDiv.appendChild(rowDiv);\n    }\n    // Then insert the tile's character centered in the tile\n    body.appendChild(worldDiv);\n    console.log(body);\n}\nvar socket = io('http://localhost:8080');\nsend(new action_1.ConnectAction(token));\nrenderWorld(null, 0, 0);\n//renderWorld(null, window.innerWidth / 2, window.innerHeight / 2);\n\n\n//# sourceURL=webpack:///./client/index.ts?");

/***/ }),

/***/ "./game/action.ts":
/*!************************!*\
  !*** ./game/action.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ConnectAction = /** @class */ (function () {\n    function ConnectAction(token) {\n        this.token = token;\n    }\n    ConnectAction.prototype.update = function (w) {\n        return w;\n    };\n    ConnectAction.prototype.serialize = function () {\n        return JSON.stringify({ token: this.token });\n    };\n    return ConnectAction;\n}());\nexports.ConnectAction = ConnectAction;\n\n\n//# sourceURL=webpack:///./game/action.ts?");

/***/ }),

/***/ "./game/message.ts":
/*!*************************!*\
  !*** ./game/message.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Message = /** @class */ (function () {\n    function Message(id, action) {\n        this.id = id;\n        this.body = action;\n    }\n    Message.prototype.serialize = function () {\n        return JSON.stringify({\n            id: this.id,\n            body: this.body.serialize()\n        });\n    };\n    return Message;\n}());\nexports.Message = Message;\n\n\n//# sourceURL=webpack:///./game/message.ts?");

/***/ }),

/***/ "./game/tile.ts":
/*!**********************!*\
  !*** ./game/tile.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Tile = /** @class */ (function () {\n    function Tile() {\n    }\n    return Tile;\n}());\nexports.Tile = Tile;\n\n\n//# sourceURL=webpack:///./game/tile.ts?");

/***/ }),

/***/ "./game/world.ts":
/*!***********************!*\
  !*** ./game/world.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar World = /** @class */ (function () {\n    function World(tiles) {\n        this.tiles = tiles;\n    }\n    return World;\n}());\nexports.World = World;\n\n\n//# sourceURL=webpack:///./game/world.ts?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ })

/******/ });