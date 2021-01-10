import fs from "fs";
import path from "path";
import validateFilename from "./validateFilename";
import { IMAGE_PATH, SAVE_EXT } from "../constants/constants";

function renameInDb(newName, oldName) {
  const [valid, info] = validateFilename(newName);
  if (!valid) {
    console.log(info);
    return [valid, info];
  }
  const oldPath = path.join(__dirname, `${IMAGE_PATH}${oldName}${SAVE_EXT}`);
  const newPath = path.join(__dirname, `${IMAGE_PATH}${newName}${SAVE_EXT}`);
  if (fs.existsSync(newPath)) {
    console.log(`Sorry this name ${newName} already exists`);
    return [false, `Sorry this name ${newName} already exists`];
  }
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    const dbPath = path.join(__dirname, `../public/db.json`);
    var data = JSON.parse(
      fs.readFileSync(dbPath, { encoding: "utf8", flag: "r" })
    );
    data.images = data.images.filter(item => item !== `${oldName}${SAVE_EXT}`);
    data.images.push(`${newName}${SAVE_EXT}`);
    fs.writeFileSync(dbPath, JSON.stringify(data));
    console.log(`${oldName} was renamed to ${newName} successfully!`);
    return [true, `${oldName} was renamed to ${newName} successfully!`];
  }
  return [false, `Sorry the file ${oldName} does not exist`];
}

export default renameInDb;
