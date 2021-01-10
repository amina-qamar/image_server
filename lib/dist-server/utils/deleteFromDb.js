"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _constants = require("../constants/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function deleteFromDb(filename) {
  var filepath = _path["default"].join(__dirname, "".concat(_constants.IMAGE_PATH).concat(filename).concat(_constants.SAVE_EXT));

  if (_fs["default"].existsSync(filepath)) {
    _fs["default"].unlinkSync(filepath);

    var dbPath = _path["default"].join(__dirname, "../public/db.json");

    var data = JSON.parse(_fs["default"].readFileSync(dbPath, {
      encoding: "utf8",
      flag: "r"
    }));
    data.images = data.images.filter(function (item) {
      return item !== "".concat(filename).concat(_constants.SAVE_EXT);
    });

    _fs["default"].writeFileSync(dbPath, JSON.stringify(data));

    console.log("".concat(filename, " was deleted"));
    return true;
  }

  console.log("".concat(filename, " does not exist"));
  return false;
}

var _default = deleteFromDb;
exports["default"] = _default;