const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const IMAGE_PATH = "./images/";
const SAVE_EXT = ".jpg";

app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.post("/save", function(req, res) {
  const { name, path } = req.body;

  try {
    if (fs.existsSync(path)) {
      var ext = path.substr(path.lastIndexOf(".")).toLowerCase();
      if (!name.trim()) {
        console.log("Please provide a valid name");
        res.send("Please provide a valid name");
        return;
      }
      if (ext !== ".jpg" && ext !== ".jpeg") {
        console.log("Sorry we are only supporting jpeg and jpg for now");
        res.send("Sorry we are only supporting jpeg and jpg for now");
        return;
      }
      fs.copyFile(path, `./images/${name.toLowerCase()}${SAVE_EXT}`, err => {
        if (err) throw err;
        console.log("File was copied to destination");
      });
      res.send("Image saved!");
    }
    console.log(`Path ${path} does not exist`);
    res.send(`Provided path ${path} does not exist`);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.post("/delete", function(req, res) {
  const { path } = req.body;

  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File was deleted");
      res.send(`File ${path} was deleted`);
    }
    console.log(`Path ${path} does not exist`);
    res.send(`Provided path ${path} does not exist`);
  } catch (err) {
    console.error(err);
  }
});

app.post("/rename", function(req, res) {
  const { newName, oldName } = req.body;

  try {
    if (!newName.trim()) {
      console.log("Please provide a valid name");
      res.send("Please provide a valid name");
      return;
    }

    if (!/^[0-9a-zA-Z]+$/.test(newName.trim())) {
      console.log(`Provided name ${newName} is not alphanumeric`);
      res.send(`Provided name ${newName} is not alphanumeric`);
      return;
    }

    const oldPath = `${IMAGE_PATH}${oldName.toLowerCase().trim()}${SAVE_EXT}`;
    const newPath = `${IMAGE_PATH}${newName.toLowerCase().trim()}${SAVE_EXT}`;

    if (fs.existsSync(newPath)) {
      console.log(`Sorry this name ${newName} already exists`);
      res.send(`Sorry this name ${newName} already exists`);
      return;
    }

    if (fs.existsSync(oldPath)) {
      fs.rename(oldPath, newPath, function(err) {
        if (err) throw err;
        console.log("File was renamed successfully!");
      });
      res.send("File was renamed successfully!");
    }
    console.log(`Path ${oldPath} does not exist`);
    res.send(`Provided path ${oldPath} does not exist`);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000...");
});
