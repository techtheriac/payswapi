import express, { Request, Response } from "express";
import router from "./router";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

app.use(limiter);

app.use("/api", router);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

export default app;
