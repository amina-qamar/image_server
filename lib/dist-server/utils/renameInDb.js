"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _validateFilename3 = _interopRequireDefault(require("./validateFilename"));

var _constants = require("../constants/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function renameInDb(newName, oldName) {
  var _validateFilename = (0, _validateFilename3["default"])(newName),
      _validateFilename2 = _slicedToArray(_validateFilename, 2),
      valid = _validateFilename2[0],
      info = _validateFilename2[1];

  if (!valid) {
    console.log(info);
    return [valid, info];
  }

  var oldPath = _path["default"].join(__dirname, "".concat(_constants.IMAGE_PATH).concat(oldName).concat(_constants.SAVE_EXT));

  var newPath = _path["default"].join(__dirname, "".concat(_constants.IMAGE_PATH).concat(newName).concat(_constants.SAVE_EXT));

  if (_fs["default"].existsSync(newPath)) {
    console.log("Sorry this name ".concat(newName, " already exists"));
    return [false, "Sorry this name ".concat(newName, " already exists")];
  }

  if (_fs["default"].existsSync(oldPath)) {
    _fs["default"].renameSync(oldPath, newPath);

    var dbPath = _path["default"].join(__dirname, "../public/db.json");

    var data = JSON.parse(_fs["default"].readFileSync(dbPath, {
      encoding: "utf8",
      flag: "r"
    }));
    data.images = data.images.filter(function (item) {
      return item !== "".concat(oldName).concat(_constants.SAVE_EXT);
    });
    data.images.push("".concat(newName).concat(_constants.SAVE_EXT));

    _fs["default"].writeFileSync(dbPath, JSON.stringify(data));

    console.log("".concat(oldName, " was renamed to ").concat(newName, " successfully!"));
    return [true, "".concat(oldName, " was renamed to ").concat(newName, " successfully!")];
  }

  return [false, "Sorry the file ".concat(oldName, " does not exist")];
}

var _default = renameInDb;
exports["default"] = _default;