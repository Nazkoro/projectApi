import dotenv from "dotenv";
/* eslint-disable import/first */
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose, { ConnectOptions } from "mongoose";
// import { createServer } from "http";
// import { Server } from "socket.io";
import path from "path";
import rout from "./router/index";
import errorMiddleware from "./middlewares/error-middleware";

const PORT = process.env.PORT || 5000;
const app = express();
// const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", rout);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    app.listen(PORT, () => {
      // const io = new Server(httpServer, {
      //   cors: { origin: "*", credentials: true },
      // });
      console.log(`Server started on PORT = ${PORT}, db:${process.env.DB_URL}`);

      // io.on("connection", (socket) => {
      //   console.log("a user connected");
      //
      //   socket.on("message", (message) => {
      //     console.log(message);
      //     io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
      //   });
      //
      //   socket.on("disconnect", () => {
      //     console.log("a user disconnected!");
      //   });
      // });
    });
  } catch (e) {
    console.log(e);
  }
};
start();
