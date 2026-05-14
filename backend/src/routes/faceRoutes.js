import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/verify-face",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
  ]),
  async (req, res) => {

    try {

      const form = new FormData();

      form.append(
        "image1",
        fs.createReadStream(
          req.files.image1[0].path
        )
      );

      form.append(
        "image2",
        fs.createReadStream(
          req.files.image2[0].path
        )
      );

      const response = await axios.post(
        "http://localhost:5001/verify-face",
        form,
        {
          headers: form.getHeaders(),
        }
      );

      res.json(response.data);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }
  }
);

export default router;