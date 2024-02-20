import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  protected routes(): void {}
}

const port: number = parseInt(process.env.PORT!);
const app = new App().app;

app.listen(port, () => {
  console.log("Server Running on port : " + port);
});
