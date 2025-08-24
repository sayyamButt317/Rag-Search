// config/multer.config.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads dir if not exists
const uploadPath = path.resolve("uploads");
const folderPath = path.resolve("uploads/folder");

if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const folderpath = path.resolve("uploads/folder");
if (!fs.existsSync(folderpath)) fs.mkdirSync(folderpath);
console.log("Uploading...",folderpath)

const folderstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderpath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const uploadfile = multer({ storage });
export const folderupload = multer({ storage: folderstorage });