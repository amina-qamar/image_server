import path from "path";
import express from "express";
import bodyParser from "body-parser";
import saveToDb from "./utils/saveToDb";
import renameInDb from "./utils/renameInDb";
import deleteFromDb from "./utils/deleteFromDb";

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/save", function(req, res) {
  const { filename, filepath } = req.body;
  try {
    const [saveSuccessful, info] = saveToDb(
      filename.toLowerCase().trim(),
      filepath.trim()
    );
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

app.post("/delete", function(req, res) {
  const { filename } = req.body;
  try {
    const deleteSuccessful = deleteFromDb(filename.toLowerCase().trim());
    if (deleteSuccessful) {
      res.send(`${filename} was deleted`);
    } else {
      res.send(`${filename} does not exist`);
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/rename", function(req, res) {
  const { newName, oldName } = req.body;
  try {
    const [renameSuccessful, info] = renameInDb(
      newName.toLowerCase().trim(),
      oldName.toLowerCase().trim()
    );

    res.send(info);
    return;
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000...");
});
