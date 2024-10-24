import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import { rateLimit } from "express-rate-limit";
// import { apiReference } from "@scalar/express-api-reference";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { handleCache } from "./middlewares/cache";

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

app.use("/reference", swaggerUi.serve, swaggerUi.setup(spec));

app.use("/api", handleCache, router);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/", (req: Request, res: Response) => {
  res.redirect("/reference");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;
