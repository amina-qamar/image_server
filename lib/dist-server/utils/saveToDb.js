"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _initDb = _interopRequireDefault(require("./initDb"));

var _validateFilename3 = _interopRequireDefault(require("./validateFilename"));

var _constants = require("../constants/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function saveToDb(filename, filepath) {
  var copyFromFilePath = _path["default"].join(__dirname, "../".concat(filepath));

  var copyToFilePath = _path["default"].join(__dirname, "".concat(_constants.IMAGE_PATH).concat(filename).concat(_constants.SAVE_EXT));

  var dbPath = _path["default"].join(__dirname, "../public/db.json");

  if (_fs["default"].existsSync(copyFromFilePath)) {
    var ext = copyFromFilePath.substr(copyFromFilePath.lastIndexOf(".")).toLowerCase();

    var _validateFilename = (0, _validateFilename3["default"])(filename, ext),
        _validateFilename2 = _slicedToArray(_validateFilename, 2),
        valid = _validateFilename2[0],
        info = _validateFilename2[1];

    if (!valid) {
      return [valid, info];
    }

    var data = JSON.parse(_fs["default"].readFileSync(dbPath, {
      encoding: "utf8",
      flag: "r"
    }));

    if (data.images.includes("".concat(filename).concat(_constants.SAVE_EXT))) {
      return [false, "A file by this name ".concat(filename, " already exists")];
    }

    if (data.images.length > 10) {
      console.log("Exceeded storage limit of ".concat(_constants.IMAGE_LIMIT));
      return [false, "Exceeded storage limit of ".concat(_constants.IMAGE_LIMIT)];
    }

    _fs["default"].copyFileSync(copyFromFilePath, copyToFilePath);

    data.images.push("".concat(filename).concat(_constants.SAVE_EXT));

    _fs["default"].writeFileSync(dbPath, JSON.stringify(data));

    return [true];
  }

  console.log("Path ".concat(filepath, " does not exist"));
  return [false, "Path ".concat(filepath, " does not exist")];
}

var _default = saveToDb;
exports["default"] = _default;