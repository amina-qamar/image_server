"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _saveToDb3 = _interopRequireDefault(require("./utils/saveToDb"));

var _renameInDb3 = _interopRequireDefault(require("./utils/renameInDb"));

var _deleteFromDb = _interopRequireDefault(require("./utils/deleteFromDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "./public/index.html"));
});
app.post("/save", function (req, res) {
  var _req$body = req.body,
      filename = _req$body.filename,
      filepath = _req$body.filepath;

  try {
    var _saveToDb = (0, _saveToDb3["default"])(filename.toLowerCase().trim(), filepath.trim()),
        _saveToDb2 = _slicedToArray(_saveToDb, 2),
        saveSuccessful = _saveToDb2[0],
        info = _saveToDb2[1];

    if (saveSuccessful) {
      res.send("Image was saved!");
    } else {
      res.send(info);
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});
app.post("/delete", function (req, res) {
  var filename = req.body.filename;

  try {
    var deleteSuccessful = (0, _deleteFromDb["default"])(filename.toLowerCase().trim());

    if (deleteSuccessful) {
      res.send("".concat(filename, " was deleted"));
    } else {
      res.send("".concat(filename, " does not exist"));
    }
  } catch (err) {
    console.error(err);
  }
});
app.post("/rename", function (req, res) {
  var _req$body2 = req.body,
      newName = _req$body2.newName,
      oldName = _req$body2.oldName;

  try {
    var _renameInDb = (0, _renameInDb3["default"])(newName.toLowerCase().trim(), oldName.toLowerCase().trim()),
        _renameInDb2 = _slicedToArray(_renameInDb, 2),
        renameSuccessful = _renameInDb2[0],
        info = _renameInDb2[1];

    res.send(info);
    return;
  } catch (err) {
    console.error(err);
  }
});
app.listen(3000, function () {
  console.log("Server is listening on port 3000...");
});