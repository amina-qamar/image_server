import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import validateFilename from "./utils/validateFilename";

const IMAGE_PATH = "/public/images/";
const SAVE_EXT = ".jpg";

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/save", function(req, res) {
  const { name, filepath } = req.body;
  const absFilepath = path.join(__dirname, filepath);
  try {
    if (fs.existsSync(absFilepath)) {
      const ext = filepath.substr(filepath.lastIndexOf(".")).toLowerCase();
      const [valid, info] = validateFilename(name, ext);
      if (!valid) {
        console.log(info);
        res.send(info);
        return;
      }

      fs.copyFile(
        absFilepath,
        path.join(__dirname, `${IMAGE_PATH}${name.toLowerCase()}${SAVE_EXT}`),
        err => {
          if (err) throw err;
          console.log("File was copied to destination");
          res.send("Image saved!");
          return;
        }
      );
    } else {
      console.log(`Path ${filepath} does not exist`);
      res.send(`Provided path ${filepath} does not exist`);
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.post("/delete", function(req, res) {
  const { name } = req.body;
  const filepath = path.join(__dirname, `${IMAGE_PATH}${name}${SAVE_EXT}`);
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log("File was deleted");
      res.send(`${name} was deleted`);
    } else {
      console.log(`${name} does not exist`);
      res.send(`${name} does not exist`);
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/rename", function(req, res) {
  const { newName, oldName } = req.body;
  try {
    const [valid, info] = validateFilename(newName);
    if (!valid) {
      console.log(info);
      res.send(info);
      return;
    }
    const oldPath = path.join(
      __dirname,
      `${IMAGE_PATH}${oldName.toLowerCase().trim()}${SAVE_EXT}`
    );
    const newPath = path.join(
      __dirname,
      `${IMAGE_PATH}${newName.toLowerCase().trim()}${SAVE_EXT}`
    );

    if (fs.existsSync(newPath)) {
      console.log(`Sorry this name ${newName} already exists`);
      res.send(`Sorry this name ${newName} already exists`);
      return;
    }

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      // fs.rename(oldPath, newPath, function(err) {
      //   if (err) throw err;
      //   console.log("File was renamed successfully!");
      // });
      res.send(`${oldName} was renamed to ${newName} successfully!`);
    } else {
      console.log(`Path ${oldPath} does not exist`);
      res.send(`Provided path ${oldPath} does not exist`);
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000...");
});
