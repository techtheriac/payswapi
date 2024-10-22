import express, { Request, Response } from "express";
import router from "./router";
import { rateLimit } from "express-rate-limit";
import { apiReference } from "@scalar/express-api-reference";
import YAML from "yamljs";
import path from "path";

const specPath = path.join(__dirname, "./openapi.yaml");

const spec = YAML.load(specPath);

const app = express();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

app.use(limiter);

app.use(
  "/reference",
  apiReference({
    spec: {
      content: spec,
    },
  })
);

app.use("/api", router);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/", (req: Request, res: Response) => {
  res.redirect("/reference");
});

export default app;
