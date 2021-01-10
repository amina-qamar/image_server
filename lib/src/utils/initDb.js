import fs from "fs";
import path from "path";

function initDb() {
  const absFilepath = path.join(__dirname, `../public/db.json`);
  fs.open(absFilepath, "r", function(err, fd) {
    if (err) {
      fs.writeFileSync(absFilepath, JSON.stringify({ images: [] }));
      console.log("DB initialized successfully");
    } else {
      console.log("DB already initialized!");
    }
  });
}

export default initDb;
