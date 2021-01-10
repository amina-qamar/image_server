import fs from "fs";
import path from "path";
import initDb from "./initDb";
import validateFilename from "./validateFilename";
import { IMAGE_LIMIT, IMAGE_PATH, SAVE_EXT } from "../constants/constants";

function saveToDb(filename, filepath) {
  const copyFromFilePath = path.join(__dirname, `../${filepath}`);
  const copyToFilePath = path.join(
    __dirname,
    `${IMAGE_PATH}${filename}${SAVE_EXT}`
  );
  const dbPath = path.join(__dirname, `../public/db.json`);
  if (fs.existsSync(copyFromFilePath)) {
    const ext = copyFromFilePath
      .substr(copyFromFilePath.lastIndexOf("."))
      .toLowerCase();
    const [valid, info] = validateFilename(filename, ext);
    if (!valid) {
      return [valid, info];
    }
    var data = JSON.parse(
      fs.readFileSync(dbPath, { encoding: "utf8", flag: "r" })
    );
    if (data.images.includes(`${filename}${SAVE_EXT}`)) {
      return [false, `A file by this name ${filename} already exists`];
    }
    if (data.images.length > 10) {
      console.log(`Exceeded storage limit of ${IMAGE_LIMIT}`);
      return [false, `Exceeded storage limit of ${IMAGE_LIMIT}`];
    }
    fs.copyFileSync(copyFromFilePath, copyToFilePath);
    data.images.push(`${filename}${SAVE_EXT}`);
    fs.writeFileSync(dbPath, JSON.stringify(data));
    return [true];
  }
  console.log(`Path ${filepath} does not exist`);
  return [false, `Path ${filepath} does not exist`];
}

export default saveToDb;
