import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const destinationFolder = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(path.resolve("./"), "public/uploads"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
  // Tipe file yang diizinkan
  // const allowedTypes = ["image/gif"];
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // File valid
  } else {
    cb(new Error("Only .jpeg, .png, and .gif format allowed!"), false); // File tidak valid
    // return "Only .jpeg, .png, and .gif format allowed!"; // File tidak valid
  }
};

const uploadFile = multer({
  storage: destinationFolder,
  // fileFilter: fileFilter,
});

const deleteFile = (filePath: any) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File successfully deleted");
  });
};

const saveImageFromBase64 = (base64String: string, outputFolder: string) => {
  const matches = base64String.match(
    /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/,
  );
  if (!matches) {
    return {
      errorUpload: "Invalid Base64 image string",
    };
  }

  const extension = matches[1]; // Ekstensi file (png, jpeg, jpg, gif)
  const base64Data = matches[2]; // Data Base64 murni (tanpa prefix)

  // Buat folder output jika belum ada
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const timestamp = Date.now(); // Timestamp sekarang
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileName = `file_${timestamp}_${randomString}`;
  // Path lengkap untuk file yang akan disimpan
  const filePath = path.join(outputFolder, `${fileName}.${extension}`);

  // Decode Base64 dan simpan sebagai file
  fs.writeFileSync(filePath, base64Data, { encoding: "base64" });

  return { filePath, fileName: `${fileName}.${extension}` };
};

const getMimeType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".txt":
      return "text/plain";
    default:
      return "application/octet-stream";
  }
};

const fileToDataURL = (filePath: string) => {
  const fileBuffer = fs.readFileSync(filePath);
  const base64String = fileBuffer.toString("base64");
  const mimeType = getMimeType(filePath);
  return `data:${mimeType};base64,${base64String}`;
};

export {
  saveImageFromBase64,
  fileToDataURL,
  destinationFolder,
  uploadFile,
  deleteFile,
};
