import express, { Request, Response } from "express";
import router from "./router";

const app = express();

app.use("/api", router);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

export default app;
