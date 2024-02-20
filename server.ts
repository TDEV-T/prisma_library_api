import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { readdirSync } from "fs";
import path from "path";
import bodyParser = require("body-parser");

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "20mb" }));
    this.routes();
  }

  protected routes(): void {
    const routePath = path.join(__dirname, "routes");
    readdirSync("./routes").map((r) => {
      const router = require(path.join(routePath, r));
      this.app.use("/api", router);
    });
  }
}

const port: number = parseInt(process.env.PORT ?? "5050");
const app = new App().app;

app.listen(port, () => {
  console.log("Server Running on port : " + port);
});
