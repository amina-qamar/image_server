"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function initDb() {
  var absFilepath = _path["default"].join(__dirname, "../public/db.json");

  _fs["default"].open(absFilepath, "r", function (err, fd) {
    if (err) {
      _fs["default"].writeFileSync(absFilepath, JSON.stringify({
        images: []
      }));

      console.log("DB initialized successfully");
    } else {
      console.log("DB already initialized!");
    }
  });
}

var _default = initDb;
exports["default"] = _default;