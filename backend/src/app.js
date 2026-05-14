import express from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";

import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js";

/* FACE AUTH IMPORTS */
import faceRoutes from "./routes/faceRoutes.js";

const app = express();

const server = createServer(app);

const io = connectToSocket(server);

/* PORT */

app.set("port", process.env.PORT || 8000);

/* MIDDLEWARES */

app.use(cors());

app.use(express.json({ limit: "40kb" }));

app.use(
  express.urlencoded({
    limit: "40kb",
    extended: true,
  })
);

/* ROUTES */

app.use("/api/v1/users", userRoutes);

/* FACE AUTH ROUTE */

app.use("/api/v1/face", faceRoutes);

/* START SERVER */

const start = async () => {

  try {

    const connectionDb = await mongoose.connect(
      "mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/"
    );

    console.log(
      `MONGO Connected DB Host: ${connectionDb.connection.host}`
    );

    server.listen(app.get("port"), () => {

      console.log(
        `LISTENING ON PORT ${app.get("port")}`
      );

    });

  } catch (error) {

    console.log(error);

  }
};

start();