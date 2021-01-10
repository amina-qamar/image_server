import fs from "fs";
import path from "path";

function createFile() {
  const absFilepath = path.join(__dirname, `../public/db.json`);
  fs.open(absFilepath, "r", function(err, fd) {
    if (err) {
      fs.writeFile(absFilepath, JSON.stringify({ images: [] }), function(err) {
        if (err) {
          console.log(err);
        }
        console.log("The file was saved!");
      });
    } else {
      console.log("The file exists!");
    }
  });
}

export default createFile;
