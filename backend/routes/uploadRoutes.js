import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAdmin, isAuth } from '../utils.js';

const upload = multer();
const uploadRouter = express.Router();

// uploadRouter.get('/', (req, res) => {
//   res.send({ message: 'Upload route is working. Use POST to upload files.' });
// });

uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    console.log('Received file:', req.file); // <-- add this
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: 'Upload failed', error: error.message });
    }
  }
);

export default uploadRouter;
