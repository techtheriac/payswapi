import { Request, Response } from "express";
import { getPlanetById, getPlanets } from "../services/planetsApiService";

import Cache from "../utils/cache";

const cache = new Cache();

const PLANETS_CACHE_KEY = "planets";
const PLANET_CACHE_KEY = (id: string) => `planet-${id}`;

export const getAllPlanets = async (req: Request, res: Response) => {
  const planetsCache = cache.get(PLANETS_CACHE_KEY);

  if (planetsCache) {
    res.json(planetsCache);
    return;
  }

  const response = await getPlanets();

  if (!response.success) {
    res.status(response.status);
    res.json(response);
    return;
  }

  cache.set(PLANETS_CACHE_KEY, response.response);

  res.json(response.response);
};

export const getOnePlanet = async (req: Request, res: Response) => {
  const id = req.params.id;

  const planetCache = cache.get(PLANET_CACHE_KEY(id));

  if (planetCache) {
    res.json(planetCache);
    return;
  }

  const response = await getPlanetById(id);

  if (!response.success) {
    res.status(response.status);
    res.json(response);
    return;
  }

  cache.set(PLANET_CACHE_KEY(id), response.response);
  res.json(response.response);
};
