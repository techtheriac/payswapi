import { Request, Response, NextFunction } from "express";
import Cache from "../utils/cache";

const cache = new Cache();
export function handleCache(req: Request, res: Response, next: NextFunction) {
  const key = req.originalUrl;

  const cached = cache.get(key);

  if (cached) {
    res.json(cached);
    return;
  }

  const originalJson = res.json.bind(res);

  res.json = (data: any): Response => {
    if (res.statusCode == 200) {
      cache.set(key, data);
    }
    return originalJson(data);
  };

  next();
}
