import fs from "fs";
import path from "path";
import { IMAGE_PATH, SAVE_EXT } from "../constants/constants";

function deleteFromDb(filename) {
  const filepath = path.join(__dirname, `${IMAGE_PATH}${filename}${SAVE_EXT}`);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    const dbPath = path.join(__dirname, `../public/db.json`);
    var data = JSON.parse(
      fs.readFileSync(dbPath, { encoding: "utf8", flag: "r" })
    );
    data.images = data.images.filter(item => item !== `${filename}${SAVE_EXT}`);
    fs.writeFileSync(dbPath, JSON.stringify(data));
    console.log(`${filename} was deleted`);
    return true;
  }
  console.log(`${filename} does not exist`);
  return false;
}

export default deleteFromDb;
